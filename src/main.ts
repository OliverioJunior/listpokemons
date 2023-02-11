import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faPlus)

createApp(App)
.use(router)
.use(createPinia())
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
