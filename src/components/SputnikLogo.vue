<script lang="ts" setup>
import Logo from '@/assets/icons/logo.svg'
import Sputnik from '@/assets/icons/sputnik.svg'
</script>
<template>
  <div class="logo">
    <img :src="Logo" width="30px" />
    <img :src="Sputnik" width="120.9px" />
  </div>
</template>

<style>
.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6.77px;
}
</style>
