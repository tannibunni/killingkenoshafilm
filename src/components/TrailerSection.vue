<template>
  <section id="trailer" class="trailer-section relative w-full">
    <!-- Content - Only the video, no background, floating above Hero -->
    <div class="container mx-auto px-4 sm:px-6 max-w-5xl relative z-20">
      <div 
        :class="[
          'text-center transition-all duration-1000 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        ]"
      >
        <!-- YouTube Trailer Embed -->
        <div class="pb-8 sm:pb-12 md:pb-16">
          <div class="aspect-video w-full max-w-4xl mx-auto rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <iframe
              src="https://www.youtube.com/embed/bbYO4Z57VpM?si=zA_f23CCvYyOSf8w"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              class="w-full h-full"
            ></iframe>
          </div>
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
.trailer-section {
  min-height: auto;
  pointer-events: none;
  margin-top: -120px;
}

.trailer-section > * {
  pointer-events: auto;
}

@media (min-width: 640px) {
  .trailer-section {
    margin-top: -140px;
  }
}

@media (min-width: 768px) {
  .trailer-section {
    margin-top: -160px;
  }
}

@media (min-width: 1024px) {
  .trailer-section {
    margin-top: 0px;
  }
}
</style>

