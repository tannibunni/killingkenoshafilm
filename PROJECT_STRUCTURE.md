# 项目结构说明

## 📁 目录结构

```
killingkenosha-2/
├── docs/                          # 📚 项目文档目录
│   ├── README.md                  # 文档索引
│   ├── ARCHITECTURE_RECOMMENDATION.md
│   ├── vue-architecture.md
│   ├── MIGRATION_SUMMARY.md
│   ├── ICON_CONFIGURATION.md
│   ├── REFACTORING.md
│   └── SUMMARY.md
│
├── public/                        # 🌐 静态资源目录
│   └── Documentary Player_files/ # 资源文件（图片、CSS、JS等）
│
├── src/                           # 💻 源代码目录
│   ├── assets/                    # 资源文件
│   │   └── css/
│   │       └── main.css          # Tailwind CSS入口
│   ├── components/                # Vue组件
│   │   ├── HeroBanner.vue
│   │   ├── VideoPlayerSection.vue
│   │   ├── PasswordProtection.vue
│   │   ├── EpisodeSelector.vue
│   │   ├── EpisodeCard.vue
│   │   ├── ShareButtons.vue
│   │   └── Watermark.vue
│   ├── composables/               # 组合式函数
│   │   └── useShare.js
│   ├── config/                    # 配置文件
│   │   └── index.js
│   ├── stores/                    # Pinia状态管理
│   │   └── player.js
│   ├── App.vue                    # 根组件
│   └── main.js                    # 入口文件
│
├── index.html                     # HTML模板
├── package.json                   # 项目配置
├── vite.config.js                 # Vite配置
├── tailwind.config.js             # Tailwind配置
├── postcss.config.js              # PostCSS配置
├── .gitignore                     # Git忽略文件
└── README.md                      # 项目说明（保留在根目录）
```

## 📝 文件说明

### 根目录文件
- `index.html` - Vue应用的HTML入口文件
- `package.json` - npm依赖和脚本配置
- `vite.config.js` - Vite构建工具配置
- `tailwind.config.js` - Tailwind CSS配置
- `postcss.config.js` - PostCSS配置
- `README.md` - 项目主要说明文档

### docs/ 目录
所有项目文档统一存放在此目录，便于管理和查找。

### public/ 目录
静态资源文件，构建时会直接复制到输出目录。

### src/ 目录
Vue 3应用的源代码，采用模块化结构。

## 🗑️ 已删除的文件

- `Documentary Player.html` - 旧的单文件HTML（已迁移到Vue 3）
- `public/Documentary Player_files/saved_resource.html` - 不再使用的播放器页面

## 📦 保留的文件

- `index.html` - Vue应用的入口文件（必需）
- `public/Documentary Player_files/` - 静态资源文件（必需）

