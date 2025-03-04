<script setup lang="js">
import Auth from '../components/auth.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md mb-6">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        Welcome Back
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Please sign in to your account or create a new one
      </p>
    </div>
    <Auth />
  </div>
</template>


<style scoped></style>
