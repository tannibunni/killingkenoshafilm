<template>
  <div 
    :class="[
      'episode-card p-4 rounded-lg cursor-pointer transition-all duration-300 border',
      isActive 
        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/50' 
        : 'bg-gray-800/80 hover:bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-200'
    ]"
    @click="$emit('click')"
  >
    <div class="flex items-center gap-3 mb-3">
      <div 
        :class="[
          'w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all',
          isActive 
            ? 'bg-white text-primary shadow-md' 
            : 'bg-gray-700 text-gray-300 border border-gray-600'
        ]"
      >
        {{ episodeNumber }}
      </div>
      <h5 
        :class="[
          'font-semibold text-base',
          isActive ? 'text-white' : 'text-gray-200'
        ]"
      >
        {{ episode.title }}
      </h5>
    </div>
    <p 
      :class="[
        'text-sm mb-2 font-medium',
        isActive ? 'text-white/90' : 'text-gray-400'
      ]"
    >
      {{ episode.timeRange }}
    </p>
    <p 
      :class="[
        'text-xs leading-relaxed',
        isActive ? 'text-white/80' : 'text-gray-500'
      ]"
    >
      {{ episode.description }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  episode: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const episodeNumber = computed(() => {
  if (props.episode.id === 'intro') return 'I'
  return props.episode.id.replace('episode', '')
})
</script>

<style scoped>
.episode-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.episode-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
}

.episode-card:active {
  transform: translateY(-2px);
}
</style>

