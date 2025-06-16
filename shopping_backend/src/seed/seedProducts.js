const db = require('../config/db');
const faker = require('faker');

const generateMockProducts = (count) => {
    const categories = ['有机食品', '天然饮品', '身体护理', '天然织物', '可持续用品', '宠物护理'];
    const products = [];

    for (let i = 0; i < count; i++) {
        const name = faker.commerce.productName();
        const category = categories[Math.floor(Math.random() * categories.length)];
        const original_price = parseFloat(faker.commerce.price(10, 500));
        const discount = Math.random() > 0.7 ? parseFloat((Math.random() * 0.7).toFixed(2)) : 0;

        products.push({
            name,
            description: faker.lorem.sentences(2),
            image: `https://picsum.photos/seed/${faker.datatype.uuid()}/300/300`,
            category,
            rating: parseFloat((Math.random() * 5).toFixed(1)),
            stock: Math.floor(Math.random() * 100),
            original_price,
            discount
        });
    }

    return products;
};

const seedProducts = async () => {
    try {
        console.log('🔄 开始插入种子数据...');

        const tableExists = await new Promise((resolve, reject) => {
            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='products'",
                (err, row) => {
                    if (err) return reject(err);
                    resolve(!!row);
                });
        });

        if (!tableExists) {
            throw new Error('商品表不存在，请先创建表');
        }

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM products', function(err) {
                if (err) return reject(err);
                console.log(`  已清空商品表 (删除 ${this.changes} 条记录)`);

                db.run("DELETE FROM sqlite_sequence WHERE name='products'",
                    (resetErr) => {
                        if (resetErr) {
                            if (!resetErr.message.includes('no such table')) {
                                return reject(resetErr);
                            }
                        }
                        console.log('  已重置自增ID计数器');
                        resolve();
                    }
                );
            });
        });

        const mockProducts = generateMockProducts(100);
        console.log(`  生成 ${mockProducts.length} 条模拟商品数据`);

        for (const product of mockProducts) {
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO products (
                        name, description, image, category, 
                        rating, stock, original_price, discount
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        product.name,
                        product.description,
                        product.image,
                        product.category,
                        product.rating,
                        product.stock,
                        product.original_price,
                        product.discount
                    ],
                    function(err) {
                        if (err) return reject(err);
                        console.log(`  插入: ${product.name} (ID: ${this.lastID})`);
                        resolve();
                    }
                );
            });
        }

        console.log(`✅ 成功插入 ${mockProducts.length} 条商品数据`);

        const rowCount = await new Promise((resolve, reject) => {
            db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
                if (err) return reject(err);
                resolve(row.count);
            });
        });

        console.log(rowCount === mockProducts.length
            ? `✅ 验证成功: 数据库中有 ${rowCount} 条记录`
            : `⚠️ 数据不一致: 预期 ${mockProducts.length} 条, 实际 ${rowCount} 条`);

    } catch (err) {
        console.error('❌ 插入数据失败:', err.message);
    } finally {
        await db.closeConnection();
    }
};

if (require.main === module) {
    seedProducts();
} else {
    module.exports = seedProducts;
}
