const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const cartRoutes = require('./src/routes/cartRoutes');

const db = require('./src/config/db');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:8090',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

const startApp = async () => {
    try {
        console.log(`当前环境: ${process.env.NODE_ENV || '未设置'}`);

        console.log('🔍 检查数据库表...');
        await db.ensureTableExists();

        if (process.env.NODE_ENV === 'development') {
            console.log('🌱 开发环境 - 插入种子数据');
            const seedProducts = require('./src/seed/seedProducts');
            await seedProducts();
        } else {
            console.log('🚫 非开发环境 - 跳过种子数据插入');
        }

        app.listen(PORT, () => {
            console.log(`\n✅ 服务器正在 ${PORT} 端口运行`);
            console.log(`  请访问 http://localhost:${PORT}\n`);
        });

    } catch (err) {
        console.error('🚨 启动失败:', err);
        process.exit(1);
    }
};

startApp();

module.exports = app;
