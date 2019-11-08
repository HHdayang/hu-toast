import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import CommentsOverlay from './plugins/CommentsOverlay';

import Toast from './lib/index';

Vue.use(CommentsOverlay);
Vue.use(Toast);


Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
