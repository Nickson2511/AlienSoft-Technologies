<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

// Heroicons
import { 
  CogIcon, Squares2X2Icon, CubeIcon, ShoppingCartIcon, UsersIcon,
  ArrowRightOnRectangleIcon, XMarkIcon
} from '@heroicons/vue/24/outline';

const props = defineProps<{
  isSidebarOpen?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:isSidebarOpen', value: boolean): void
}>();

const router = useRouter();
const auth = useAuthStore();

const handleLogout = () => {
  auth.logout();
  router.push("/login");
};

// Method to close sidebar
const closeSidebar = () => {
  emit('update:isSidebarOpen', false);
};
</script>

<template>
  <div class="flex h-screen bg-gray-50">

    <!-- Mobile overlay -->
    <transition name="fade">
      <div
        v-if="props.isSidebarOpen"
        class="fixed inset-0 bg-black/30 z-40 md:hidden"
        @click="closeSidebar"
      ></div>
    </transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'flex flex-col bg-white shadow-md px-4 py-6 transition-transform z-50',
        'md:relative md:w-64 md:translate-x-0',
        'fixed md:static top-0 left-0 h-full w-full md:w-64',
        props.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Close button for mobile only -->
      <div class="flex justify-end mb-4 md:hidden">
        <button @click="closeSidebar" class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition">
          <XMarkIcon class="w-6 h-6 text-gray-800"/>
        </button>
      </div>

      <!-- Logo -->
      <div class="flex items-center gap-2 mb-8">
        <div class="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h18v18H3V3z"/>
          </svg>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-800">E-Commerce</span>
          <span class="text-sm text-gray-500">Admin Panel</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/"
              class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
              @click="closeSidebar"
            >
              <Squares2X2Icon class="w-5 h-5 text-gray-600" />
              <span class="text-gray-800 font-medium">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/products"
              class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
              @click="closeSidebar"
            >
              <CubeIcon class="w-5 h-5 text-[#000080]" />
              <span class="text-gray-800 font-medium">Products</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/orders"
              class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
              @click="closeSidebar"
            >
              <ShoppingCartIcon class="w-5 h-5 text-gray-600" />
              <span class="text-gray-800 font-medium">Orders</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/customers"
              class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
              @click="closeSidebar"
            >
              <UsersIcon class="w-5 h-5 text-gray-600" />
              <span class="text-gray-800 font-medium">Customers</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Bottom actions -->
      <div class="mt-auto space-y-2">
        <router-link
          to="/settings"
          class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
          @click="closeSidebar"
        >
          <CogIcon class="w-5 h-5 text-gray-600" />
          <span class="text-gray-800 font-medium">Settings</span>
        </router-link>

        <button
          @click="handleLogout"
          class="flex items-center justify-between w-full gap-2 p-2 rounded hover:bg-gray-100 transition text-[#000080] font-semibold"
        >
          <div class="flex items-center gap-2">
            <ArrowRightOnRectangleIcon class="w-5 h-5" />
            <span>Logout</span>
          </div>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main 
      :class="[
        'flex-1 overflow-auto relative transition-all',
        'md:ml-64',
        props.isSidebarOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'
      ]"
    >
      <slot />
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
