<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">

      <!-- Platform Logo in a single line -->
      <div class="flex items-center justify-center mb-6 gap-3">
        <!-- Cylinder Icon -->
        <svg
          class="w-12 h-12 text-[#000080]"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C7.582 2 4 4.686 4 8v8c0 3.314 3.582 6 8 6s8-2.686 8-6V8c0-3.314-3.582-6-8-6zm0 2c3.314 0 6 1.79 6 4s-2.686 4-6 4-6-1.79-6-4 2.686-4 6-4zm6 10c0 2.21-2.686 4-6 4s-6-1.79-6-4v-2c1.164 1.164 4.164 2 6 2s4.836-.836 6-2v2z"
          />
        </svg>

        <!-- Platform Text -->
        <span class="text-[#000080] font-bold text-xl">AlienSoft Technologies</span>
      </div>

      <!-- Welcome Text -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p class="text-gray-500">Sign in to manage your products</p>
      </div>

      <!-- SUCCESS MESSAGE -->
      <div
        v-if="success"
        class="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded"
      >
        {{ success }}
      </div>

      <!-- ERROR MESSAGE -->
      <div
        v-if="error"
        class="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded"
      >
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">

        <!-- USERNAME FIELD -->
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter username"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#000080]"
            required
          />
        </div>

        <!-- PASSWORD FIELD WITH TOGGLE -->
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Password</label>

          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-[#000080]"
              required
            />

            <!-- Eye Icon -->
            <span
              class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              @click="togglePassword"
            >
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.133-3.592m3.16-2.315A9.97 9.97 0 0112 5c4.477 
                      0 8.268 2.943 9.542 7a10.05 10.05 0 01-.667 1.972M15 12a3 3 0 00-4.95-2.1M3 3l18 18" />
              </svg>
            </span>
          </div>
        </div>

        <!-- LOGIN BUTTON -->
        <button
          type="submit"
          class="w-full flex justify-center items-center bg-[#000080] text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Login</span>

          <!-- Spinner -->
          <svg
            v-else
            class="animate-spin h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="white"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            ></path>
          </svg>
        </button>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginAPI } from "@/api/auth.api";
import type { LoginPayload } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref<string | null>(null);
    const success = ref<string | null>(null);
    const isLoading = ref(false);
    const showPassword = ref(false);

    const router = useRouter();
    const authStore = useAuthStore();

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = async () => {
      isLoading.value = true;
      error.value = null;
      success.value = null;

      try {
        const payload: LoginPayload = {
          username: username.value.trim(),
          password: password.value.trim(),
        };

        const response = await loginAPI(payload);

        const user = {
          id: response.id.toString(),
          name: `${response.firstName} ${response.lastName}`,
          email: response.email,
        };

        authStore.login(response.accessToken, user);

        success.value = "Login successful! Redirecting...";

        setTimeout(() => {
          router.push("/products");
        }, 1200);
      } catch (err) {
        if (err instanceof Error) error.value = err.message;
        else error.value = "Login failed";
      } finally {
        isLoading.value = false;
      }
    };

    return {
      username,
      password,
      error,
      success,
      isLoading,
      showPassword,
      togglePassword,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* Extra spacing and adjustments if needed */
</style>
