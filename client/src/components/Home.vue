<script setup lang="ts">
</script>

<template>
  <h1>Home</h1>

  <p><router-link to="/reg/entity">View Entities</router-link></p>
  <p><router-link to="/reg/import">Import Spreadsheet</router-link></p>
</template>

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
