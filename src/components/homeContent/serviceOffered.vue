<script setup lang="js">
const services = [
  {
    title: 'Web Development',
    description:
      'Custom web applications built with modern frameworks and technologies. We create responsive, scalable, and user-friendly solutions.',
    icon: '🌐',
  },
  {
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile applications that deliver exceptional user experience across all devices.',
    icon: '📱',
  },
  {
    title: 'Project Management',
    description:
      'Professional project management services ensuring timely delivery, clear communication, and optimal resource utilization.',
    icon: '📊',
  },
]
</script>

<template>
  <div class="p-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-8">Services Offered</h2>
    <div class="space-y-8">
      <div v-for="service in services" :key="service.title"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div class="text-4xl mb-4">{{ service.icon }}</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ service.title }}</h3>
        <p class="text-gray-600">{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>
