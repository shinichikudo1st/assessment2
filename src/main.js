import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Make sure you use the router
app.use(router)

app.mount('#app')
