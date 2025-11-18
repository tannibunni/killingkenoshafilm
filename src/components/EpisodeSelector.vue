<template>
  <div class="p-6 border-t border-gray-800">
    <h4 class="text-lg font-semibold text-gray-300 mb-6">Select Episode</h4>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <EpisodeCard
        v-for="episode in episodes"
        :key="episode.id"
        :episode="episode"
        :is-active="currentEpisode === episode.id"
        @click="selectEpisode(episode)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePlayerStore } from '../stores/player'
import EpisodeCard from './EpisodeCard.vue'

const playerStore = usePlayerStore()

const episodes = computed(() => playerStore.episodes)
const currentEpisode = computed(() => playerStore.currentEpisode)

const selectEpisode = (episode) => {
  playerStore.selectEpisode(episode.id)
}
</script>

