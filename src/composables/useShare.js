import { ref } from 'vue'
import { appConfig } from '../config'

export function useShare() {
  // 使用固定的网站链接
  const shareUrl = ref('https://killingkenosha.com/')
  
  // 分享文本配置
  const shareTexts = {
    twitter: 'A new exciting documentary by @0rf https://www.givesendgo.com/KillingKenoshaFilm',
    default: 'A new exciting documentary by Matt Orfalea https://www.givesendgo.com/KillingKenoshaFilm'
  }
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}&quote=${encodeURIComponent(shareTexts.default)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTexts.twitter)}`,
    instagram: `https://www.instagram.com/`
  }
  
  const shareToPlatform = (platform) => {
    const url = shareUrls[platform]
    if (!url) return
    
    if (platform === 'instagram') {
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

