<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <!-- navigation goes here -->
  <router-view></router-view>
</template>

<style scoped>
</style>
