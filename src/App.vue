<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
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
const filteredTours = ref<Tour[]>([])
const selectedCity = ref<City | null>(null)
const tourName = ref<string>('')

const filterToursByCity = () => {
  if (!selectedCity.value) {
    filteredTours.value = tours.value
    return
  }

  filteredTours.value = tours.value.filter((tour) => tour.city_id === selectedCity.value?.id)
}
const filterToursByName = () => {
  if (!tourName.value) {
    filteredTours.value = tours.value
    return
  }

  filteredTours.value = tours.value.filter((tour) =>
    tour.title.toLowerCase().includes(tourName.value.toLowerCase()),
  )
}

watch(selectedCity, () => {
  filterToursByCity()
})

watch(tourName, () => {
  filterToursByName()
})

const handleCityUpdate = (city: City | null) => {
  selectedCity.value = city
  console.log('Selected city:', selectedCity.value)
}
const handleTourNameUpdate = (tour: string) => {
  tourName.value = tour
  console.log('Inputted tourname:', tourName.value)
}

const deleteFilters = () => {
  handleCityUpdate(null)
  handleTourNameUpdate('')
}

onMounted(async () => {
  const [toursData, citiesData] = await Promise.all([fetchTours(), fetchCities()])

  tours.value = toursData
  cities.value = citiesData
  filteredTours.value = toursData
})
</script>
<template>
  <div class="container">
    <div class="title">
      <SputnikLogo />
      <h1>Экскурсии по всему миру</h1>
      <div class="form">
        <InputUI @update:tour="handleTourNameUpdate" />
        <MultiSelect v-bind:cities="cities" v-bind="selectedCity" @update:city="handleCityUpdate" />
      </div>
    </div>
    <div v-if="filteredTours" class="cards">
      <div v-for="(tour, index) in filteredTours" :key="index">
        <TourCard v-bind:tour="tour" />
      </div>
    </div>
    <div v-if="filteredTours.length === 0" class="noTours">
      <p>Поиск не дал результатов</p>
      <button @click="deleteFilters">Сбросить фильтры</button>
    </div>
  </div>
</template>

<style>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
.form {
  max-width: 630px;
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
@media (max-width: 640px) {
  .form {
    flex-direction: column;
    gap: 20px;
  }
}

.noTours {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.noTours p {
  font-size: 24px;
}

.noTours button {
  cursor: pointer;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0 34px;
  height: 40px;
  border-radius: 3px;
}
.noTours button:hover {
  filter: brightness(0.9);
  transition: filter 0.2s ease;
}
</style>
