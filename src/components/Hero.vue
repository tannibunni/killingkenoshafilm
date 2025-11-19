<template>
  <section 
    id="hero" 
    class="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
  >
    <!-- Background Image -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: `url(${backgroundImage})`
      }"
    >
      <div class="absolute inset-0 bg-black/70"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-16 sm:pt-20 md:pt-24 lg:pt-0">
            <!-- Main Title with smooth staggered animation -->
            <div class="mb-4 sm:mb-6">
              <h1 
                :class="[
                  'text-7xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-tight transition-all duration-[1500ms] ease-out',
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                ]"
              >
                KILLING
              </h1>
              <h1 
                :class="[
                  'text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-red-600 tracking-tight leading-tight transition-all duration-[1500ms] ease-out delay-300',
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                ]"
              >
                KENOSHA
              </h1>
            </div>
      
      <!-- Subtitle info -->
      <div 
        :class="[
          'flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 transition-all duration-[1200ms] ease-out delay-600',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        ]"
      >
        <!-- <span class="text-gray-300 text-base sm:text-lg"> 2026</span> -->
        <!-- <span class="text-gray-500 hidden sm:inline">|</span> -->
        <div class="flex items-center gap-2 text-gray-300">
          <i class="ri-time-line text-sm sm:text-base"></i>
          <span class="text-sm sm:text-base">Documentary • 120 min</span>
        </div>
      </div>
      
      <!-- Description -->
      <p 
        :class="[
          'text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 transition-all duration-[1200ms] ease-out delay-900',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        ]"
      >
        The definitive film on the Kenosha 2020 riots
      </p>

            <!-- Action Buttons -->
            <div 
              :class="[
                'flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-2xl mx-auto transition-all duration-[1200ms] ease-out delay-1200',
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              ]"
            >
              <button
                @click="scrollToWatch"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <i class="ri-play-fill text-xl sm:text-2xl"></i>
                <span>Watch Now</span>
              </button>
              
              <button
                @click="scrollToTrailer"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <i class="ri-play-circle-line text-xl sm:text-2xl"></i>
                <span>Trailer</span>
              </button>
            </div>

     
    </div>

    <!-- Gradient Overlay at Bottom -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  backgroundImage: {
    type: String,
    required: true
  }
})

const isLoaded = ref(false)

onMounted(() => {
  // Trigger animations after component mounts with smoother timing
  setTimeout(() => {
    isLoaded.value = true
  }, 200)
})

const scrollToWatch = () => {
  const watchSection = document.getElementById('watch') || document.querySelector('.video-player-section')
  if (watchSection) {
    const elementPosition = watchSection.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - 130
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const scrollToClips = () => {
  const clipsSection = document.getElementById('clips') || document.getElementById('share-section')
  if (clipsSection) {
    clipsSection.scrollIntoView({ behavior: 'smooth' })
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

defineEmits(['play', 'trailer'])
</script>

<style scoped>
/* Custom animations */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>

