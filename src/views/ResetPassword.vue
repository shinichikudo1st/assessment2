<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { resetPassword } from '../clientRequest'

const router = useRouter()
const route = useRoute()
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const isError = ref(false)
const token = ref('')

onMounted(() => {
  // Get token from route params
  token.value = route.params.token
  if (!token.value) {
    message.value = 'Invalid reset token'
    isError.value = true
  }
})

const handleResetPassword = async () => {
  try {
    if (newPassword.value !== confirmPassword.value) {
      throw new Error('Passwords do not match')
    }

    if (!token.value) {
      throw new Error('Invalid reset token')
    }

    await resetPassword(token.value, newPassword.value)
    message.value = 'Password successfully reset! Redirecting to login...'
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
      <h2 class="text-center text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
      <p class="mt-2 text-center text-sm text-gray-600">Enter your new password below</p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleResetPassword">
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div class="mt-1">
              <input
                id="newPassword"
                v-model="newPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div
            v-if="message"
            :class="['mt-4 text-sm text-center', isError ? 'text-red-600' : 'text-green-600']"
          >
            {{ message }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="!token"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
