<template>
  <div class="flex flex-col gap-4 md:gap-6 p-4 bg-white shadow rounded-lg w-full">

    <!-- TOP ROW (Hamburger + Title + Icons) -->
    <div class="flex justify-between items-center w-full flex-wrap gap-4">

      <!-- LEFT: Hamburger + Title + Decorative Grid -->
      <div class="flex items-center gap-3 min-w-0">

        <!-- Hamburger (xs & sm only) -->
        <button
          @click="$emit('toggle-sidebar')"
          class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition md:hidden"
        >
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Decorative Grid -->
        <div class="grid grid-cols-2 grid-rows-2 gap-1">
          <span v-for="n in 4" :key="n" class="w-3 h-3 bg-gray-700 rounded-sm"></span>
        </div>

        <!-- Page Title -->
        <h1 class="text-lg md:text-xl font-bold text-gray-800 truncate min-w-0 max-w-[150px] sm:max-w-[200px] lg:max-w-[250px]">
          {{ title }}
        </h1>
      </div>

      <!-- RIGHT: Add Btn + Bell + Profile -->
      <div class="flex items-center gap-3 min-w-0">

        <!-- Add Product Button (HIDDEN on xs/sm) -->
        <button
          @click="handleAdd"
          class="hidden md:flex bg-[#000080] text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition font-semibold shadow items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Add Product
        </button>

        <!-- Notifications Icon -->
        <button class="relative">
          <svg class="w-6 h-6 text-gray-700 hover:text-gray-900 transition" fill="none"
               stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>

          <span
            v-if="notifications > 0"
            class="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"
          ></span>
        </button>

        <!-- Profile Image -->
        <img
          :src="profileImage"
          alt="Profile"
          class="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
        />
      </div>
    </div>

    <!-- SEARCH (FULL WIDTH FOR ALL SMALL SCREENS) -->
    <div class="w-full">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        @input="emitSearch"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#000080] text-gray-700 placeholder-gray-400 shadow-sm"
      />
    </div>

    <!-- MOBILE ADD BUTTON (xs/sm ONLY) -->
    <button
      @click="handleAdd"
      class="md:hidden bg-[#000080] text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition font-semibold shadow w-full"
    >
      + Add Product
    </button>

  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  title?: string;
  profileImage?: string;
  notifications?: number;
  searchQuery?: string;
}>();

const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'search', query: string): void;
  (e: 'toggle-sidebar'): void;
}>();

const title = props.title || 'Dashboard';
const profileImage = props.profileImage || 'https://i.pravatar.cc/150?img=12';
const notifications = props.notifications || 0;

const searchQuery = ref(props.searchQuery || '');

const handleAdd = () => emit('add');
const emitSearch = () => emit('search', searchQuery.value);
</script>

<style scoped>
h1 {
  min-width: 0;
}
</style>
