# 项目说明文档

## 项目简介
本项目是前后端分离架构体系，前端基于 `Vue.js` 框架实现，后端采用 `Node.js` 构建 API 服务。通过 `RESTful API` 实现数据交互，具备高解耦性与可扩展性，支持独立部署与迭代。

---

## 技术栈

### 前端
- **核心框架**: `Vue.js` (3.x)
- **状态管理**: `Vuex`
- **路由系统**: `Vue Router`
- **UI 组件库**: `Element Plus`
- **网络请求**: `Axios`
- **构建工具**: `Vite`
- **代码规范**: `ESLint` + `Prettier`

### 后端
- **运行环境**: `Node.js` (18.x)
- **Web 框架**: `Koa`
- **数据库**: `MongoDB` (使用 `Mongoose` ORM)
- **鉴权方案**: `JWT`
- **接口文档**: `Swagger UI`
- **部署方案**: `PM2` + `Nginx` 反向代理

---

## 目录结构

### 前端 (`/frontend`)
```
src/
├── assets/              # 静态资源文件夹
├── components/          # 可复用组件目录
├── views/               # 页面级组件存储位置
├── router/              # 路由配置文件
├── store/               # Vuex 状态管理模块
├── services/            # 网络请求服务层
├── utils/               # 公共工具函数
├── App.vue              # 根组件文件
└── main.js              # 应用启动入口
```


### 后端 (`/backend`)
```
src/
├── controllers/         # 控制器处理层
├── models/              # 数据库模型定义
├── routes/              # 接口路由配置
├── services/            # 业务逻辑实现层
├── middleware/          # 请求中间件
├── config/              # 系统配置参数
├── utils/               # 工具类方法
└── server.js            # 服务启动文件
```


---

## 核心功能模块

### 前端
- 用户认证系统 (登录/注册/Token 刷新)
- 动态路由加载与权限控制
- 表单验证 (基于 `Vuelidate`)
- 响应式数据可视化 (结合 `ECharts`)
- 多语言国际化支持 (i18n)

### 后端
- 用户管理模块 (`User Controller`)
- 内容发布接口 (`Post Controller`)
- 文件上传服务 (`Upload Service`)
- 错误日志中间件 (`Error Logger`)
- 接口限流熔断 (`Redis Rate Limiter`)

---

## 开发指南

### 环境准备
```bash
# 前端开发服务器
cd frontend
npm install
npm run server

# 后端开发模式启动
cd backend
npm install
npm start
```


### 接口调用示例
```javascript
// 前端服务层示例
const response = await apiClient.get('/api/users', {
  headers: { Authorization: `Bearer ${token}` }
});
```


---

## 部署流程

### 构建生产版本
```bash
# 前端打包
npm run build
# 后端启动
pm2 start dist/server.js --no-daemon
```


### Docker 部署
```dockerfile
# 示例 Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "dist/server.js"]
```


---

---

## 贡献者信息
- 项目负责人: [名字]
- 联系方式: [邮箱]

---
