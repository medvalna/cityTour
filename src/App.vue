<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import InputUI from '@/components/InputUI.vue'
import MultiSelect from '@/components/MultiSelect.vue'
import TourCard from '@/components/TourCard.vue'
import SputnikLogo from '@/components/SputnikLogo.vue'
import type { Tour } from './types/tour'
import { fetchTours } from '@/api/fetchTours'
import { fetchCities } from './api/fetchCities'
import type { City } from './types/city'

const tours = ref<Tour[]>([])
const cities = ref<City[]>([])
onMounted(async () => {
  tours.value = await fetchTours()
  cities.value = await fetchCities()
})
</script>
<template>
  <div class="container">
    <div class="title">
      <SputnikLogo />
      <h1>Экскурсии по всему миру</h1>
      <div class="form">
        <InputUI />
        <MultiSelect v-bind:cities="cities" />
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
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
.form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
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
