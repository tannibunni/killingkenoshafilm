<template>
  <div id="app" class="bg-black min-h-screen">
    <!-- Hero Section -->
    <Hero 
      :background-image="documentary.heroBackground"
      @play="handlePlay"
    />
    
    <!-- Bottom Arrow Indicator - Below Hero -->
    <div class="relative z-20 flex justify-center pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6">
      <button
        @click="scrollToTrailer"
        class="text-white/80 hover:text-white transition-colors duration-300 animate-bounce"
        aria-label="Scroll to trailer"
      >
        <i class="ri-arrow-down-s-line text-4xl sm:text-5xl"></i>
      </button>
    </div>
    
    <!-- Main Content -->
    <main>
      <!-- Trailer Section - Overlaps Hero Banner -->
      <TrailerSection />
      
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
import TrailerSection from './components/TrailerSection.vue'
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

const scrollToTrailer = () => {
  const trailerSection = document.getElementById('trailer')
  if (trailerSection) {
    const elementPosition = trailerSection.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - 100
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
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

