<template>
  <div id="app" class="bg-black min-h-screen">
    <!-- Hero Banner Section -->
    <HeroBanner 
      :title="documentary.title"
      :description="documentary.description"
      :poster-image="documentary.posterImage"
      :background-image="documentary.heroBackground"
      @play="handlePlay"
      @share="handleShare"
    />
    
    <!-- Main Content -->
    <main class="container mx-auto px-6 py-12 max-w-6xl">
      <!-- Video Player Section -->
      <VideoPlayerSection 
        :is-unlocked="playerStore.isUnlocked"
        :video-url="playerStore.videoUrl"
      />
    </main>
    
    <!-- Watermark -->
    <Watermark />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePlayerStore } from './stores/player'
import HeroBanner from './components/HeroBanner.vue'
import VideoPlayerSection from './components/VideoPlayerSection.vue'
import Watermark from './components/Watermark.vue'
import { documentaryConfig } from './config'

const playerStore = usePlayerStore()

// 初始化配置
const documentary = documentaryConfig

const handlePlay = () => {
  // 滚动到播放器
  document.querySelector('.video-player-section')?.scrollIntoView({ behavior: 'smooth' })
}

const handleShare = () => {
  // 分享功能
  console.log('Share clicked')
}

onMounted(() => {
  // 初始化
  playerStore.init()
})
</script>

<style>
/* 全局样式 */
</style>

