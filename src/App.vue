<script setup lang="js">
import { RouterView } from 'vue-router'
import NavMenu from './components/navMenu.vue'
import Footer from './components/footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavMenu />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
