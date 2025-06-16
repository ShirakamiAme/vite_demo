const db = require('../config/db');
const faker = require('faker');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const generateUsers = async (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const plainPassword = faker.internet.password();
        const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

        users.push({
            user_name: faker.internet.userName(),
            user_password: hashedPassword,
            email: faker.internet.email()
        });
    }
    return users;
};

const seedUsers = async () => {
    try {
        console.log('🔄 开始插入用户数据...');

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM users', function(err) {
                if (err) return reject(err);
                console.log(`  已清空用户表 (删除 ${this.changes} 条记录)`);
                db.run("DELETE FROM sqlite_sequence WHERE name='users'", resolve);
            });
        });

        const users = await generateUsers(10);
        const insertedUsers = [];

        for (const user of users) {
            await new Promise((resolve, reject) => {
                db.run(`
                    INSERT INTO users (user_name, user_password, email)
                    VALUES (?, ?, ?)
                `, [user.user_name, user.user_password, user.email],
                    function(err) {
                        if (err) return reject(err);
                        insertedUsers.push({ user_id: this.lastID, ...user });
                        resolve();
                    });
            });
        }

        console.log(`✅ 成功插入 ${insertedUsers.length} 条用户记录`);
    } catch (err) {
        console.error('❌ 用户插入失败:', err.message);
    }  finally {
        // await db.closeConnection();
    }
};

if (require.main === module) {
    seedUsers();
} else {
    module.exports = seedUsers;
}
