const Product = require('../models/productModel');
const db = require('../config/db');

exports.createProduct = (req, res) => {
    Product.create(req.body, (err, newProduct) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(newProduct);
    });
};

exports.getAllProducts = (req, res) => {
    const { category, page, limit } = req.query;

    db.get("SELECT COUNT(*) AS total FROM products", (err, countRow) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });

        const totalItems = countRow.total;

        let sql = "SELECT * FROM products";
        const params = [];

        if (page !== undefined && limit !== undefined) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const offset = (pageNum - 1) * limitNum;
            sql += " LIMIT ? OFFSET ?";
            params.push(limitNum, offset);
        }

        if (category) {
            sql = "SELECT * FROM products WHERE category = ?"
            params.unshift(decodeURIComponent(category));
            if (page !== undefined && limit !== undefined) {
                sql += " LIMIT ? OFFSET ?";
            }
        }

        db.all(sql, params, (err, rows) => {
            if (err) return res.status(500).json({ status: 'error', message: err.message });

            res.status(200).json({
                meta: {
                    totalItems,
                    itemsPerPage: limit ? parseInt(limit) : totalItems,
                    currentPage: page ? parseInt(page) : 1,
                    totalPages: limit ? Math.ceil(totalItems / parseInt(limit)) : 1
                },
                data: rows
            });
        });
    });
};

exports.getProductById = (req, res) => {
    const id = req.params.id;

    Product.getById(id, (err, product) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: '未找到商品'
            });
        }

        res.status(200).json({
            status: 'success',
            data: product
        });
    });
};

exports.updateProduct = (req, res) => {
    Product.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: '产品更新成功' });
    });
};

exports.deleteProduct = (req, res) => {
    Product.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: '产品已删除' });
    });
};



