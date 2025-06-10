# 🌿 GreenLife 电商网站前端模板

这是一个使用 Vue 3 构建的绿色健康主题电商平台前端项目，专注于有机、环保和可持续生活方式的产品展示与销售。项目采用现代前端技术栈，具备良好的组件化设计、响应式布局以及丰富的交互体验。

## 📦 技术栈

- **框架**: [Vue 3](https://vuejs.org/)（使用 `<script setup>` 语法）
- **图标库**: [Font Awesome SVG](https://fontawesome.com/)
- **构建工具**: [Vue CLI Service](https://cli.vuejs.org/)
- **样式管理**: CSS 变量 + 响应式设计
- **代码规范**: ESLint + Babel

## 🧩 功能模块概览

| 模块 | 描述 |
|------|------|
| `SiteHeader.vue` | 页面顶部导航栏，包含 Logo、搜索框、用户/收藏/购物车图标 |
| `CategoriesNav.vue` | 分类导航条，展示商品类别链接 |
| `HeroBanner.vue` | 首页轮播图区域，带背景图和欢迎文案 |
| `FeaturedCategories.vue` | 展示精选商品分类卡片 |
| `FeaturedProducts.vue` | 展示热销商品列表，使用 `ProductCard.vue` 组件渲染商品 |
| `ProductCard.vue` | 商品卡片组件，支持加入购物车、数量选择、价格展示等 |
| `PromoBanner.vue` | 促销横幅，显示限时优惠信息及倒计时 |
| `SiteFooter.vue` | 页面底部，提供平台信息、帮助链接、社交媒体等 |

## 🎨 主题与样式

- 所有组件共享全局 CSS 变量，定义在 `style.css`
- 使用现代 CSS 特性：Flexbox、Grid、CSS 变量、响应式媒体查询
- 支持多种屏幕尺寸适配（PC / 平板 / 手机）

## ⚙️ 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run serve

# 构建生产环境包
npm run build

# 代码检查与修复
npm run lint
```

## 📁 项目结构简览

```
shopping_website/
├── public/
├── src/
│   ├── assets/
│   │   └── style.css
│   ├── components/
│   │   ├── CategoriesNav.vue
│   │   ├── FeaturedCategories.vue
│   │   ├── FeaturedProducts.vue
│   │   ├── HeroBanner.vue
│   │   ├── ProductCard.vue
│   │   ├── PromoBanner.vue
│   │   ├── SiteFooter.vue
│   │   └── SiteHeader.vue
│   ├── App.vue
│   └── main.js
├── package.json
└── README.md
