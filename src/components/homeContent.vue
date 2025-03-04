<script setup lang="js">
import ServiceInformation from './homeContent/serviceInformation.vue'
import ServiceOffered from './homeContent/serviceOffered.vue'
</script>

<template>
  <section class="max-w-7xl mx-auto py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ServiceInformation />
      <ServiceOffered />
    </div>
  </section>
</template>
