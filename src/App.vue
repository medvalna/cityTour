<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import InputUI from '@/components/InputUI.vue'
import MultiSelect from '@/components/MultiSelect.vue'
import TourCard from '@/components/TourCard.vue'
import type { Tour } from './types/tour'
import { fetchTours } from '@/api/fetchTours'

const tours = ref<Tour[]>([])

onMounted(async () => {
  tours.value = await fetchTours()
})
</script>
<template>
  <div>
    <div class="title">
      <div class="logo">
        <h2>SPUTNIK</h2>
        <img src="/public/logo.svg" width="30px" />
      </div>
      <h1>Экскурсии по всему миру</h1>
      <div class="form">
        <InputUI />
        <MultiSelect />
      </div>
    </div>
    <div class="cards">
      <div v-for="(tour, index) in tours" :key="index">
        <TourCard v-bind:tour="tour" />
      </div>
    </div>
  </div>
</template>

<style>
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.logo {
  display: flex;
  flex-direction: row;
}
.cards {
  overflow-x: hidden;
  display: grid;
  gap: 20px;
  justify-content: center;
  grid-template-columns: repeat(3, minmax(200px, 320px));
}
@media (max-width: 900px) {
  .cards {
    grid-template-columns: repeat(2, minmax(200px, 320px));
  }
}
@media (max-width: 600px) {
  .cards {
    grid-template-columns: minmax(200px, 320px);
  }
}
</style>
