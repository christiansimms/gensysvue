<script setup lang="ts">
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/reg/entity">Entities</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">Entity</li>
    </ol>
  </nav>

  <h1>View Entity</h1>

  <div v-if="row">
    <p>
      Actions:
      <router-link :to="`/reg/entity/${row.id}/add`">Add Child</router-link>
      &nbsp;&nbsp;
      <!-- a routerLink="/reg/entity/{{row.id}}/stats">View Stats</a>
      <span *ngIf="row?.fields?._type === 'jsonTable'">
      &nbsp;&nbsp;
      <a routerLink="/reg/entity/{{row.id}}/editTable">Edit Table</a>
      &nbsp;&nbsp;
      <a routerLink="/reg/entity/{{row.id}}/findData">Find Data</a>
      </span>
      <span *ngIf="row?.fields?._type !== 'jsonTable'">
      &nbsp;&nbsp;
      <a routerLink="/reg/entity/{{row.id}}/editTable" [queryParams]="{forceEditAsTable: 'T'}">Force Edit As Table</a>
    </span -->
      &nbsp;&nbsp;
      <router-link :to="`/reg/work#entity-${row.id}`">Work on this</router-link>
    </p>

    <div v-if="row.parent">
      Parent: <a routerLink="/reg/entity/{{row.parent.id}}">{{ row.parent.name }} {{ row.parent.type }}</a>
    </div>

    <div><strong>Id:</strong> {{ row.id }}</div>
    <div><strong>Name:</strong> {{ row.name }}</div>
    <div><strong>Type:</strong> {{ row.type }}</div>
    <br/>
    <div>
      <!-- app-display-data [data]="row.fields"></app-display-data -->
    </div>
    <br/>

    <!-- div v-if="row?.children.length > 0">
      <h2>Children</h2>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Id</th>
          <th>Parent Id</th>
          <th>Name</th>
          <th>Type</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="child in row.children">
          <td><a routerLink="/reg/entity/{{child.id}}">{{ child.id }}</a></td>
          <td>{{ child.parent_id }}</td>
          <td>{{ child.name }}</td>
          <td>{{ child.type }}</td>
        </tr>
        </tbody>
      </table>
    </div -->
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {defineComponent, onMounted, PropType, ref} from 'vue';
import {useRoute} from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const row = ref(null);
    async function fetchData() {
      const results = await axios.get(`/api/entity/${route.params.id}`)
      console.log('mounted', results);
      row.value = results.data;
    }

    onMounted(() => {
      fetchData();
    });

    return {
      row,
    };
  },
})
</script>

<style scoped>
</style>
