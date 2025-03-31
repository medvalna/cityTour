<script lang="ts" setup>
import type { Tour } from '@/types/tour'

defineProps<{
  tour: Tour
}>()
</script>

<template>
  <div class="cardn">
    <img :src="tour.cover_photo?.big" :alt="tour.title" />
    <h3>{{ tour.title }}</h3>
  </div>
</template>

<style>
.cardn {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid gray;
  padding: 10px;
  margin: 10px 0;
  font-size: 12px;
}
</style>
