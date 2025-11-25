<template>
  <AppLayout>
    <div class="p-6 max-w-5xl mx-auto space-y-6">
      <!-- Page Header -->
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Add New Product</h1>
        <p class="text-gray-500">Enter the details below to add new item to your inventory</p>
      </div>

      <!-- Product Form Card -->
      <div class="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <!-- Product Information -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-700">Product Information</h2>

          <!-- Product Title -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-medium mb-1">Product Title</label>
            <input
              v-model="form.title"
              type="text"
              placeholder="Enter product title"
              class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080]"
            />
          </div>

          <!-- Product Description -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-medium mb-1">Product Description</label>
            <textarea
              v-model="form.description"
              placeholder="Provide a detailed description of the product"
              rows="4"
              class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Pricing & Inventory -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-700">Pricing & Inventory</h2>
          <hr class="border-gray-300"/>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Price -->
            <div class="flex flex-col">
              <label class="text-gray-600 font-medium mb-1">Price</label>
              <input
                v-model.number="form.price"
                type="number"
                placeholder="$ 0.00"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080]"
              />
            </div>

            <!-- Category -->
            <div class="flex flex-col relative">
              <label class="text-gray-600 font-medium mb-1">Category</label>
              <select
                v-model="form.category"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] appearance-none pr-8"
              >
                <option disabled value="">Select a category</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
              <svg class="w-5 h-5 absolute right-2 top-9 text-gray-500 pointer-events-none" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            <!-- Stock Quantity -->
            <div class="flex flex-col">
              <label class="text-gray-600 font-medium mb-1">Stock Quantity</label>
              <input
                v-model.number="form.stock"
                type="number"
                placeholder="Enter Stock quantity"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080]"
              />
            </div>
          </div>
        </div>

        <!-- Media Upload -->
        <div class="space-y-2">
          <label class="text-gray-600 font-medium">Media</label>
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-12 cursor-pointer hover:border-[#000080] transition"
            @click="triggerFileInput"
          >
            <svg class="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16v-4a4 4 0 014-4h6m0 0l-3-3m3 3l-3 3m-6 4v6m0 0H5a2 2 0 01-2-2v-6"></path>
            </svg>
            <p class="text-gray-500 mb-1">Click to upload or drag and drop</p>
            <p class="text-gray-400 text-sm">SVG, PNG, JPG or GIF (MAX 800x400 px)</p>
            <input type="file" multiple class="hidden" ref="fileInput" @change="handleFiles"/>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 justify-start mt-4">
          <button
            class="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            @click="goBack"
          >
            Cancel
          </button>

          <button
            class="px-6 py-2 rounded bg-[#000080] text-white hover:bg-blue-900 transition font-semibold"
            @click="saveProduct"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products.store";
import type { AddProductPayload } from "@/types/Product";

const router = useRouter();
const store = useProductsStore();

const form = ref<AddProductPayload>({
  title: "",
  description: "",
  price: 0,
  stock: 0,
  category: "",
  images: [],
});

const categories = ["Electronics", "Clothing", "Beauty", "Home", "Sports", "Other"];

// File input reference
const fileInput = ref<HTMLInputElement>();

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFiles = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const filesArray = Array.from(target.files);
    form.value.images = filesArray.map(f => URL.createObjectURL(f));
  }
};

// Navigate back
const goBack = () => router.push("/products");

// Save Product
const saveProduct = async () => {
  if (!form.value.title || !form.value.category) {
    alert("Title and Category are required");
    return;
  }

  try {
    await store.addProduct(form.value);
    alert("Product added successfully!");
    router.push("/products");
  } catch (err) {
    console.error("Failed to add product", err);
    alert("Failed to add product");
  }
};
</script>

<style scoped>
/* Tailwind handles most styling */
/* Optional: hover zoom effect for uploaded images */
</style>
