import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from '@/store'
import router from '@/router/router.js';
import {
  addRoutes
} from "@/utils/handRoute.js";
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/common.scss'
import "@/assets/iconfont/iconfont.css";//引入阿里矢量图标库
console.log('main top');
Vue.use(ElementUI);


console.log(JSON.parse(JSON.stringify(store.state)));
//登录后并刷新(此时有token但无路由)
if (store.state.token && !store.state.ansycRouterStatus) {
  addRoutes();
}






router.beforeEach((to, from, next) => {
  console.log(to, from);
  console.log(JSON.parse(JSON.stringify(store.state)));
  if (store.state.token || to.path == '/Login' || to.path == '/') {
    next();
  } else {
    router.push({
      path: '/Login'
    });
  }

});

Vue.config.productionTip = false
// localStorage.setItem('stateInitInfo', JSON.stringify(store.state)); //存入state的初始化信息,为了重置state
// console.log(JSON.parse(JSON.stringify(store.state)));
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')