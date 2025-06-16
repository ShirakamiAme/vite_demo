const seedProducts = require('./seedProducts');
const seedUsers = require('./seedUsers');
const seedCarts = require('./seedCarts');

const runAllSeeds = async () => {
    console.log('🌱 正在执行全部种子脚本...\n');

    try {
        await seedUsers();
        console.log('\n👤 用户数据完成 ✅\n');

        await seedCarts();
        console.log('\n🛒 购物车数据完成 ✅\n');

        await seedProducts();
        console.log('\n📦 商品数据完成 ✅\n');

        console.log('🎉 所有种子数据插入完毕！');
    } catch (err) {
        console.error('❌ 种子脚本执行失败:', err.message);
    }
};

if (require.main === module) {
    runAllSeeds();
} else {
    module.exports = runAllSeeds;
}
