<script setup lang="js">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <RouterLink to="/" class="flex items-center space-x-2">
            <img src="/favicon.ico" alt="Logo" class="h-8 w-8" />
            <span class="text-xl font-bold text-gray-800">Vuetify</span>
          </RouterLink>
        </div>

        <!-- Navigation Links -->
        <div class="flex space-x-4">
          <RouterLink to="/authentication"
            class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600">
            Login
          </RouterLink>
          <RouterLink to="/contact"
            class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600">
            Contact Us
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
