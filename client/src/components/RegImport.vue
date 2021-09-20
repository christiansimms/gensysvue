<template>
  <h1>Import Data</h1>

  <span v-for="choice in getProcs()">
    <button class="btn btn-outline-primary" @click="applyProc(choice)">{{choice}}</button>
  </span>

  <div class="accordion">
    <div v-for="(output, index) in outputs" class="accordion-item">

        <h2 class="accordion-header" :id="'panelsStayOpen-heading' + index">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapse' + index" aria-expanded="true" :aria-controls="'panelsStayOpen-collapse' + index">
            Step #{{index}}
          </button>
        </h2>
        <div :id="'panelsStayOpen-collapse' + index" class="accordion-collapse collapse show" :aria-labelledby="'panelsStayOpen-heading' + index">
          <div class="accordion-body">
            <DisplayData :data="output"/>
          </div>
        </div>

    </div>
  </div>

  <!-- button class="btn btn-outline-primary" @click="readSpreadsheet()">Read Spreadsheet from Clipboard</button>
  &nbsp;
  <button class="btn btn-outline-primary" @click="readSample1()">Read Sample Data 1</button>
  &nbsp;
  <button class="btn btn-outline-primary" @click="readSample2()">Read Sample Data 2</button -->
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {getProcs, runProcs} from '../composables/TextprocService';
import DisplayData from './DisplayData.vue';

export default defineComponent({
  components: {DisplayData},
  setup() {
    const outputs: any[] = ref([]);

    const applyProc = async function(procName: string) {
      outputs.value = await runProcs('xxx', [procName]);
      console.log('outputs:', outputs.value);
    }

    const readSpreadsheet = function() {

    }

    return {
      outputs,
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
