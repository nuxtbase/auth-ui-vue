import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import highlight from '~/plugins/highlight'
import i18n from '~/plugins/i18n'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(highlight)
app.use(i18n)
app.mount('#app')
