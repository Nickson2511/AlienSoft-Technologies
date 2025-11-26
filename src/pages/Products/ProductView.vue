<template>
  <AppLayout v-model:isSidebarOpen = "isSidebarOpen">
    <!-- DashboardHeader -->
    <DashboardHeader
      :title="'Product Details'"
      :searchQuery="search"
      @search="search = $event"
      @add="goToAddProduct"
    />

    <div class="p-6 max-w-6xl mx-auto space-y-6">
      <!-- Loading Spinner -->
      <div v-if="store.isLoading" class="text-center py-10">
        <svg
          class="animate-spin h-12 w-12 text-[#000080] mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"/>
          <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" class="opacity-75"/>
        </svg>
        <p class="mt-2 text-[#000080] font-medium">Loading product...</p>
      </div>

      <!-- Error state -->
      <div v-if="store.error" class="text-red-500 text-center py-4">
        {{ store.error }}
      </div>

      <!-- Product Details -->
      <div
        v-if="product && !store.isLoading && !store.error"
        class="bg-white rounded-lg shadow-lg p-6 space-y-6"
      >
        <!-- Product name on top left -->
        <h2 class="text-xl md:text-2xl font-semibold text-gray-700">
          {{ product.title }}
        </h2>
        <p class="text-gray-500 mb-4">{{ product.description }}</p>

        <!-- Product Card -->
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Left: Product image -->
          <div class="flex-1 flex justify-center md:justify-start">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full md:w-96 h-auto object-cover rounded-lg shadow"
            />
          </div>

          <!-- Right: Product info -->
          <div class="flex-1 space-y-4">
            <h1 class="text-2xl font-bold capitalize text-[#000080]">
              {{ product.title }}
            </h1>
            <p class="text-gray-700">{{ product.description }}</p>

            <!-- Edit button -->
            <button
              class="flex items-center gap-2 px-4 py-2 bg-[#000080] text-white rounded-lg hover:bg-blue-900 transition font-semibold shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 11l6 6L21 9l-6-6-6 6z"/>
              </svg>
              Edit Product
            </button>

            <!-- Price -->
            <div>
              <p class="font-semibold text-gray-600">Price</p>
              <p class="text-lg font-bold text-gray-800">${{ product.price }}</p>
            </div>

            <!-- Stock -->
            <div>
              <p class="font-semibold text-gray-600">Stock</p>
              <p class="text-gray-800">In Stock: <span class="font-medium">{{ product.stock }} units</span></p>
            </div>

            <!-- Description -->
            <div>
              <p class="font-semibold text-gray-600">Description</p>
              <p class="text-gray-700">{{ product.description }}</p>
            </div>
          </div>
        </div>

        <!-- Customer Reviews -->
        <div class="mt-6">
          <p class="font-semibold text-gray-700 mb-2">Customer Reviews</p>

          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center gap-1">
              <span class="font-bold text-gray-800">4.5</span>
              <div class="flex">
                <svg v-for="i in 4" :key="i" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.176 0l-3.357 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.946a1 1 0 00-.364-1.118L2.975 9.373c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.946z"/></svg>
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.176 0l-3.357 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.946a1 1 0 00-.364-1.118L2.975 9.373c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.946z"/></svg>
              </div>
              <span class="text-gray-500 text-sm">Based on 120 reviews</span>
            </div>
          </div>

          <!-- Rating bars -->
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-sm w-3">5</span>
              <div class="h-2 flex-1 bg-gray-200 rounded">
                <div class="h-2 bg-yellow-400 rounded" style="width: 75%"></div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm w-3">4</span>
              <div class="h-2 flex-1 bg-gray-200 rounded">
                <div class="h-2 bg-yellow-400 rounded" style="width: 15%"></div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm w-3">3</span>
              <div class="h-2 flex-1 bg-gray-200 rounded">
                <div class="h-2 bg-yellow-400 rounded" style="width: 5%"></div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm w-3">2</span>
              <div class="h-2 flex-1 bg-gray-200 rounded">
                <div class="h-2 bg-yellow-400 rounded" style="width: 3%"></div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm w-3">1</span>
              <div class="h-2 flex-1 bg-gray-200 rounded">
                <div class="h-2 bg-yellow-400 rounded" style="width: 1%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-4 mt-6">
          <button
            class="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            @click="goBack"
          >
            Back
          </button>

          <button
            class="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
            @click="deleteProductHandler"
            :disabled="isDeleting"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products.store';
import DashboardHeader from '@/components/common/DashboardHeader.vue';
import AppLayout from '@/layouts/AppLayout.vue';


const store = useProductsStore();
const route = useRoute();
const router = useRouter();

const productId = Number(route.params.id);
const isDeleting = ref(false);
const search = ref('');
const isSidebarOpen = ref(false);

// Fetch product by ID on mount
onMounted(async () => {
  await store.fetchProductById(productId);
});

// Computed product from store
const product = computed(() => store.products.find(p => p.id === productId));

// Navigate back
const goBack = () => {
  router.push('/products');
};

// Delete product handler
const deleteProductHandler = async () => {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    isDeleting.value = true;
    await store.deleteProduct(productId);
    router.push('/products');
  } catch (err) {
    alert('Failed to delete product');
    console.error("Error deleting a product", err);
  } finally {
    isDeleting.value = false;
  }
};

// Navigate to Add Product page
const goToAddProduct = () => {
  router.push('/products/new');
};
</script>

<style scoped>
/* Smooth hover transition for card elements */
img {
  transition: transform 0.25s ease-in-out;
}
img:hover {
  transform: scale(1.02);
}
</style>
