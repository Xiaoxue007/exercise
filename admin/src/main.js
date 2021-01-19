import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from "element-plus";
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// import Avue from '@smallwei/avue';
// import '@smallwei/avue/lib/index.css';
import axios from 'axios'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, { locale })
// app.use(Avue)
app.mount('#app')

let baseURL = process.env.VUE_APP_API_URL

// 设置baseURL并挂载到全局
app.config.globalProperties.$http = axios.create({
    baseURL
})

app.config.globalProperties.baseURL = baseURL