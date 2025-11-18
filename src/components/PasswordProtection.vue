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
    <div class="relative bg-black/90 border border-gray-700 rounded-xl p-8 max-w-md w-full mx-4 backdrop-blur-sm">
      <div class="text-center">
        <!-- Lock Icon -->
        <div class="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full mx-auto mb-6">
          <i class="ri-lock-line text-2xl text-gray-300"></i>
        </div>
        
        <!-- Title -->
        <h3 class="text-2xl font-semibold text-white mb-4">Protected Content</h3>
        
        <!-- Description -->
        <p class="text-gray-300 mb-6">
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
            class="w-full bg-primary hover:bg-red-700 text-white py-3 !rounded-button font-semibold transition-colors whitespace-nowrap cursor-pointer"
          >
            Unlock & Watch
          </button>
          
          <button 
            @click="contactCreator"
            class="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 !rounded-button font-semibold transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
          >
            <i class="ri-mail-line"></i>
            Contact the Creator
          </button>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePlayerStore } from '../stores/player'
import { appConfig } from '../config'

const emit = defineEmits(['unlock'])
const playerStore = usePlayerStore()

const passwordInput = ref('')
const error = ref('')

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

const contactCreator = () => {
  const { email, subject } = appConfig.contact
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`
}
</script>

