import Vue from 'vue'
import App from './App.vue'
import problems from './assets/problems.json';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
//Add unimported components to ignore list to prevent warnings.
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']

new Vue({
  vuetify,

  data: () => ({
    is_accepted: Array(problems.problems.length).fill(0),
    workspaces: Array(problems.problems.length),
    score: 0,
  }),

  render: h => h(App)
}).$mount('#app')
