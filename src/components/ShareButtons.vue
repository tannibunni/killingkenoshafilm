<template>

    
  <div id="share-section" class="px-4 sm:px-6 md:pt-40 pb-4 sm:pb-6">
    <div class="flex flex-col items-center">
      <!-- Subtle Down Arrow -->
      <button
        @click="scrollToBio"
        class="mb-4 sm:mb-6 text-gray-500/50 hover:text-gray-400/70 transition-colors duration-300 cursor-pointer animate-bounce-subtle"
        title="Continue browsing"
      >
        <i class="ri-arrow-down-s-line text-2xl sm:text-3xl"></i>
      </button>
      
      <h4 class="text-base sm:text-lg font-semibold text-gray-300 mb-3 sm:mb-4">Share this documentary</h4>
      <div class="flex items-center gap-3">
        <button
          v-for="platform in platforms"
          :key="platform.name"
          :class="[
            'w-10 h-10 flex items-center justify-center text-white rounded-full transition-colors cursor-pointer',
            platform.bgColor,
            platform.hoverColor
          ]"
          @click="shareToPlatform(platform.name)"
          :title="`Share to ${platform.label}`"
        >
          <i :class="[platform.icon, 'text-lg']"></i>
        </button>
        
        <button
          @click="copyLink"
          class="w-10 h-10 flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors cursor-pointer"
          title="Copy link"
        >
          <i :class="[copyIcon, 'text-lg']"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useShare } from '../composables/useShare'

const { shareUrl, shareToPlatform: share, copyLink: copy } = useShare()

const copyIcon = ref('ri-link')
const copySuccessIcon = 'ri-check-line'

const platforms = [
  { name: 'facebook', label: 'Facebook', icon: 'ri-facebook-fill', bgColor: 'bg-blue-600', hoverColor: 'hover:bg-blue-700' },
  { name: 'twitter', label: 'Twitter', icon: 'ri-twitter-x-fill', bgColor: 'bg-sky-500', hoverColor: 'hover:bg-sky-600' },
  { name: 'instagram', label: 'Instagram', icon: 'ri-instagram-fill', bgColor: 'bg-pink-500', hoverColor: 'hover:bg-pink-600' }
]

const shareToPlatform = (platform) => {
  share(platform)
}

const copyLink = async () => {
  const success = await copy()
  if (success) {
    copyIcon.value = copySuccessIcon
    setTimeout(() => {
      copyIcon.value = 'ri-link'
    }, 2000)
  }
}

const scrollToBio = () => {
  const bioSection = document.getElementById('bio-section')
  if (bioSection) {
    bioSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
/* Subtle bounce animation */
@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}
</style>

