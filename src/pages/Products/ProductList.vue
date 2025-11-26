<template>
  
    <AppLayout v-model:isSidebarOpen ="isSidebarOpen">
      <div class="p-6 sm:p-8 w-full">

        <!-- Top bar: DashboardHeader -->
        <DashboardHeader
          :title="'Product Management'"
          :searchQuery="search"
          @search="search = $event"
          @add="goToAddProduct"
          @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
        />

        <!-- Loading spinner -->
        <div v-if="store.isLoading" class="flex flex-col items-center py-16">
          <svg
            class="animate-spin h-10 w-10 text-[#000080]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <p class="mt-4 text-[#000080] font-medium text-lg md:text-xl">Loading products...</p>
        </div>

        <!-- Error state -->
        <div v-if="store.error" class="text-red-600 text-center py-6 text-lg md:text-xl font-medium">
          {{ store.error }}
        </div>

        <!-- Products table -->
        <div v-if="!store.isLoading && !store.error" class="overflow-x-auto mt-6">
          <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-lg table-auto">
            <thead class="bg-gray-100">
              <tr>
                <th class="p-3 text-left text-gray-700 text-sm md:text-base">Image</th>
                <th class="p-3 text-left text-gray-700 text-sm md:text-base">Title</th>
                <th class="p-3 text-left text-gray-700 text-sm md:text-base">Category</th>
                <th class="p-3 text-left text-gray-700 text-sm md:text-base">Price</th>
                <th class="p-3 text-left text-gray-700 text-sm md:text-base">Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in filteredProducts"
                :key="product.id"
                @click="viewProduct(product.id)"
                class="cursor-pointer hover:bg-gray-50 transition-all"
              >
                <td class="p-2 md:p-4">
                  <img
                    :src="product.thumbnail"
                    alt="thumbnail"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover"
                  />
                </td>

                <td class="p-2 md:p-4">
                  <div class="font-semibold text-gray-800 text-sm md:text-lg">{{ product.title }}</div>
                  <div class="text-gray-500 text-xs md:text-sm mt-1">
                    {{ product.description.slice(0, 80) }}...
                  </div>
                </td>

                <td class="p-2 md:p-4 capitalize text-gray-700 text-sm md:text-base">{{ product.category }}</td>
                <td class="p-2 md:p-4 font-medium text-gray-800 text-sm md:text-base">${{ product.price }}</td>
                <td class="p-2 md:p-4 text-gray-700 text-sm md:text-base">{{ product.stock }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Empty state -->
          <div
            v-if="filteredProducts.length === 0"
            class="text-center py-16 text-gray-500 text-base md:text-lg font-medium"
          >
            No products found.
          </div>
        </div>
      </div>
    </AppLayout>
  
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products.store';
import DashboardHeader from '@/components/common/DashboardHeader.vue';
//import SidebarLayout from '@/components/common/SidebarLayout.vue';
import AppLayout from '@/layouts/AppLayout.vue';


const store = useProductsStore();
const router = useRouter();

// Search input state
const search = ref('');

// Sidebar toggle state (for small devices)
const isSidebarOpen = ref(false);

// Fetch products on mount
onMounted(() => {
  store.fetchProducts();
});

// Computed filtered products based on search input
const filteredProducts = computed(() => {
  return store.products.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Navigate to view product page
const viewProduct = (id: number) => {
  router.push(`/products/${id}`);
};

// Navigate to add product page
const goToAddProduct = () => {
  router.push('/products/new');
};
</script>

<style scoped>
/* Smooth hover transition for table rows */
tr {
  transition: background-color 0.25s ease-in-out, transform 0.15s;
}
tr:hover {
  transform: scale(1.002);
}
</style>
