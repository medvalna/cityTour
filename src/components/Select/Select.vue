<script lang="ts" setup>
import './Select.css'
import { onMounted, onUnmounted, ref } from 'vue'
import type { City } from '@/types/city'
import ArrowDown from '@/assets/icons/ArrowDown.svg'
import Search from '@/assets/icons/Search.svg'
import XIcon from '@/assets/icons/XIcon.svg'
const props = defineProps<{
  cities: City[]
}>()

const emit = defineEmits<{
  (e: 'update:city', value: City | null): void
  (e: 'clear'): void
}>()

const selectedCity = ref<City | null>(null)
const isOpen = ref(false)
const searchText = ref('')
const filteredCities = ref<City[]>(props.cities)
const selectWrapper = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  searchText.value = ''
  filteredCities.value = props.cities
}

const selectCity = (city: City | null) => {
  selectedCity.value = city
  isOpen.value = false
  emit('update:city', city)
}

const clear = () => {
  selectedCity.value = null
  searchText.value = ''
  filteredCities.value = props.cities
  isOpen.value = false
  emit('update:city', null)
}

const filterCities = () => {
  if (!searchText.value) {
    filteredCities.value = props.cities
  } else {
    filteredCities.value = props.cities.filter((city) =>
      city.name.toLowerCase().includes(searchText.value.toLowerCase()),
    )
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (selectWrapper.value && !selectWrapper.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

defineExpose({
  clear,
})
</script>
<template>
  <div ref="selectWrapper" class="selectWrapper">
    <div class="selector" @click="toggleDropdown">
      <div class="placeholder">
        <p :class="{ selectedText: selectedCity }">
          {{ selectedCity ? selectedCity.name : 'Выбрать город' }}
        </p>
        <img v-if="selectedCity" :src="XIcon" @click="clear" />
        <div v-else class="buttons">
          <ArrowDown :class="{ 'rotate-180': isOpen }" />
        </div>
      </div>
    </div>

    <ul v-if="isOpen" class="list">
      <div class="search">
        <div class="inputBox">
          <input @input="filterCities" v-model="searchText" placeholder="Введите название города" />
          <Search width="16" fill="var(--custom-gray)" class="searchIcon" />
        </div>
      </div>
      <li
        v-for="(city, index) in filteredCities"
        :key="index"
        class="options"
        @click="selectCity(city)"
      >
        <p>{{ city.name }}</p>
      </li>
      <li v-if="filteredCities.length === 0" class="noResults">
        <p>Городов не найдено</p>
      </li>
    </ul>
  </div>
</template>
