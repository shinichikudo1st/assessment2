<script setup lang="js">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Footer</h3>
          <p class="text-sm">Creating innovative solutions for modern businesses.</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors">Services</a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <ul class="space-y-2 text-sm">
            <li>Email: footer@company.com</li>
            <li>Phone: (+63) 9456-789012</li>
            <li>Address: Toledo, City</li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
        <p>&copy; {{ currentYear }} Footer. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
