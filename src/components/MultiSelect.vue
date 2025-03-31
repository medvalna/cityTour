<script lang="ts" setup>
import { ref } from 'vue'

const multiSelected = ref(['A'])
</script>
<template>
  <div class="multiSelect">
    <h2>Multi Select</h2>
    <select v-model="multiSelected" multiple style="width: 100px">
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <p>Selected: {{ multiSelected }}</p>
  </div>
</template>

<style>
.multiSelect {
  display: flex;
  flex-direction: column;
}
</style>
