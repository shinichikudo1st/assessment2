<script setup lang="js">
const emit = defineEmits(['switchToLogin'])

const switchToLogin = () => {
  emit('switchToLogin')
}

const register = () => {
  console.log('register')
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Create Account</h2>

    <form class="space-y-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
          <div class="mt-1">
            <input id="firstName" name="firstName" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="First Name">
          </div>
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
          <div class="mt-1">
            <input id="lastName" name="lastName" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Last Name">
          </div>
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
        <div class="mt-1">
          <input id="email" name="email" type="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your email">
        </div>
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
        <div class="mt-1">
          <textarea id="address" name="address" rows="3" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your address"></textarea>
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <div class="mt-1">
          <input id="password" name="password" type="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Create a password">
        </div>
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <div class="mt-1">
          <input id="confirmPassword" name="confirmPassword" type="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Confirm your password">
        </div>
      </div>

      <div>
        <button type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
          text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Create Account
        </button>
      </div>
    </form>

    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Already have an account?</span>
        </div>
      </div>

      <div class="mt-6">
        <button @click="switchToLogin"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
          text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Sign in instead
        </button>
      </div>
    </div>
  </div>
</template>
