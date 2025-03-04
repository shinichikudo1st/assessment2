<script setup lang="js">
import { ref } from 'vue'; // Import ref for reactive state
import LoginModal from './authentication/loginModal.vue'
import RegisterModal from './authentication/registerModal.vue'

const currentModal = ref("login");

const openRegister = () => {
  currentModal.value = "register";
};

const openLogin = () => {
  currentModal.value = "login";
};

</script>


<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
      <LoginModal v-if="currentModal === 'login'" @switch-to-register="openRegister" />
      <RegisterModal v-else @switch-to-login="openLogin" />
    </div>
  </div>
</template>

<style scoped></style>
