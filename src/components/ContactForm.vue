<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div 
      v-if="isOpen"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="close"
    >
      <!-- Modal -->
      <Transition name="slide-up">
        <div 
          v-if="isOpen"
          class="bg-black/95 border border-gray-700 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
            <h3 class="text-xl sm:text-2xl font-semibold text-white">Contact the Creator</h3>
            <button
              @click="close"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <i class="ri-close-line text-2xl"></i>
            </button>
          </div>

          <!-- Content -->
          <div class="p-4 sm:p-6">
            <!-- Success State: Replace entire form -->
            <Transition name="fade">
              <div v-if="showSuccess" class="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                <!-- Check Icon -->
                <div class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-green-500 rounded-full mb-4 sm:mb-6">
                  <i class="ri-check-line text-3xl sm:text-4xl text-white"></i>
                </div>
                
                <!-- Success Message -->
                <p class="text-white text-base sm:text-lg md:text-xl font-medium">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            </Transition>

            <!-- Form Content (hidden when success) -->
            <Transition name="fade">
              <div v-if="!showSuccess">
                <!-- Social Links -->
                <div class="mb-4 sm:mb-6">
                  <p class="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">Reach out directly:</p>
                  <div class="flex flex-wrap gap-2 sm:gap-3">
                    <a
                      href="https://x.com/0rf"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors text-xs sm:text-sm"
                    >
                      <i class="ri-twitter-x-fill text-base sm:text-lg"></i>
                      <span>X (Twitter)</span>
                    </a>
                  </div>
                </div>

                <!-- Divider -->
                <div class="relative mb-6">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-700"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-4 bg-black/95 text-gray-400">Or send a message</span>
                  </div>
                </div>

                <!-- Contact Form -->
                <form @submit.prevent="submitForm" class="space-y-3 sm:space-y-4">
                  <!-- Name -->
                  <div>
                    <label for="name" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>

                  <!-- Email -->
                  <div>
                    <label for="email" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <!-- Message -->
                  <div>
                    <label for="message" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      v-model="form.message"
                      required
                      rows="4"
                      class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all resize-none text-sm sm:text-base"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <span v-if="!isSubmitting">Send Message</span>
                    <span v-else class="flex items-center justify-center gap-2">
                      <i class="ri-loader-4-line animate-spin"></i>
                      Sending...
                    </span>
                  </button>

                  <!-- Error Message -->
                  <Transition name="fade">
                    <div 
                      v-if="showError"
                      class="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm mt-3 sm:mt-4"
                    >
                      <i class="ri-error-warning-line inline-block mr-2"></i>
                      {{ errorMessage }}
                    </div>
                  </Transition>
                </form>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import emailjs from '@emailjs/browser'
import { appConfig } from '../config'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// Social links moved to template

const close = () => {
  emit('close')
  // Reset form after closing animation completes
  setTimeout(() => {
    form.value = { name: '', email: '', message: '' }
    showSuccess.value = false
    showError.value = false
    errorMessage.value = ''
  }, 500)
}

const submitForm = async () => {
  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    const { emailjs: emailjsConfig, googleSheets, contact } = appConfig
    
    // Save to Google Sheets if configured
    if (googleSheets.webAppUrl) {
      try {
        const payload = {
          name: form.value.name,
          email: form.value.email,
          message: form.value.message
        }
        
        console.log('Saving to Google Sheets:', payload)
        console.log('Web App URL:', googleSheets.webAppUrl)
        
        // Send to Google Sheets using JSON format
        // Google Apps Script expects JSON in e.postData.contents
        const jsonPayload = JSON.stringify(payload)
        
        const response = await fetch(googleSheets.webAppUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonPayload
        })
        
        console.log('Google Sheets save request sent (JSON format)')
        
        // Note: With no-cors mode, we can't read the response
        // But the request should still be sent to Google Sheets
        console.log('Google Sheets save request completed')
      } catch (sheetsError) {
        console.error('Google Sheets save failed:', sheetsError)
        // Continue even if Sheets save fails - don't block email sending
      }
    } else {
      console.warn('Google Sheets Web App URL not configured. Check VITE_GOOGLE_SHEETS_WEB_APP_URL environment variable.')
    }
    
    // Check if EmailJS is configured
    if (!emailjsConfig.publicKey || !emailjsConfig.serviceId || !emailjsConfig.templateId) {
      // Fallback to mailto if EmailJS is not configured
      const subject = encodeURIComponent(`Contact from ${form.value.name}`)
      const body = encodeURIComponent(
        `Name: ${form.value.name}\nEmail: ${form.value.email}\n\nMessage:\n${form.value.message}`
      )
      const mailtoLink = `mailto:${contact.email}?subject=${subject}&body=${body}`
      window.location.href = mailtoLink
      // Reset form first
      form.value = { name: '', email: '', message: '' }
      // Show success state (replaces entire form)
      showSuccess.value = true
      // Close modal after 4 seconds to give user time to see the success message
      setTimeout(() => {
        close()
      }, 4000)
      return
    }

    // Send email using EmailJS
    const templateParams = {
      from_name: form.value.name,
      from_email: form.value.email,
      message: form.value.message,
      to_email: contact.email,
      subject: `Contact from ${form.value.name} - Killing Kenosha Website`
    }
    
    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams,
      emailjsConfig.publicKey
    )
    
    // Reset form first
    form.value = { name: '', email: '', message: '' }
    
    // Show success state (replaces entire form)
    showSuccess.value = true
    
    // Close modal after 4 seconds to give user time to see the success message
    setTimeout(() => {
      close()
    }, 4000)
  } catch (error) {
    console.error('Form submission error:', error)
    showError.value = true
    errorMessage.value = 'Failed to send message. Please try again or use the social links above.'
  } finally {
    isSubmitting.value = false
  }
}

// Close on Escape key
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        close()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }
})
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

