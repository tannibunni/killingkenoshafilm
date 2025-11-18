# Documentary Player - Vue 3 版本

基于 Vue 3 + Vite + Pinia + Tailwind CSS 构建的纪录片播放器应用。

## ✨ 功能特性

- 🎬 **Hero横幅区域** - 展示纪录片标题、描述和海报
- 🔒 **密码保护** - 视频播放器密码保护机制
- 📺 **视频播放** - 集成VdoCipher视频播放器
- 📚 **章节选择** - 4个章节，支持时间跳转
- 🔗 **社交分享** - 支持Facebook、Twitter、Instagram、LinkedIn、Reddit、Email分享
- 📱 **响应式设计** - 完美适配移动端和桌面端

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:8000

### 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
documentary-player/
├── public/                    # 静态资源
│   └── Documentary Player_files/  # 资源文件
├── src/
│   ├── assets/               # 资源文件
│   │   └── css/
│   │       └── main.css      # 主样式文件
│   ├── components/           # Vue组件
│   │   ├── HeroBanner.vue   # Hero横幅组件
│   │   ├── VideoPlayerSection.vue  # 视频播放器区域
│   │   ├── PasswordProtection.vue   # 密码保护组件
│   │   ├── EpisodeSelector.vue      # 章节选择器
│   │   ├── EpisodeCard.vue         # 章节卡片
│   │   ├── ShareButtons.vue        # 分享按钮
│   │   └── Watermark.vue           # 水印组件
│   ├── composables/         # 组合式函数
│   │   └── useShare.js      # 分享功能
│   ├── config/              # 配置文件
│   │   └── index.js         # 应用配置
│   ├── stores/              # Pinia状态管理
│   │   └── player.js        # 播放器状态
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── index.html               # HTML模板
├── package.json             # 依赖配置
├── vite.config.js           # Vite配置
├── tailwind.config.js       # Tailwind配置
└── postcss.config.js        # PostCSS配置
```

## ⚙️ 配置

所有配置都在 `src/config/index.js` 文件中：

- **密码配置** - 修改默认密码
- **视频播放器** - 配置VdoCipher播放器参数
- **章节数据** - 修改章节信息
- **纪录片信息** - 修改标题、描述、图片
- **分享配置** - 配置分享平台
- **分析工具** - PostHog配置

## 🛠️ 技术栈

- **Vue 3.4+** - 渐进式JavaScript框架
- **Vite 5+** - 下一代前端构建工具
- **Pinia** - Vue官方状态管理库
- **Tailwind CSS 3.4+** - 实用优先的CSS框架
- **RemixIcon** - 图标库

## 📝 开发说明

### 组件开发

所有组件使用 Vue 3 Composition API：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

### 状态管理

使用 Pinia 进行状态管理：

```javascript
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
playerStore.selectEpisode('episode1')
```

### 样式

使用 Tailwind CSS 进行样式开发，自定义配置在 `tailwind.config.js`。

## 🚀 部署

项目支持多种部署平台，推荐使用 **Netlify** 或 **Vercel**。

### 快速部署到 Netlify

1. 构建项目：`npm run build`
2. 访问 [Netlify](https://app.netlify.com)
3. 拖拽 `dist/` 文件夹到 Netlify Dashboard
4. 完成！

### 通过 Git 部署

1. 推送代码到 Git 仓库
2. 在 Netlify/Vercel 连接仓库
3. 配置构建命令：`npm run build`
4. 配置输出目录：`dist`

详细部署指南请查看 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 🐛 问题排查

### 端口被占用

修改 `vite.config.js` 中的 `server.port` 配置。

### 资源文件404

确保 `public/Documentary Player_files/` 目录存在且包含所有必要的资源文件。

## 📚 文档

项目相关文档位于 `docs/` 目录：

- `ARCHITECTURE_RECOMMENDATION.md` - 架构推荐和对比
- `vue-architecture.md` - Vue 3 详细架构设计
- `MIGRATION_SUMMARY.md` - 迁移总结
- `ICON_CONFIGURATION.md` - 图标配置说明
- `REFACTORING.md` - 重构说明
- `SUMMARY.md` - 重构总结

## 📄 许可证

ISC

## 👥 贡献

欢迎提交 Issue 和 Pull Request！
