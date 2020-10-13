import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
const app = createApp(App)

app.use(Antd).use(router).use(store).mount('#app')
