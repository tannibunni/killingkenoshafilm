<template>
  <section class="description-section relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden w-full">
    <!-- Background with gradient overlay - Full width -->
    <div class="absolute inset-0 w-full bg-gradient-to-b from-black via-gray-900 to-black"></div>
    
    <!-- Animated background elements - Full width -->
    <div class="absolute inset-0 w-full opacity-10">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-800 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>
    
    <!-- Content - Centered but background is full width -->
    <div class="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
      <div 
        :class="[
          'text-center transition-all duration-1000 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        ]"
      >
        <!-- Stars -->
        <div class="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          <i class="ri-star-fill text-yellow-400 text-lg sm:text-xl md:text-2xl"></i>
          <i class="ri-star-fill text-yellow-400 text-lg sm:text-xl md:text-2xl"></i>
          <i class="ri-star-fill text-yellow-400 text-lg sm:text-xl md:text-2xl"></i>
          <i class="ri-star-fill text-yellow-400 text-lg sm:text-xl md:text-2xl"></i>
          <i class="ri-star-fill text-yellow-400 text-lg sm:text-xl md:text-2xl"></i>
        </div>
        
        <!-- Main Description -->
        <p class="text-gray-200 text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed font-light tracking-wide mb-4 sm:mb-6 px-2">
          A bold collage of thousands of primary sources covering the riots from the shooting of Jacob Blake through the murder trial of Kyle Rittenhouse.
        </p>
        <p class="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-light tracking-wide mb-8">
        </p>
        
        
        <!-- Decorative line -->
        <div class="mt-8 sm:mt-12 flex items-center justify-center gap-3 sm:gap-4">
          <div class="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          <!-- <div class="w-2 h-2 bg-red-600 rounded-full"></div> -->
          <div class="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  // Trigger animation after component mounts
  setTimeout(() => {
    isVisible.value = true
  }, 200)
})
</script>

<style scoped>
.description-section {
  min-height: 30vh;
}

@media (min-width: 640px) {
  .description-section {
    min-height: 35vh;
  }
}

@media (min-width: 768px) {
  .description-section {
    min-height: 40vh;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
}
</style>

