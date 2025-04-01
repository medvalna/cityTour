<script lang="ts" setup>
import { ref } from 'vue'

const tour = ref('')

const emit = defineEmits<{
  (e: 'update:tour', value: string): void
}>()

const handleChangeTourName = () => {
  emit('update:tour', tour.value)
}
</script>

<template>
  <input
    @input="handleChangeTourName"
    v-model="tour"
    class="input"
    placeholder="Введите название экскурсии"
  />
</template>

<style>
.input {
  cursor: pointer;
  width: 300px;
  height: 50px;
  border: 1px solid var(--custom-gray);
  color: var(--text-gray);
  border-radius: 1px;
  outline: none;
  padding: 14.5px 15px;
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
