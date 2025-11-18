<template>
  <section 
    class="hero-banner relative w-full h-96 bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${backgroundImage}')` }"
  >
    <div class="container mx-auto px-6 h-full flex items-center">
      <div class="flex items-center gap-8 w-full max-w-6xl">
        <!-- Poster Image -->
        <div class="flex-shrink-0">
          <img 
            :src="posterImage" 
            :alt="title"
            class="w-64 h-80 object-cover rounded-lg shadow-2xl"
          />
        </div>
        
        <!-- Content Area -->
        <div class="flex-1 text-white">
          <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
          <p class="text-lg mb-6 leading-relaxed max-w-2xl">
            {{ description }}
          </p>
          
          <!-- Action Buttons -->
          <div class="flex items-center gap-4">
            <button 
              @click="$emit('play')"
              class="bg-primary hover:bg-red-700 text-white px-8 py-3 !rounded-button font-semibold flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i class="ri-play-fill text-xl"></i>
              Play Now
            </button>
            
            <button 
              @click="$emit('share')"
              class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 !rounded-button font-semibold flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i class="ri-share-line text-xl"></i>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  posterImage: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String,
    required: true
  }
})

defineEmits(['play', 'share'])
</script>

<style scoped>
.hero-banner {
  /* 自定义样式 */
}
</style>

