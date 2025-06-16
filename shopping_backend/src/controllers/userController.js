const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
    try {
        const { user_name, user_password, email } = req.body;

        if (!user_name || !user_password || !email) {
            return res.status(400).json({
                status: 'fail',
                message: '用户名、密码和邮箱为必填项'
            });
        }

        const hashedPassword = await bcrypt.hash(user_password, SALT_ROUNDS);
        const userData = {
            user_name,
            user_password: hashedPassword,
            email
        };

        User.create(userData, (err, newUser) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: err.message.includes('UNIQUE')
                        ? '用户名或邮箱已存在'
                        : err.message
                });
            }
            res.status(201).json({
                status: 'success',
                data: {
                    user_id: newUser.user_id,
                    user_name: newUser.user_name,
                    email: newUser.email
                }
            });
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.getAllUsers = (req, res) => {
    const sql = `SELECT user_id, user_name, user_password, email, created_at FROM users ORDER BY created_at DESC`;

    const db = require('../config/db');
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }

        res.status(200).json({
            status: 'success',
            data: rows
        });
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;

    User.getById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: '用户不存在'
            });
        }

        const { user_password, ...userData } = user;

        res.status(200).json({
            status: 'success',
            data: userData
        });
    });
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_password, ...updateData } = req.body;

        if (user_password) {
            updateData.user_password = await bcrypt.hash(user_password, SALT_ROUNDS);
        }

        User.update(id, updateData, (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: err.message.includes('UNIQUE')
                        ? '用户名或邮箱已存在'
                        : err.message
                });
            }
            res.status(200).json({
                status: 'success',
                message: '用户信息更新成功'
            });
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.delete(id, (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        res.status(200).json({
            status: 'success',
            message: '用户已删除'
        });
    });
};

exports.login = async (req, res) => {
    try {
        console.log("请求体:", req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: '邮箱和密码为必填项' });
        }
        User.getByEmail(email, async (err, user) => {
            console.log("数据库查询 err:", err);
            console.log("查询到用户:", user);
            if (err) {
                return res.status(500).json({ status: 'error', message: err.message });
            }
            if (!user) {
                return res.status(401).json({ status: 'fail', message: '邮箱或密码不正确' });
            }
            const isMatch = await bcrypt.compare(password, user.user_password);
            console.log("密码匹配结果:", isMatch);
            if (!isMatch) {
                return res.status(401).json({ status: 'fail', message: '邮箱或密码不正确' });
            }
            const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });
            const { user_password, ...userData } = user;
            return res.status(200).json({ status: 'success', token, user: userData });
        });
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message });
    }
};

