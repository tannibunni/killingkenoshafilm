<template>
  <section id="watch" class="video-player-section bg-black/90 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden mb-6 sm:mb-8 border border-gray-900">
    <!-- Video Container -->
    <div class="aspect-video bg-black relative">
      <!-- Password Protection Overlay -->
      <PasswordProtection 
        v-if="!isUnlocked"
        @unlock="handleUnlock"
      />
      
      <!-- Video Player -->
      <iframe 
        v-show="isUnlocked"
        id="video-player"
        :src="videoUrl"
        style="border:0;height:100%;width:100%;max-width:100%"
        allowFullScreen="true"
        allow="encrypted-media"
      />
    </div>
    
    <!-- Scroll Indicator -->
    <div class="px-4 sm:px-6 py-4 sm:py-6 text-center border-t border-gray-800">
      <div class="flex flex-col items-center gap-3">
        <button
          @click="scrollToShare"
          class="text-gray-400 hover:text-white transition-colors duration-300"
        >
          <!-- <i class="ri-arrow-down-s-line text-3xl sm:text-4xl"></i> -->
        </button>
        
      </div>
    </div>
    
    <!-- Episode Selection -->
    <!-- <div class="hidden">
      <EpisodeSelector />
    </div> -->
    
    <!-- Share Section -->
    <ShareButtons />
  </section>
</template>

<script setup>
import PasswordProtection from './PasswordProtection.vue'
import EpisodeSelector from './EpisodeSelector.vue'
import ShareButtons from './ShareButtons.vue'
import { usePlayerStore } from '../stores/player'

const props = defineProps({
  isUnlocked: {
    type: Boolean,
    default: false
  },
  videoUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['unlock'])
const playerStore = usePlayerStore()

const handleUnlock = () => {
  emit('unlock')
  playerStore.unlock()
}

const scrollToShare = () => {
  const shareSection = document.getElementById('share-section')
  if (shareSection) {
    shareSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

