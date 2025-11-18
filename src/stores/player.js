import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { appConfig } from '../config'

export const usePlayerStore = defineStore('player', () => {
  // State
  const isUnlocked = ref(false)
  const currentEpisode = ref('intro')
  const episodes = ref(appConfig.episodes)
  const videoUrl = ref(appConfig.video.getVideoUrl(0))
  
  // Getters
  const currentEpisodeData = computed(() => {
    return episodes.value.find(ep => ep.id === currentEpisode.value)
  })
  
  // Actions
  function unlock() {
    isUnlocked.value = true
  }
  
  function lock() {
    isUnlocked.value = false
  }
  
  function selectEpisode(episodeId) {
    currentEpisode.value = episodeId
    const episode = episodes.value.find(ep => ep.id === episodeId)
    if (episode) {
      updateVideoUrl(episode.startTime)
    }
  }
  
  function updateVideoUrl(startTime) {
    // 使用配置中的getVideoUrl方法生成URL
    videoUrl.value = appConfig.video.getVideoUrl(startTime)
  }
  
  function init() {
    // 初始化默认章节
    const defaultEpisode = episodes.value.find(ep => ep.isActive) || episodes.value[0]
    if (defaultEpisode) {
      selectEpisode(defaultEpisode.id)
    }
  }
  
  return {
    // State
    isUnlocked,
    currentEpisode,
    episodes,
    videoUrl,
    // Getters
    currentEpisodeData,
    // Actions
    unlock,
    lock,
    selectEpisode,
    updateVideoUrl,
    init
  }
})

