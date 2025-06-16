const db = require('../config/db');

class Product {
    static create(newProduct, callback) {
        const {
            name,
            description,
            image,
            category,
            rating,
            stock,
            original_price,
            discount
        } = newProduct;

        db.run(
            `INSERT INTO products (
                name, description, image, category, 
                rating, stock, original_price, discount
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                description,
                image,
                category,
                rating,
                stock,
                original_price,
                discount
            ],
            function(err) {
                callback(err, { id: this.lastID, ...newProduct });
            }
        );
    }

    static getAll(callback) {
        db.all("SELECT * FROM products", callback);
    }

    static getById(id, callback) {
        db.get("SELECT * FROM products WHERE id = ?", [id], callback);
    }

    static update(id, updatedProduct, callback) {
        const {
            name,
            description,
            image,
            category,
            rating,
            stock,
            original_price,
            discount
        } = updatedProduct;

        db.run(
            `UPDATE products SET 
                name = ?,
                description = ?,
                image = ?,
                category = ?,
                rating = ?,
                stock = ?,
                original_price = ?,
                discount = ?
             WHERE id = ?`,
            [
                name,
                description,
                image,
                category,
                rating,
                stock,
                original_price,
                discount,
                id
            ],
            callback
        );
    }

    static delete(id, callback) {
        db.run("DELETE FROM products WHERE id = ?", [id], callback);
    }

    static getByCategory(category, page = 1, limit = 20, callback) {
        const offset = (page - 1) * limit;

        db.all(
            `SELECT * FROM products WHERE category = ? LIMIT ? OFFSET ?`,
            [category, limit, offset],
            (err, rows) => {
                if (err) return callback(err);

                db.get(
                    `SELECT COUNT(*) AS total FROM products WHERE category = ?`,
                    [category],
                    (err, countResult) => {
                        if (err) return callback(err);

                        const totalItems = countResult.total;
                        const totalPages = Math.ceil(totalItems / limit);

                        callback(null, {
                            meta: {
                                totalItems,
                                itemsPerPage: limit,
                                currentPage: page,
                                totalPages
                            },
                            data: rows
                        });
                    }
                );
            }
        );
    }
}

module.exports = Product;
