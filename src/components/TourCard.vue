<script lang="ts" setup>
import type { Tour } from '@/types/tour'
import { formatPrice } from '@/utils/formatPrice'
import { ref } from 'vue'

const props = defineProps<{
  tour: Tour
}>()

const customers_review_rating = ref<string>(
  props.tour.customers_review_rating.toString().replace('.', ','),
)

const price_per = ref<string>(props.tour.order_options[0].order_lines[0].price_per)

const formattedPrice = formatPrice(props.tour.netto_price)
</script>

<template>
  <div class="cardn">
    <img class="pic" :src="tour.cover_photo?.big" :alt="tour.title" />
    <div class="rating">
      <img src="@/assets/icons/Star.svg" width="15px" />
      <div class="ratingNumber">{{ customers_review_rating }}</div>
      <div class="secondaryText">({{ tour.reviews }})</div>
    </div>
    <h2>{{ tour.title }}</h2>

    <div class="costBox">
      <div class="cost">от {{ formattedPrice }}</div>
      <div class="secondaryText">{{ price_per }}</div>
    </div>
  </div>
</template>

<style scoped>
*img {
  border-radius: 5px;
}
.costBox {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.cost {
  font-size: 22px;
  font-weight: bold;
}

.ratingNumber {
  font-size: 14px;
}
.h2 {
  font-size: 16px;
  font-weight: bold;
  color: black;
}
.rating {
  display: flex;
  flex-direction: row;
  gap: 3px;
  align-items: center;
}
.secondaryText {
  color: var(--text-gray);
}

.cardn {
  display: flex;
  flex-direction: column;
  gap: 7px;
  border: none;
  padding: 10px;
  margin: 10px 0;
  font-size: 12px;
}
</style>
