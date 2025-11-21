import { ref } from 'vue'
import { appConfig } from '../config'

export function useShare() {
  // 使用固定的网站链接
  const shareUrl = ref('https://killingkenosha.com/')
  
  // 分享文本配置
  const shareTexts = {
    twitter: 'A new exciting documentary by @0rf https://www.givesendgo.com/KillingKenoshaFilm',
    default: 'A new exciting documentary by Matt Orfalea https://www.givesendgo.com/KillingKenoshaFilm',
    instagram: 'Check out this exciting new documentary by @mattorf: KILLING KENOSHA - A daring collage of thousands of primary sources covering the riots from the shooting of Jacob Blake through the murder trial of Kyle Rittenhouse. https://killingkenosha.com/'
  }
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}&quote=${encodeURIComponent(shareTexts.default)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTexts.twitter)}`,
    instagram: `https://www.instagram.com/`
  }
  
  // Instagram 分享函数 - 使用 Web Share API 分享图片和文案
  const shareToInstagram = async () => {
    // 检查是否支持 Web Share API
    if (navigator.share && navigator.canShare) {
      try {
        // 获取图片文件
        const imageUrl = '/poster2.jpeg'
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const file = new File([blob], 'killing-kenosha-poster.jpeg', { type: blob.type })
        
        // 检查是否可以分享文件
        const shareData = {
          title: 'Killing Kenosha - Documentary',
          text: shareTexts.instagram,
          url: shareUrl.value,
          files: [file]
        }
        
        // 检查是否支持分享文件
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData)
          return
        }
        
        // 如果不支持文件分享，尝试只分享文本和链接
        const textShareData = {
          title: 'Killing Kenosha - Documentary',
          text: shareTexts.instagram,
          url: shareUrl.value
        }
        
        if (navigator.canShare(textShareData)) {
          await navigator.share(textShareData)
          return
        }
      } catch (error) {
        // 用户取消分享或出错
        if (error.name !== 'AbortError') {
          console.error('Error sharing to Instagram:', error)
          // 降级方案：提供手动分享提示
          showInstagramFallback()
        }
        return
      }
    }
    
    // 降级方案：不支持 Web Share API 或分享失败
    showInstagramFallback()
  }
  
  // Instagram 降级方案：显示提示信息
  const showInstagramFallback = () => {
    const message = `To share on Instagram:\n\n1. Save this image: ${window.location.origin}/poster2.jpeg\n2. Open Instagram app\n3. Create a new post\n4. Add the image and use this caption:\n\n${shareTexts.instagram}\n\nClick OK to copy the caption to clipboard.`
    
    if (confirm(message)) {
      // 复制文案到剪贴板
      navigator.clipboard.writeText(shareTexts.instagram).then(() => {
        alert('Caption copied to clipboard! Now you can paste it in your Instagram post.')
      }).catch(() => {
        alert('Please manually copy the caption from the message above.')
      })
    }
  }
  
  const shareToPlatform = (platform) => {
    if (platform === 'instagram') {
      shareToInstagram()
    } else {
      const url = shareUrls[platform]
      if (!url) return
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

