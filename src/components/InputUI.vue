<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('Edit me')
</script>

<template>
  <div class="input">
    <p>{{ text }}</p>
    <input v-model="text" />
  </div>
</template>

<style>
.input {
  display: flex;
  flex-direction: column;
}
</style>
