import Vue from 'vue'
import App from './App.vue'
import problems from './assets/problems.json';
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false
//Add unimported components to ignore list to prevent warnings.
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']

new Vue({
  vuetify,
  beforeCreate() {
    if (localStorage.getItem('is_accepted') == null) {
      localStorage.setItem('is_accepted', JSON.stringify(Array(problems.problems.length).fill(0)));
      localStorage.setItem('workspaces', JSON.stringify(Array(problems.problems.length)));
      localStorage.setItem('score', '0');
    }
  },
  data: () => ({
    score: 0,
  }),
  template: `<router-view class="view"></router-view>`,
  router,
  render: h => h(App)
}).$mount('#app')
