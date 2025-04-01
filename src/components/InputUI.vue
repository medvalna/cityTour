<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <input v-model="text" class="input" placeholder="Введите название экскурсии" />
</template>

<style>
.input {
  width: 300px;
  height: 50px;
  border: 1px solid var(--custom-gray);
  color: var(--text-gray);
  border-radius: 1px;
  outline: none;
}
.input:hover {
  border-color: var(--custom-yellow);
  outline: none;
}

.input:focus {
  border-color: var(--custom-yellow);
  outline: none;
}
</style>
