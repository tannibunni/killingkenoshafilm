<template>
  <div 
    class="absolute inset-0 flex items-center justify-center z-10"
    :style="{ 
      backgroundImage: `url('/4K.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <!-- 模糊遮罩层 -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
    
    <!-- 密码输入框容器 -->
    <div class="relative bg-black/90 border border-gray-700 rounded-lg sm:rounded-xl p-6 sm:p-8 max-w-md w-full mx-4 backdrop-blur-sm">
      <div class="text-center">
        <!-- Lock Icon -->
        <div class="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-800 rounded-full mx-auto mb-4 sm:mb-6">
          <i class="ri-lock-line text-xl sm:text-2xl text-gray-300"></i>
        </div>
        
        <!-- Title -->
        <h3 class="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Protected Content</h3>
        
        <!-- Description -->
        <p class="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
          Please enter the access password to watch the complete documentary
        </p>
        
        <!-- Password Input -->
        <div class="space-y-4">
          <input 
            v-model="passwordInput"
            type="password" 
            placeholder="Enter password"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-center"
            @keypress.enter="checkPassword"
          />
          
          <!-- Buttons -->
          <button 
            @click="checkPassword"
            class="w-full bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Unlock & Watch
          </button>
          
          <!-- Contact Link -->
          <div class="text-center mt-2 sm:mt-3">
            <button
              @click="openContactForm"
              class="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300 inline-flex items-center gap-1 cursor-pointer"
            >
              Don't have the code? contact the creator
              <span class="text-gray-500">>></span>
            </button>
          </div>
        </div>
        
        <!-- Error Message -->
        <div 
          v-if="error"
          class="text-red-500 text-sm mt-2"
        >
          {{ error }}
        </div>
      </div>
    </div>
    
    <!-- Contact Form Modal -->
    <ContactForm 
      :is-open="isContactFormOpen"
      @close="closeContactForm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePlayerStore } from '../stores/player'
import { appConfig } from '../config'
import ContactForm from './ContactForm.vue'

const emit = defineEmits(['unlock'])
const playerStore = usePlayerStore()

const passwordInput = ref('')
const error = ref('')
const isContactFormOpen = ref(false)

const checkPassword = () => {
  if (passwordInput.value === appConfig.password.default) {
    error.value = ''
    passwordInput.value = ''
    playerStore.unlock()
    emit('unlock')
  } else {
    error.value = 'Incorrect password, please try again'
    passwordInput.value = ''
  }
}

const openContactForm = () => {
  isContactFormOpen.value = true
}

const closeContactForm = () => {
  isContactFormOpen.value = false
}
</script>

