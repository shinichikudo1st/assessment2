<script setup lang="js">
import { LoginUser } from '@/clientRequest.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['switchToRegister'])

const switchToRegister = () => {
  emit('switchToRegister')
}

const router = useRouter()

const formData = ref({
  email: '',
  password: '',
})

const errorLogin = ref('')

const login = async () => {
  try {
    await LoginUser(formData.value)

    router.push('/dashboard')
  } catch (error) {
    errorLogin.value = error instanceof Error ? error.message : 'Unknown error occured'
  } finally {
    setTimeout(() => {
      errorLogin.value = ''
    }, 3000)
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Sign In</h2>

    <!-- Error Message -->
    <div v-if="errorLogin" class="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
      <p class="text-red-700 text-sm font-medium text-center">
        {{ errorLogin }}
      </p>
    </div>

    <form class="space-y-6" @submit.prevent="login">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
        <div class="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            required
            v-model="formData.email"
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <div class="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            required
            v-model="formData.password"
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>

        <div class="text-sm">
          <router-link to="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </router-link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </div>
    </form>

    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Don't have an account?</span>
        </div>
      </div>

      <div class="mt-6">
        <button
          @click="switchToRegister"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create new account
        </button>
      </div>
    </div>
  </div>
</template>
