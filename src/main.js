// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import iView from 'iview'
import MetaInfo from 'vue-meta-info'
import Filters from './filters'

import 'iview/dist/styles/iview.css'
import '@/assets/style/common.css'

if ("aliblog.org" === window.location.hostname){
  axios.defaults.baseURL = 'http://tuziliuliang.com:8080';
  window.gitalkConfig = {
    clientID: "8782ddeacbed22af6619",
    clientSecret: "c693aa3718baebf1c1246d3a7a5a04e21eb1f9b3",
    repo: "Ali-Blog"
  };
}else{
  axios.defaults.baseURL = 'http://127.0.0.1:7001';
  window.gitalkConfig = {
    clientID: "0e6dc00e0bce715fe9dc",
    clientSecret: "f02d71027d75479a2748e4a2c8aa196c9f7dac10",
    repo: "test"
  };
};

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(MetaInfo);
Vue.prototype.$http = axios;

// 全局 filter
for(const key in Filters) {
  Vue.filter(key, Filters[key]);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  metaInfo(){
    let metaInfo = this.$store.state.metaInfoData.data;
    return {
      title: metaInfo === null ? '' : metaInfo.site_title,
      meta: [{
        name: 'keywords',
        content: metaInfo === null ? '' : metaInfo.tite_keywords,
      },{
          name: 'description',
          content: metaInfo === null ? '' : metaInfo.site_description,
      }]
    }
  },
  created(){
    this.$store.dispatch('getMetaInfoData');
  }
  // template: '<App/>',
  // components: { App }
})
