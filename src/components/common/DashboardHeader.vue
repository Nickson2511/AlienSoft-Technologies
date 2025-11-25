<template>
    <div
      class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 p-4 bg-white shadow rounded-lg w-full relative"
    >
      <!-- Left section: Hamburger + Title -->
      <div class="flex items-center gap-3 w-full md:w-auto">
  
        <!-- Hamburger menu for xs/sm -->
        <button
          @click="$emit('toggle-sidebar')"
          class="md:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition mr-2"
        >
          <svg
            class="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
  
        <!-- Optional decorative grid icon -->
        <div class="grid grid-cols-2 grid-rows-2 gap-1">
          <span v-for="n in 4" :key="n" class="w-3 h-3 bg-gray-700 rounded-sm"></span>
        </div>
  
        <!-- Page title -->
        <h1 class="text-lg md:text-xl font-bold text-gray-800 ml-2 truncate">
          {{ title }}
        </h1>
      </div>
  
      <!-- Search input -->
      <div class="flex-1 md:flex-none w-full md:w-1/3 mt-2 md:mt-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          @input="emitSearch"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] text-gray-700 placeholder-gray-400 shadow-sm"
        />
      </div>
  
      <!-- Right section: Buttons and profile -->
      <div class="flex items-center gap-4 flex-wrap md:flex-nowrap mt-2 md:mt-0">
  
        <!-- Add button with Plus icon -->
        <button
          @click="handleAdd"
          class="bg-[#000080] text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition font-semibold shadow flex items-center gap-2"
        >
          <!-- Plus icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Add Product
        </button>
  
        <!-- Notifications -->
        <button class="relative">
          <svg
            class="w-6 h-6 text-gray-700 hover:text-gray-900 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
          <span
            v-if="notifications > 0"
            class="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"
          ></span>
        </button>
  
        <!-- Profile image -->
        <img
          :src="profileImage"
          alt="Profile"
          class="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  // Props
  const props = defineProps<{
    title?: string;
    profileImage?: string;
    notifications?: number;
    searchQuery?: string;
  }>();
  
  // Emits
  const emit = defineEmits<{
    (e: 'add'): void;
    (e: 'search', query: string): void;
    (e: 'toggle-sidebar'): void;
  }>();
  
  const title = props.title || 'Dashboard';
  const profileImage = props.profileImage || 'https://i.pravatar.cc/150?img=12';
  const notifications = props.notifications || 0;
  
  const searchQuery = ref(props.searchQuery || '');
  
  // Emit add product
  const handleAdd = () => emit('add');
  
  // Emit search input
  const emitSearch = () => emit('search', searchQuery.value);
  </script>
  
  <style scoped>
  /* Tailwind already handles hover/shadow effects, but we can add minor tweaks */
  h1 {
    max-width: 200px;
  }
  </style>
  