<script setup lang="ts">
import axios from 'axios';

const obj = {
  name: '',
  type: '',
};

const addEntity = async () => {
  console.log('hi', obj.name);
  const val = await axios.post('/api/entity', obj);
  console.log('GOT RESULT', val);
  // this.flashService.tellSuccess('Entity saved', '/reg/entity');
}
</script>

<template>
  <h1>Generic Add Entity</h1>

  <form>
    <div class="form-group row">
      <label for="inputName" class="col-sm-2 col-form-label text-right">Name</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" id="inputName" v-model="obj.name" name="name">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputType" class="col-sm-2 col-form-label text-right">Type</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" id="inputType" v-model="obj.type" name="type">
      </div>
    </div>

    <div class="form-group">
      <label class="col-md-4 control-label" for="submit"></label>
      <div class="col-md-8">
        <button type="button" id="submit" name="submit" class="btn btn-primary" @click="addEntity()">Add</button>
      </div>
    </div>

  </form>
</template>

<script lang="ts">
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
