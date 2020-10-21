import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import './assets/global.css'
import './assets/fonts/iconfont.css'

import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入NProgress, 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


import axios from 'axios'
// 配置请求根路径
// 本机地址
//axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios
  // 挂载到vue实例,后面通过this调用


Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
  // 组件全局注册表格树

Vue.use(VueQuillEditor)
Vue.filter('dataFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
    // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
