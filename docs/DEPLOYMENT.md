# 部署指南

本文档介绍如何将 "Killing Kenosha" 纪录片播放器部署到不同的平台。

## 📋 部署前准备

### 1. 构建项目

```bash
npm install
npm run build
```

构建完成后，会在 `dist/` 目录生成生产文件。

### 2. 测试构建结果

```bash
npm run preview
```

访问 `http://localhost:4173` 检查构建结果是否正常。

---

## 🚀 部署选项

### 选项 1: Netlify（推荐 ⭐）

**优点：**
- ✅ 免费套餐充足
- ✅ 自动 HTTPS
- ✅ 持续部署（连接 Git）
- ✅ 简单易用
- ✅ 全球 CDN

**部署步骤：**

#### 方法 A: 通过 Netlify Dashboard（最简单）

1. **访问 Netlify**
   - 前往 [https://app.netlify.com](https://app.netlify.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **部署站点**
   - 点击 "Add new site" → "Deploy manually"
   - 将 `dist/` 文件夹拖拽到上传区域
   - 等待部署完成

3. **配置重定向（SPA 路由）**
   - 站点设置 → Build & deploy → 确保 `netlify.toml` 已生效
   - 或手动添加：Site settings → Redirects → Add redirect
     - From: `/*`
     - To: `/index.html`
     - Status: `200`

#### 方法 B: 通过 Git 连接（推荐）

1. **推送代码到 Git 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **在 Netlify 连接仓库**
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的 Git 仓库
   - 配置：
     - Build command: `npm run build`
     - Publish directory: `dist`
   - 点击 "Deploy site"

3. **环境变量（如需要）**
   - Site settings → Environment variables
   - 添加必要的环境变量

**配置文件：** `netlify.toml` 已创建，包含必要的配置。

---

### 选项 2: Vercel（推荐 ⭐）

**优点：**
- ✅ 免费套餐充足
- ✅ 自动 HTTPS
- ✅ 持续部署
- ✅ 全球 CDN
- ✅ 对 Vue 支持极佳

**部署步骤：**

#### 方法 A: 通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

#### 方法 B: 通过 Vercel Dashboard

1. **访问 Vercel**
   - 前往 [https://vercel.com](https://vercel.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择你的 Git 仓库
   - 配置：
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - 点击 "Deploy"

**配置文件：** `vercel.json` 已创建，包含必要的配置。

---

### 选项 3: Cloudflare Pages

**优点：**
- ✅ 完全免费
- ✅ 全球 CDN（超快）
- ✅ 自动 HTTPS
- ✅ 持续部署

**部署步骤：**

1. **访问 Cloudflare Pages**
   - 前往 [https://pages.cloudflare.com](https://pages.cloudflare.com)
   - 登录 Cloudflare 账号

2. **创建项目**
   - 点击 "Create a project"
   - 连接 Git 仓库
   - 配置：
     - Framework preset: `Vite`
     - Build command: `npm run build`
     - Build output directory: `dist`
   - 点击 "Save and Deploy"

---

### 选项 4: GitHub Pages

**优点：**
- ✅ 完全免费
- ✅ 与 GitHub 集成

**缺点：**
- ⚠️ 需要配置 GitHub Actions
- ⚠️ 自定义域名需要配置

**部署步骤：**

1. **创建 GitHub Actions 工作流**

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. **启用 GitHub Pages**
   - 仓库设置 → Pages
   - Source: `GitHub Actions`
   - 保存

3. **配置 base 路径**

更新 `vite.config.js`：

```javascript
export default defineConfig({
  base: '/your-repo-name/', // 替换为你的仓库名
  // ... 其他配置
})
```

---

## 🔧 部署配置说明

### 重要配置

1. **SPA 路由重定向**
   - Vue Router 使用 History 模式时需要配置
   - 所有路由都重定向到 `index.html`
   - Netlify 和 Vercel 已自动配置

2. **环境变量**
   - 如果使用环境变量，需要在部署平台配置
   - 不要将敏感信息提交到 Git

3. **构建优化**
   - 确保 `vite.config.js` 中 `sourcemap: false`（生产环境）
   - 检查 `dist/` 目录大小

---

## 📝 部署检查清单

- [ ] 运行 `npm run build` 成功
- [ ] 运行 `npm run preview` 测试本地构建
- [ ] 检查所有图片和资源文件路径正确
- [ ] 确认环境变量已配置（如需要）
- [ ] 测试密码保护功能
- [ ] 测试视频播放器
- [ ] 测试所有链接（Watermark 菜单）
- [ ] 检查移动端响应式设计
- [ ] 配置自定义域名（可选）

---

## 🌐 自定义域名

### Netlify
1. Site settings → Domain management
2. Add custom domain
3. 按照提示配置 DNS

### Vercel
1. Project settings → Domains
2. Add domain
3. 按照提示配置 DNS

---

## 💡 推荐选择

**对于这个项目，我推荐：**

1. **Netlify** - 最简单，配置最少，适合快速部署
2. **Vercel** - 性能优秀，对 Vue 支持好
3. **Cloudflare Pages** - 如果追求极致速度

所有平台都有免费套餐，足够个人项目使用。

---

## 🆘 常见问题

### 问题 1: 部署后页面空白
- 检查资源路径是否正确（使用相对路径）
- 确认 SPA 路由重定向已配置

### 问题 2: 图片不显示
- 确认图片在 `public/` 目录
- 检查路径是否以 `/` 开头

### 问题 3: 路由 404
- 确认重定向规则已配置
- 检查 `netlify.toml` 或 `vercel.json`

---

## 📚 参考链接

- [Netlify 文档](https://docs.netlify.com/)
- [Vercel 文档](https://vercel.com/docs)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)

