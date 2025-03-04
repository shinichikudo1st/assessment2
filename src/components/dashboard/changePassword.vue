<script setup lang="js">
import { ChangePassword } from '@/clientRequest'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const router = useRouter()

const errorPassword = ref('')

const changePassword = async () => {
  try {
    await ChangePassword(passwordForm.value)

    router.push('/authentication')
  } catch (error) {
    errorPassword.value = error instanceof Error ? error.message : 'Unknown error occured'
  } finally {
    setTimeout(() => {
      errorPassword.value = ''
    }, 3000)
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 class="text-lg font-medium text-gray-900 mb-6">Change Email</h3>

    <!-- Error Message -->
    <div v-if="errorPassword" class="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
      <p class="text-red-700 text-sm font-medium text-center">
        {{ errorPassword }}
      </p>
    </div>

    <form class="space-y-6" @submit.prevent="changePassword">
      <div class="relative">
        <label for="currentEmail" class="block text-sm font-medium text-gray-700 mb-2">
          Current Password
        </label>
        <div class="relative">
          <input
            type="text"
            id="currentPassword"
            v-model="passwordForm.currentPassword"
            class="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Enter current password"
          />
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative">
        <label for="newEmail" class="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <div class="relative">
          <input
            type="password"
            id="newPassword"
            v-model="passwordForm.newPassword"
            class="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Enter new password"
          />
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="relative">
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div class="relative">
          <input
            type="password"
            id="confirmPassword"
            v-model="passwordForm.confirmPassword"
            class="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Enter your password"
          />
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-6">
        <button
          type="submit"
          class="cursor-pointer inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow"
        >
          Update Password
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #9ca3af;
}
</style>
