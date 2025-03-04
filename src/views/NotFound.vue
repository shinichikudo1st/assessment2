<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">Page Not Found</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <div class="mt-4 text-center">
        <router-link to="/authentication" class="font-medium text-blue-600 hover:text-blue-500">
          Return to Login
        </router-link>
      </div>
    </div>
  </div>
</template>
