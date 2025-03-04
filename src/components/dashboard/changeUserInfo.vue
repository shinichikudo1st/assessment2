<script setup lang="js">
import { ref } from 'vue'

const userInfoForm = ref({
  firstname: '',
  lastname: '',
  address: '',
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 class="text-lg font-medium text-gray-900 mb-6">Change User Information</h3>

    <form class="space-y-6">
      <div class="relative">
        <label for="currentEmail" class="block text-sm font-medium text-gray-700 mb-2">
          New First Name
        </label>
        <div class="relative">
          <input
            type="text"
            id="firstname"
            v-model="userInfoForm.firstname"
            class="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Enter New First"
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
          New Last Name
        </label>
        <div class="relative">
          <input
            type="email"
            id="newEmail"
            v-model="userInfoForm.lastname"
            class="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Enter new email"
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
          New Address
        </label>
        <div class="relative">
          <input
            type="password"
            id="password"
            v-model="userInfoForm.address"
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
          Update
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
