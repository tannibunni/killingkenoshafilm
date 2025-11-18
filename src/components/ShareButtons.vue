<template>
  <div class="px-6 pb-6 border-t border-gray-800">
    <div class="flex items-center justify-between pt-6">
      <h4 class="text-lg font-semibold text-gray-300">Share this documentary</h4>
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
  { name: 'instagram', label: 'Instagram', icon: 'ri-instagram-fill', bgColor: 'bg-pink-500', hoverColor: 'hover:bg-pink-600' },
  { name: 'linkedin', label: 'LinkedIn', icon: 'ri-linkedin-fill', bgColor: 'bg-blue-700', hoverColor: 'hover:bg-blue-800' },
  { name: 'reddit', label: 'Reddit', icon: 'ri-reddit-fill', bgColor: 'bg-orange-600', hoverColor: 'hover:bg-orange-700' },
  { name: 'email', label: 'Email', icon: 'ri-mail-fill', bgColor: 'bg-gray-600', hoverColor: 'hover:bg-gray-700' }
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
</script>

