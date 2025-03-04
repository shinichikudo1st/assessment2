<script setup lang="js">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { forgotPassword } from '../clientRequest'

const email = ref('')
const message = ref('')
const isError = ref(false)
const router = useRouter()

const handleForgotPassword = async () => {
  try {
    const response = await forgotPassword(email.value)
    message.value = 'Password reset instructions have been sent to your email'
    isError.value = false
    setTimeout(() => {
      router.push('/authentication')
    }, 3000)
  } catch (error) {
    message.value = error.message || 'An error occurred'
    isError.value = true
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Enter your email address and we'll send you instructions to reset your password
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleForgotPassword">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Reset Instructions
            </button>
          </div>

          <div
            v-if="message"
            :class="['mt-4 text-sm text-center', isError ? 'text-red-600' : 'text-green-600']"
          >
            {{ message }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
