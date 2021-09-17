<script setup lang="ts">
</script>

<template>
  <h1>Import Data</h1>

  <span v-for="choice in getProcs()">
    <button class="btn btn-outline-primary" @click="applyProc(choice)">{{choice}}</button>
  </span>

  <button class="btn btn-outline-primary" @click="readSpreadsheet()">Read Spreadsheet from Clipboard</button>
  &nbsp;
  <button class="btn btn-outline-primary" @click="readSample1()">Read Sample Data 1</button>
  &nbsp;
  <button class="btn btn-outline-primary" @click="readSample2()">Read Sample Data 2</button>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {getProcs, runProcs} from '../composables/TextprocService';

export default defineComponent({
  setup() {
    const data = ref(null);

    const applyProc = function(procName: string) {
      const outputs = runProcs('xxx', [procName]);
    }

    const readSpreadsheet = function() {

    }

    return {
      data,
      applyProc,
      readSpreadsheet,
      getProcs,
    };
  },
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
