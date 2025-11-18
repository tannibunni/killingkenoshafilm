<template>
  <section class="video-player-section bg-black/90 rounded-xl shadow-2xl overflow-hidden mb-8 border border-gray-900">
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
    
    <!-- Episode Selection -->
    <div class="hidden">
      <EpisodeSelector />
    </div>
    
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
</script>

