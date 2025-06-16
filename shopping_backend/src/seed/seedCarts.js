const db = require('../config/db');

const seedCarts = async () => {
    try {
        console.log('🔄 开始插入购物车数据...');

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM carts', function(err) {
                if (err) return reject(err);
                console.log(`  已清空购物车表 (删除 ${this.changes} 条记录)`);
                db.run("DELETE FROM sqlite_sequence WHERE name='carts'", resolve);
            });
        });

        const users = await new Promise((resolve, reject) => {
            db.all("SELECT user_id FROM users", (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        const products = await new Promise((resolve, reject) => {
            db.all("SELECT id, original_price FROM products", (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        if (users.length === 0 || products.length === 0) {
            throw new Error('需要先插入用户和商品数据');
        }

        for (const user of users) {
            const cartCount = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < cartCount; i++) {
                const product = products[Math.floor(Math.random() * products.length)];
                const quantity = Math.floor(Math.random() * 3) + 1;
                const price_at_add = product.original_price;

                await new Promise((resolve, reject) => {
                    db.run(`
                        INSERT INTO carts (cart_user_id, product_id, quantity, price_at_add)
                        VALUES (?, ?, ?, ?)
                    `, [user.user_id, product.id, quantity, price_at_add],
                        function(err) {
                            if (err) return reject(err);
                            resolve();
                        });
                });
            }
        }

        console.log(`✅ 成功为 ${users.length} 个用户插入购物车数据`);
    } catch (err) {
        console.error('❌ 购物车插入失败:', err.message);
    } finally {
        // await db.closeConnection();
    }
};

if (require.main === module) {
    seedCarts();
} else {
    module.exports = seedCarts;
}
