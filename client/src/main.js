import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
fetch(`${process.env.BASE_URL}config/config.json?t=${new Date().getTime()}`)
  .then((response) => response.json())
  .then((config) => {
    Vue.prototype.$config = config
    new Vue({
      router,
      store,
      vuetify,
      render: function (h) {
        store.dispatch('updateDateTime')
        setInterval(refreshRoutine, 5000)
        return h(App)
      }
    }).$mount('#app')
  })

function refreshRoutine () {
  store.dispatch('getSetpoint', 'manu')
  store.dispatch('getSetpoint', 'auto')
  store.dispatch('getSetpoint', 'forced')
}
