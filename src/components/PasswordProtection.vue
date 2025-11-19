<template>
  <div 
    class="absolute inset-0 flex items-center justify-center z-10 overflow-hidden"
    :style="{ 
      backgroundImage: `url('/4K.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <!-- 模糊遮罩层 -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
    
    <!-- Mobile: Play Button with Text -->
    <div v-if="!showPasswordForm" class="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 sm:hidden">
      <button
        @click="showPasswordForm = true"
        class="w-20 h-20 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full mb-4 transition-all duration-300 transform hover:scale-105 shadow-xl"
        aria-label="Enter password to play"
      >
        <i class="ri-play-fill text-3xl"></i>
      </button>
      <p class="text-white text-sm">Enter password to play</p>
    </div>
    
    <!-- Desktop: Password Form (always visible) -->
    <div v-if="windowWidth >= 640" class="relative bg-black/90 border border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 max-w-md w-full mx-4 backdrop-blur-sm">
      <div class="text-center">
        <!-- Lock Icon -->
        <div class="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-800 rounded-full mx-auto mb-3 sm:mb-4 md:mb-6">
          <i class="ri-lock-line text-lg sm:text-2xl text-gray-300"></i>
        </div>
        
        <!-- Title -->
        <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3 md:mb-4">Protected Content</h3>
        
        <!-- Description -->
        <p class="text-gray-300 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6">
          Please enter the access password to watch the complete documentary
        </p>
    
        <!-- Password Input -->
        <div class="space-y-3 sm:space-y-4">
          <input 
            v-model="passwordInput"
            type="password" 
            placeholder="Enter password"
            class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-center text-sm sm:text-base"
            @keypress.enter="checkPassword"
          />
          
          <!-- Buttons -->
          <button 
            @click="checkPassword"
            :disabled="isVerifying"
            class="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <span v-if="!isVerifying">Unlock & Watch</span>
            <span v-else class="flex items-center justify-center gap-2">
              <i class="ri-loader-4-line animate-spin"></i>
              Verifying...
            </span>
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
  
  <!-- Mobile: Password Form Modal (Fixed Position) -->
  <Transition name="fade">
    <div 
      v-if="showPasswordForm && windowWidth < 640"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="showPasswordForm = false"
    >
      <Transition name="slide-up">
        <div 
          v-if="showPasswordForm"
          class="bg-black/95 border border-gray-700 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="p-4 sm:p-6">
            <!-- Close Button -->
            <div class="flex justify-end mb-4">
              <button
                @click="showPasswordForm = false"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <i class="ri-close-line text-2xl"></i>
              </button>
            </div>
            
            <div class="text-center">
              <!-- Lock Icon -->
              <div class="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full mx-auto mb-4">
                <i class="ri-lock-line text-xl text-gray-300"></i>
              </div>
              
              <!-- Title -->
              <h3 class="text-lg font-semibold text-white mb-2">Protected Content</h3>
              
              <!-- Description -->
              <p class="text-gray-300 text-sm mb-4">
                Please enter the access password to watch the complete documentary
              </p>
          
              <!-- Password Input -->
              <div class="space-y-3">
                <input 
                  v-model="passwordInput"
                  type="password" 
                  placeholder="Enter password"
                  class="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-center text-sm"
                  @keypress.enter="checkPassword"
                />
                
                <!-- Buttons -->
                <button 
                  @click="checkPassword"
                  :disabled="isVerifying"
                  class="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <span v-if="!isVerifying">Unlock & Watch</span>
                  <span v-else class="flex items-center justify-center gap-2">
                    <i class="ri-loader-4-line animate-spin"></i>
                    Verifying...
                  </span>
                </button>
                
                <!-- Contact Link -->
                <div class="text-center mt-2">
                  <button 
                    @click="openContactForm"
                    class="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300 inline-flex items-center gap-1 cursor-pointer"
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
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePlayerStore } from '../stores/player'
import { appConfig } from '../config'
import ContactForm from './ContactForm.vue'

const emit = defineEmits(['unlock'])
const playerStore = usePlayerStore()

const passwordInput = ref('')
const error = ref('')
const isContactFormOpen = ref(false)
const isVerifying = ref(false)
const showPasswordForm = ref(false)
const windowWidth = ref(0)

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const checkPassword = async () => {
  if (!passwordInput.value.trim()) {
    error.value = 'Please enter a password'
    return
  }

  isVerifying.value = true
  error.value = ''

  try {
    // 调用后端 API 验证密码
    const response = await fetch(appConfig.password.verifyEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: passwordInput.value
      })
    })

    const data = await response.json()

    if (data.success) {
      error.value = ''
      passwordInput.value = ''
      showPasswordForm.value = false // 关闭移动端弹窗
      playerStore.unlock()
      emit('unlock')
    } else {
      error.value = 'Incorrect password, please try again'
      passwordInput.value = ''
    }
  } catch (err) {
    console.error('Password verification error:', err)
    error.value = 'Failed to verify password. Please try again.'
  } finally {
    isVerifying.value = false
  }
}

const openContactForm = () => {
  // 移动端：先关闭密码弹窗，再打开联系表单
  if (windowWidth.value < 640 && showPasswordForm.value) {
    showPasswordForm.value = false
    // 等待弹窗关闭动画完成后再打开联系表单
    setTimeout(() => {
      isContactFormOpen.value = true
    }, 300)
  } else {
    // 桌面端：直接打开联系表单
    isContactFormOpen.value = true
  }
}

const closeContactForm = () => {
  isContactFormOpen.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

