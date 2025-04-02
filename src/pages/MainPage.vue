<script lang="ts" setup>
import './MainPage.css'
import { onMounted, ref, watch } from 'vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select/Select.vue'
import TourCard from '@/components/TourCard.vue'
import SputnikLogo from '@/components/SputnikLogo.vue'
import type { Tour } from '@/types/tour'
import { fetchTours } from '@/api/fetchTours'
import { fetchCities } from '@/api/fetchCities'
import type { City } from '@/types/city'

const tours = ref<Tour[]>([])
const cities = ref<City[]>([])
const filteredTours = ref<Tour[]>([])
const selectedCity = ref<City | null>(null)
const tourName = ref<string>('')

const inputRef = ref<InstanceType<typeof Input> | null>(null)
const multiSelectRef = ref<InstanceType<typeof Select> | null>(null)

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
  const searchQuery = tourName.value.toLowerCase()
  const regex = new RegExp(searchQuery.split('').join('.*'), 'i')

  filteredTours.value = tours.value.filter((tour) => regex.test(tour.title))
}

watch(selectedCity, () => {
  filterToursByCity()
})

watch(tourName, () => {
  filterToursByName()
})

const handleCityUpdate = (city: City | null) => {
  selectedCity.value = city
}
const handleTourNameUpdate = (tour: string) => {
  tourName.value = tour
}

const deleteFilters = () => {
  inputRef.value?.clear()
  multiSelectRef.value?.clear()
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
        <Input ref="inputRef" @update:tour="handleTourNameUpdate" />
        <Select
          ref="multiSelectRef"
          v-bind:cities="cities"
          v-bind="selectedCity"
          @update:city="handleCityUpdate"
        />
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
