import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'


axios.defaults.baseURL = 'http://127.0.0.1:8000'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(store).use(router, axios).use(vuetify).mount('#app')
