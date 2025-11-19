<template>
  <footer class="bg-black py-8 sm:py-10">
    <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
      <div class="flex flex-col items-center justify-center text-center">
        <!-- Copyright -->
        <p class="text-gray-400 text-sm sm:text-base mb-2">
          © {{ currentYear }} Matt Orfalea. All rights reserved.
        </p>
        
        <!-- Additional Info -->
        <p class="text-gray-500 text-xs sm:text-sm">
          Killing Kenosha - Documentary
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<style scoped>
/* Footer styles */
</style>

