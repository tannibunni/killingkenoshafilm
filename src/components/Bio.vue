<template>
  <section id="bio-section" class="bg-black/90 rounded-lg sm:rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
    <div class="px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
            <!-- Bio Image -->
            <div class="flex-shrink-0 w-full md:w-auto">
              <img 
                src="/bio-matt orf.jpeg" 
                alt="Matt Orfalea"
                class="w-full h-auto sm:w-full sm:h-auto md:w-64 md:h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
      
      <!-- Bio Text -->
      <div class="flex-1 text-gray-300">
        <h4 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2">Matt Orfalea</h4>
        <p class="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Director / Producer / Editor</p>
        <p class="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
          Matt Orfalea (aka Orf) is an investigative video creator who's captivated millions online. His new documentary, <strong class="text-white">Killing Kenosha</strong> is a five-year project that draws on thousands of primary sources, including explosive new interviews, and tons of never-before-seen footage. Your support is sincerely appreciated.
        </p>
        
        <!-- Donation Buttons -->
        <div class="flex flex-col gap-3 sm:gap-4">
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="https://www.givesendgo.com/KillingKenoshaFilm"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:flex-1 inline-flex items-center justify-center gap-2 sm:gap-3 bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl whitespace-nowrap"
            >
              <i class="ri-hand-coin-line text-xl sm:text-2xl"></i>
              <span>Givesendgo</span>
            </a>
            
            <!-- Contact Button -->
            <button
              @click="openContactForm"
              class="w-full sm:flex-1 inline-flex items-center justify-center gap-2 sm:gap-3 bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl whitespace-nowrap"
            >
              <i class="ri-mail-line text-xl sm:text-2xl"></i>
              <span>Contact</span>
            </button>
          </div>
          
          <!-- Social Links -->
          <div class="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="https://www.youtube.com/@Orf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <i class="ri-youtube-fill text-xl"></i>
              <span class="text-sm sm:text-base">YouTube</span>
            </a>
            
            <a
              href="https://x.com/0rf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <i class="ri-twitter-x-fill text-xl"></i>
              <span class="text-sm sm:text-base">X (Twitter)</span>
            </a>
            
            <a
              href="https://www.instagram.com/mattorf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <i class="ri-instagram-fill text-xl"></i>
              <span class="text-sm sm:text-base">Instagram</span>
            </a>
            
            <a
              href="https://substack.com/@mattorf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <i class="ri-article-line text-xl"></i>
              <span class="text-sm sm:text-base">Substack</span>
            </a>
          </div>
        </div>
        
        <!-- Contact Form Modal -->
        <ContactForm 
          :is-open="isContactFormOpen"
          @close="closeContactForm"
        />
      </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ContactForm from './ContactForm.vue'

const isContactFormOpen = ref(false)

const openContactForm = () => {
  isContactFormOpen.value = true
}

const closeContactForm = () => {
  isContactFormOpen.value = false
}
</script>

<style scoped>
/* Bio component styles */
</style>

