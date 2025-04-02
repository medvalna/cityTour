<script lang="ts" setup>
import { ref } from 'vue'
import XIcon from '@/assets/icons/XIcon.svg'
const tour = ref('')

const emit = defineEmits<{
  (e: 'update:tour', value: string): void
  (e: 'clear'): void
}>()

const handleChangeTourName = () => {
  emit('update:tour', tour.value)
}

const clear = () => {
  tour.value = ''
  emit('update:tour', tour.value)
}

defineExpose({
  clear,
})
</script>

<template>
  <div class="inputContainer">
    <input
      @input="handleChangeTourName"
      v-model="tour"
      class="input"
      placeholder="Введите название экскурсии"
    />
    <XIcon v-if="tour" class="clearIcon" @click="clear" />
  </div>
</template>

<style scoped>
.inputContainer {
  position: relative;
  display: inline-block;
}

.input {
  cursor: pointer;
  width: 300px;
  height: 50px;
  border: 1px solid var(--custom-gray);
  color: var(--text-gray);
  border-radius: 1px;
  outline: none;
  padding: 14.5px 15px;
  padding-right: 35px;
}
.clearIcon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  fill: var(--custom-gray);
}

.clear-icon:hover {
  transition: transform 0.3 ease;
  fill: black;
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
