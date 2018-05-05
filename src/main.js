import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'

import App from './App'
import router from './router'
import jQuery from 'static/jquery.min'

//global.jQuery = jQuery;
//global.$ = jQuery;

Vue.use(VueResource);
Vue.use(VueLocalStorage)

Vue.config.productionTip = false
Vue.http.options.emulateJSON = false;
Vue.http.options.root = "http://localhost/"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
