import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false


//默认bus是空的，但可以给bus赋值一个vue实例作为事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
