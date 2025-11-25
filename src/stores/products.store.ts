import { defineStore } from "pinia";
import { fetchProductsAPI, fetchProductByIdAPI, addProductAPI, deleteProductAPI } from "@/api/products.api";
import type { Product, AddProductPayload } from "@/types/Product";

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [] as Product[],
        isLoading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchProducts() {
            this.isLoading = true;
            this.error = null;

            try {
                this.products = await fetchProductsAPI();
            } catch (err) {
                const error = err as Error;
                this.error = error.message || "Failed to load products";
            } finally {
                this.isLoading = false;
            }
        },

        async fetchProductById(id: number) {
            return await fetchProductByIdAPI(id);
        },

        async addProduct(payload: AddProductPayload) {
            const newProduct = await addProductAPI(payload);
            this.products.push(newProduct);
            return newProduct;
        },

        async deleteProduct(id: number) {
            await deleteProductAPI(id);
            this.products = this.products.filter(p => p.id !== id);
        }
    }
});



