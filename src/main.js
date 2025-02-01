/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// styles 
import 'mapbox-gl/dist/mapbox-gl.css';
// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia';
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.use(createPinia())

app.mount('#app')
