/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { mask } from 'vue-the-mask';
import { createPinia } from 'pinia'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const pinia = createPinia()
const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.mount('#app')
app.directive('mask', mask);
