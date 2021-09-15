<script setup lang="ts">
import {ref, Ref} from 'vue';
import HelloWorld from './components/HelloWorld.vue'
const someObject: Ref<{ banana: string }> = ref({ banana: 'they are good' });
</script>

<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
