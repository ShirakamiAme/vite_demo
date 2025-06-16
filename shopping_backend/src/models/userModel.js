const db = require('../config/db');

class User {
    static create({ user_name, user_password, email }, callback) {
        db.run(
            `INSERT INTO users (user_name, user_password, email)
             VALUES (?, ?, ?)`,
            [user_name, user_password, email],
            function (err) {
                callback(err, { user_id: this.lastID, user_name, email });
            }
        );
    }

    static getAll(page, limit, callback) {
        const offset = (page - 1) * limit;
        db.get('SELECT COUNT(*) AS total FROM users', [], (err, countResult) => {
            if (err) return callback(err);

            db.all(
                `SELECT user_id, user_name, email, created_at 
             FROM users 
             ORDER BY created_at DESC 
             LIMIT ? OFFSET ?`,
                [limit, offset],
                (err, rows) => {
                    if (err) return callback(err);
                    callback(null, {
                        users: rows,
                        total: countResult.total
                    });
                }
            );
        });
    }

    static getById(id, callback) {
        db.get(
            'SELECT user_id, user_name, user_password, email, created_at FROM users WHERE user_id = ?',
            [id],
            callback
        );
    }

    static update(id, updateData, callback) {
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updateData)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        values.push(id);

        db.run(
            `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`,
            values,
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM users WHERE user_id = ?', [id], callback);
    }

    static findByUsername(username, callback) {
        db.get(
            'SELECT * FROM users WHERE user_name = ?',
            [username],
            callback
        );
    }

    static updateLoginTime(user_id, callback) {
        db.run(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?',
            [user_id],
            callback
        );
    }

    static getByEmail(email, callback) {
        db.get(
            'SELECT * FROM users WHERE email = ?',
            [email],
            (err, row) => {
                if (err) return callback(err);
                callback(null, row || null);
            }
        );
    }

}

module.exports = User;
