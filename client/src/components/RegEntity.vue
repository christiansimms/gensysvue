<script setup lang="ts">


</script>

<template>
  <h1>Entities</h1>
  <p>
    Actions:
    <router-link to="/reg/entity/add">Add Entity</router-link>
  </p>

  <div v-if="data">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th>Id</th>
        <th>Parent Id</th>
        <th>Name</th>
        <th>Type</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in data">
        <td><router-link :to="`/reg/entity/${row.id}`">{{row.id}}</router-link></td>
        <td><router-link to="/reg/entity/{{row.parent_id}}">{{row.parent_id}}</router-link></td>
        <td>{{row.name}}</td>
        <td>{{row.type}}</td>
        <td>
          <button type="button" class="btn btn-outline-primary" @click="deleteEntity(row)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {defineComponent, onMounted, ref} from 'vue';

export default defineComponent({
  setup() {
    const data = ref(null);
    async function fetchData() {
      const results = await axios.get('/api/entity')
      console.log('mounted', results);
      data.value = results.data;
    }

    onMounted(() => {
      fetchData();
    });

    const deleteEntity = async function(row) {
      if (confirm('Are you sure?')) {
        // const objType = row._type;
        const objId = row.id;
        if (! objId) {
          alert('Missing row _type or id');
        }
        await axios.delete('/api/entity/' + objId, row);
        alert('Deleted!');
        // this.flashService.tellSuccess('Entity deleted');
      }
    }

    return {
      data,
      deleteEntity,
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
