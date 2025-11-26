<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <RouterView />
  </div>
</template>

<style>
/* Remove centering entirely */
#app {
  min-height: 100vh;
}
</style>
