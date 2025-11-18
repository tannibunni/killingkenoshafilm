import { ref } from 'vue'
import { appConfig } from '../config'

export function useShare() {
  const shareUrl = ref(window.location.href)
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(document.title)}`,
    instagram: `https://www.instagram.com/`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl.value)}&title=${encodeURIComponent(document.title)}`,
    email: `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(shareUrl.value)}`
  }
  
  const shareToPlatform = (platform) => {
    const url = shareUrls[platform]
    if (!url) return
    
    if (platform === 'email') {
      window.location.href = url
    } else if (platform === 'instagram') {
      // Instagram不支持直接分享URL，打开应用
      alert('Please share manually on Instagram')
    } else {
      window.open(url, '_blank', 'width=600,height=400')
    }
  }
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl.value)
      return true
    } catch (err) {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl.value
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        document.body.removeChild(textArea)
        return true
      } catch (err) {
        document.body.removeChild(textArea)
        console.error('Failed to copy link:', err)
        return false
      }
    }
  }
  
  return {
    shareUrl,
    shareToPlatform,
    copyLink
  }
}

