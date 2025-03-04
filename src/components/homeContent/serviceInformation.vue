<script setup lang="js">
const highlights = [
  {
    title: 'Experience',
    description: '10+ years of delivering quality solutions',
    icon: '⭐'
  },
  {
    title: 'Expertise',
    description: 'Skilled team of developers and designers',
    icon: '💡'
  },
  {
    title: 'Innovation',
    description: 'Using latest technologies and best practices',
    icon: '🚀'
  }
]
</script>

<template>
  <div class="p-8 bg-gray-50 rounded-lg">
    <!-- Main Content -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Services Information</h2>
      <div class="prose prose-lg text-gray-600">
        <p class="mb-4">
          We are a team of passionate developers and designers dedicated to creating exceptional digital experiences.
        </p>
        <p>
          Our mission is to help businesses transform their ideas into powerful, scalable solutions that drive growth
          and success in the digital world.
        </p>
      </div>
    </div>

    <!-- Highlights -->
    <div class="space-y-6">
      <h3 class="text-2xl font-semibold text-gray-900">Why Choose Us</h3>
      <div class="grid gap-4">
        <div v-for="item in highlights" :key="item.title"
          class="flex items-start p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
          <div class="text-2xl mr-4">{{ item.icon }}</div>
          <div>
            <h4 class="font-semibold text-gray-900">{{ item.title }}</h4>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
