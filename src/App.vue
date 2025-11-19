<template>
  <div id="app" class="bg-black min-h-screen">
    <!-- Hero Section -->
    <Hero 
      :background-image="documentary.heroBackground"
      @play="handlePlay"
    />
    
    <!-- Main Content -->
    <main>
      <!-- Description Section - Full width background -->
      <DescriptionSection />
      
      <!-- Video Player Section -->
      <div class="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
      <VideoPlayerSection 
        :is-unlocked="playerStore.isUnlocked"
        :video-url="playerStore.videoUrl"
        />
      </div>
      
      <!-- Bio Section - Independent Section -->
      <div class="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        <Bio />
      </div>
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePlayerStore } from './stores/player'
import Hero from './components/Hero.vue'
import DescriptionSection from './components/DescriptionSection.vue'
import VideoPlayerSection from './components/VideoPlayerSection.vue'
import Bio from './components/Bio.vue'
import Footer from './components/Footer.vue'
import { documentaryConfig } from './config'

const playerStore = usePlayerStore()

// 初始化配置
const documentary = documentaryConfig

const handlePlay = () => {
  // 滚动到播放器
  document.querySelector('.video-player-section')?.scrollIntoView({ behavior: 'smooth' })
}

const handleShare = () => {
  // 滚动到分享部分
  const shareSection = document.getElementById('share-section')
  if (shareSection) {
    shareSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

onMounted(() => {
  // 初始化
  playerStore.init()
})
</script>

<style>
/* 全局样式 */
</style>

