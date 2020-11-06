import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import "./styles/main.scss";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

Vue.config.productionTip = false;
Vue.prototype.$isMobile = isMobile;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
