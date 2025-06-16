const db = require('../config/db');

class Cart {
    static addItem({ cart_user_id, product_id, quantity, price_at_add }, callback) {
        db.run(
            `INSERT INTO carts (cart_user_id, product_id, quantity, price_at_add)
             VALUES (?, ?, ?, ?)`,
            [cart_user_id, product_id, quantity, price_at_add],
            function (err) {
                callback(err, { cart_id: this.lastID });
            }
        );
    }

    static getUserCart(userId, callback) {
        db.all(
            `SELECT c.*, p.name, p.image FROM carts c
             JOIN products p ON c.product_id = p.id
             WHERE cart_user_id = ?`,
            [userId],
            callback
        );
    }

    static getAll(callback) {
        db.all(
            `SELECT c.*, p.name, p.image FROM carts c
         JOIN products p ON c.product_id = p.id`,
            [],
            (err, rows) => {
                if (err) return callback(err);
                callback(null, rows);
            }
        );
    }

    static updateItem(cart_id, quantity, callback) {
        db.run(
            `UPDATE carts SET quantity = ? WHERE cart_id = ?`,
            [quantity, cart_id],
            callback
        );
    }

    static clearUserCart(userId, callback) {
        db.run(
            `DELETE FROM carts WHERE cart_user_id = ?`,
            [userId],
            callback
        );
    }

    static removeItem(cart_id, callback) {
        db.run(`DELETE FROM carts WHERE cart_id = ?`, [cart_id], callback);
    }
}

module.exports = Cart;
