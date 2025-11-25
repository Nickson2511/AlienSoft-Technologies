<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    
    <!-- RouterView will render the current route, e.g., your login page -->
    <RouterView />
  </div>
</template>

<style scoped>
/* Optional global styles if needed */
#app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>






