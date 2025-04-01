<script lang="ts" setup>
import { ref } from 'vue'
import type { City } from '@/types/city'

const props = defineProps<{
  cities: City[]
}>()
const selectedCity = ref<City | null>(null)
const isOpen = ref(false)
const searchText = ref('')
const filteredCities = ref<City[]>(props.cities)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectCity = (city: City) => {
  selectedCity.value = city
  isOpen.value = false
}

const filterCities = () => {
  console.info('filtering')
  if (!searchText.value) {
    filteredCities.value = props.cities
  } else {
    filteredCities.value = props.cities.filter((city) =>
      city.name.toLowerCase().includes(searchText.value.toLowerCase()),
    )
  }
}
</script>
<template>
  <div class="selectWrapper">
    <div class="selector" @click="toggleDropdown">
      <div class="placeholder">
        <p :class="{ selectedText: selectedCity }">
          {{ selectedCity ? selectedCity.name : 'Выбрать город' }}
        </p>
        <img
          src="@/assets/icons/ArrowDown.svg"
          :class="{ 'rotate-180': isOpen }"
          alt="dropdown arrow"
        />
      </div>
    </div>

    <ul v-if="isOpen" class="list">
      <div class="search">
        <div class="inputBox">
          <input @input="filterCities" v-model="searchText" placeholder="Введите название города" />
          <img src="@/assets/icons/Search.svg" width="16" />
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
    </ul>
  </div>
</template>

<style>
.selectWrapper {
  width: 300px;
  position: relative;
  border: 1px solid var(--custom-gray);
}
.selectWrapper:hover {
  border-color: var(--custom-yellow);
  outline: none;
}
.selector {
  width: 300px;
  height: 50px;
}
.selectedText {
  color: black;
}
.placeholder {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: var(--text-gray);
  border-radius: 1px;
  padding: 14.5px 15px;
}
.placeholder img {
  transition: transform 0.3s ease;
}
.rotate-180 {
  transform: rotate(180deg);
}

.list {
  width: 300px;
  background-color: white;
  height: 239px;
  border-radius: 1px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
  z-index: 1;
  border: 1px solid var(--custom-gray);
}

.options {
  border: 1px solid var(--custom-gray);
  border-radius: 1px;
  position: relative;

  width: 100%;
  padding: 12.5px 15px;
  cursor: pointer;
  list-style: none;
  color: var(--text-gray);
}
.options:hover {
  background-color: var(--custom-yellow);
  color: black;
}

.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
}
.inputBox {
  margin: 5px;
  width: 90%;
  padding: 10px;
  outline: none;
  border: 1px solid var(--custom-gray);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
}
.search input {
  outline: none;
  border: none;
  width: 100%;
}
.inputBox:hover {
  border: 1px solid var(--custom-yellow);
}
.inputBox:focus {
  border: 1px solid var(--custom-yellow);
}
</style>
