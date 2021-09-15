<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>RegEntity</h1>
</template>

<script lang="ts">
import axios from 'axios';
import {defineComponent} from 'vue';

export default defineComponent({
  async mounted() {
    const results = await axios.get('/api/entity')
    console.log('mounted', results);
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
