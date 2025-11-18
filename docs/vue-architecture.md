# Vue 3 项目架构详细设计

## 完整技术栈

```
Vue 3.4+ (Composition API)
├── Vite 5+ (构建工具)
├── Pinia (状态管理)
├── Tailwind CSS 3.4+ (样式框架)
├── RemixIcon (图标库)
├── TypeScript (可选，推荐)
└── VueUse (工具库，可选)
```

## 详细组件设计

### 1. HeroBanner 组件

**功能：**
- 显示纪录片标题、描述、海报
- 操作按钮（播放、收藏、分享）

**Props：**
- `title`: 纪录片标题
- `description`: 描述文字
- `posterImage`: 海报图片URL
- `backgroundImage`: 背景图片URL

**Events：**
- `play`: 点击播放按钮
- `favorite`: 点击收藏按钮
- `share`: 点击分享按钮

### 2. VideoPlayer 组件

**功能：**
- 嵌入视频播放器
- 密码保护遮罩
- 视频URL管理

**Props：**
- `videoUrl`: 视频播放器URL
- `isProtected`: 是否需要密码保护

**Events：**
- `unlock`: 密码验证成功
- `play`: 开始播放
- `pause`: 暂停播放

### 3. PasswordProtection 组件

**功能：**
- 密码输入界面
- 密码验证
- 错误提示
- 联系创作者

**Props：**
- `password`: 正确密码
- `hint`: 密码提示

**Events：**
- `unlock`: 密码验证成功
- `contact`: 联系创作者

### 4. EpisodeSelector 组件

**功能：**
- 显示所有章节
- 章节切换
- 当前章节高亮

**Props：**
- `episodes`: 章节数组
- `currentEpisode`: 当前章节ID

**Events：**
- `select`: 选择章节

### 5. EpisodeCard 组件

**功能：**
- 单个章节卡片
- 显示标题、时间、描述
- 激活状态样式

**Props：**
- `episode`: 章节数据对象
- `isActive`: 是否激活

**Events：**
- `click`: 点击事件

### 6. ShareButtons 组件

**功能：**
- 社交媒体分享按钮
- 复制链接功能
- 分享成功反馈

**Props：**
- `shareUrl`: 分享的URL
- `platforms`: 支持的平台列表

## Composables 设计

### usePassword.js
```javascript
export function usePassword(config) {
  const isUnlocked = ref(false)
  const error = ref('')
  
  const checkPassword = (input) => {
    if (input === config.password) {
      isUnlocked.value = true
      return true
    }
    error.value = 'Incorrect password'
    return false
  }
  
  return { isUnlocked, error, checkPassword }
}
```

### useVideoPlayer.js
```javascript
export function useVideoPlayer() {
  const currentTime = ref(0)
  const isPlaying = ref(false)
  
  const seekTo = (time) => {
    // 跳转到指定时间
  }
  
  return { currentTime, isPlaying, seekTo }
}
```

### useShare.js
```javascript
export function useShare() {
  const shareUrl = ref(window.location.href)
  
  const shareToPlatform = (platform) => {
    // 分享到指定平台
  }
  
  const copyLink = async () => {
    // 复制链接
  }
  
  return { shareUrl, shareToPlatform, copyLink }
}
```

## 状态管理 (Pinia Store)

```javascript
// stores/player.js
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  // State
  const isUnlocked = ref(false)
  const currentEpisode = ref('intro')
  const episodes = ref([...])
  const videoUrl = ref('')
  
  // Getters
  const currentEpisodeData = computed(() => {
    return episodes.value.find(ep => ep.id === currentEpisode.value)
  })
  
  // Actions
  function unlock() {
    isUnlocked.value = true
  }
  
  function selectEpisode(episodeId) {
    currentEpisode.value = episodeId
    const episode = episodes.value.find(ep => ep.id === episodeId)
    if (episode) {
      updateVideoUrl(episode.startTime)
    }
  }
  
  function updateVideoUrl(startTime) {
    // 根据startTime更新视频URL
  }
  
  return {
    isUnlocked,
    currentEpisode,
    episodes,
    videoUrl,
    currentEpisodeData,
    unlock,
    selectEpisode
  }
})
```

## 项目初始化命令

```bash
# 创建Vue项目
npm create vue@latest documentary-player

# 安装依赖
cd documentary-player
npm install

# 安装额外依赖
npm install pinia
npm install -D tailwindcss postcss autoprefixer
npm install @vueuse/core  # 可选

# 初始化Tailwind
npx tailwindcss init -p

# 启动开发服务器
npm run dev
```

## 优势总结

### Vue 3 的优势

1. **响应式系统**
   ```vue
   <!-- 自动更新，无需手动操作DOM -->
   <div v-if="isUnlocked">视频内容</div>
   ```

2. **组件复用**
   ```vue
   <!-- EpisodeCard可以轻松复用 -->
   <EpisodeCard v-for="ep in episodes" :episode="ep" />
   ```

3. **状态管理**
   ```javascript
   // 全局状态，任何组件都可以访问
   const playerStore = usePlayerStore()
   playerStore.selectEpisode('episode1')
   ```

4. **开发体验**
   - 热重载
   - Vue DevTools调试
   - TypeScript支持
   - 单文件组件

5. **性能优化**
   - 虚拟DOM
   - 编译时优化
   - Tree-shaking
   - 代码分割

## 对比总结

| 特性 | Vanilla JS | Vue 3 |
|------|-----------|-------|
| 学习曲线 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 开发效率 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 可维护性 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 性能 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 扩展性 | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 包体积 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

## 最终推荐

**强烈推荐使用 Vue 3**，因为：

1. ✅ 您的需求虽然不复杂，但组件化需求明显
2. ✅ Vue 3的学习曲线平缓，易于上手
3. ✅ 开发效率显著提升
4. ✅ 便于未来扩展和维护
5. ✅ 符合现代前端开发标准

**实施建议：**
- 如果时间充裕：使用Vue 3重构
- 如果时间紧急：先上线Vanilla JS版本，后续迁移到Vue 3

