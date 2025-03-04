<script setup lang="js">
import ChangePassword from '../components/dashboard/changePassword.vue'
import ChangeEmail from '../components/dashboard/changeEmail.vue'
import changeUserInfo from '@/components/dashboard/changeUserInfo.vue'
import { useRouter } from 'vue-router'
import { LogoutUser } from '@/clientRequest'
import { ref } from 'vue'

const router = useRouter()

const errorLogout = ref('')

const logout = async () => {
  try {
    await LogoutUser()

    router.push('/authentication')
  } catch (error) {
    errorLogout.value = error instanceof Error ? error.message : 'Unknown error occured'
  } finally {
    setTimeout(() => {
      errorLogout.value = ''
    }, 3000)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Dashboard Header with Sign Out -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Account Settings</h2>
          <p class="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
        </div>

        <button
          @click="logout"
          class="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clip-rule="evenodd"
            />
          </svg>
          Sign Out
        </button>
      </div>

      <!-- Dashboard Content -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Left Column - Reserved for User Info -->
        <div class="space-y-6">
          <!-- Placeholder for User Info Component -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">User Information</h3>
            <p class="text-sm text-gray-500">User info component will be added here</p>
          </div>
          <changeUserInfo />
        </div>

        <!-- Right Column - Security Settings -->
        <div class="space-y-6">
          <ChangePassword />
          <ChangeEmail />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
