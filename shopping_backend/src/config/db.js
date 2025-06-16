const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../../db/shopping.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ 数据库连接失败:', err.message);
    } else {
        console.log('✅ 成功连接到数据库:', DB_PATH);
    }
});

db.ensureTableExists = function () {
    return new Promise((resolve, reject) => {
        this.serialize(() => {
            this.run(`
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT,
                    image TEXT,
                    category TEXT,
                    rating REAL DEFAULT 0,
                    stock INTEGER DEFAULT 0,
                    original_price REAL NOT NULL,
                    discount REAL DEFAULT 0,
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            this.run(`
                CREATE TABLE IF NOT EXISTS users (
                    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_name TEXT NOT NULL UNIQUE,
                    user_password TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    last_login TIMESTAMP
                );
            `);

            this.run(`
                CREATE TABLE IF NOT EXISTS carts (
                    cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    cart_user_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL DEFAULT 1,
                    price_at_add REAL NOT NULL,
                    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (cart_user_id) REFERENCES users(user_id),
                    FOREIGN KEY (product_id) REFERENCES products(id)
                );
            `, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
};


db.closeConnection = function() {
    return new Promise((resolve) => {
        this.close((err) => {
            if (err) {
                console.error('关闭数据库失败:', err.message);
            } else {
                console.log('🔒 数据库连接已关闭');
            }
            resolve();
        });
    });
};

module.exports = db;
