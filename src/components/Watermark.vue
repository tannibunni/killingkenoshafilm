<template>
  <div class="fixed bottom-12 right-12 z-50">
    <!-- Watermark Button -->
    <div 
      id="watermark" 
      class="group cursor-pointer relative"
      style="width: 184px; height: 39px; background-color: rgb(240, 240, 240); border: 3px solid rgb(229, 231, 235); border-radius: 12px; display: flex; align-items: center; justify-content: center;"
      @click="toggleMenu"
    >
      <div class="designed-by" style="color: rgb(93, 93, 93); font-family: 'Secular One'; font-size: 12px; line-height: 20px; font-weight: 400; padding-left: 12px;">
        Produced by Matt Orf
      </div>
    </div>

    <!-- Popup Menu -->
    <Transition name="slide-up">
      <div 
        v-if="isMenuOpen"
        class="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden min-w-[200px]"
        style="box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);"
      >
        <div class="py-2">
          <a
            v-for="link in links"
            :key="link.id"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
            @click.stop
          >
            <i :class="link.icon" class="text-lg"></i>
            <span>{{ link.label }}</span>
          </a>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <Transition name="fade">
      <div 
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/20 z-40"
        style="top: 0; left: 0; right: 0; bottom: 0;"
        @click="closeMenu"
      ></div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)

const links = [
  {
    id: 'x',
    label: 'X (Twitter)',
    url: 'https://x.com/0rf',
    icon: 'ri-twitter-x-fill'
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@Orf',
    icon: 'ri-youtube-fill'
  },
  {
    id: 'substack',
    label: 'Substack',
    url: 'https://substack.com/@mattorf',
    icon: 'ri-article-line'
  },
  {
    id: 'givesendgo',
    label: 'Givesendgo',
    url: 'https://www.givesendgo.com/KillingKenoshaFilm',
    icon: 'ri-hand-coin-line'
  },
  {
    id: 'gofundme',
    label: 'GoFundMe',
    url: 'https://www.gofundme.com/f/killingkenoshadocumentary',
    icon: 'ri-heart-line'
  }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleClickOutside = (event) => {
  const watermark = document.getElementById('watermark')
  if (watermark && !watermark.contains(event.target) && isMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

