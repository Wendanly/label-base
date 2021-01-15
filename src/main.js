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

console.log('main top');
Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
  console.log(to, from);
  console.log(JSON.parse(JSON.stringify(store.state)));
  if (store.state.token) {
    // debugger
    //登录后若无刷新，正常的页面跳转则放行, ansycRouterStatus 为真则表示没刷新页面
    if (store.state.ansycRouterStatus) {
      next();
    } else {
      // debugger
      //登录后并刷新页面则重新加载动态路由
      addRoutes();
      if (from.name == null) {
        next(to);
      } else {
        next();
      }
    }
  } else if (to.path == '/Login' || to.path == '/') {
    next();
  } else {
    // debugger
    router.push({
      path: '/Login'
    });
  }

});

Vue.config.productionTip = false
localStorage.setItem('stateInitInfo', JSON.stringify(store.state)); //存入state的初始化信息,为了重置state
console.log(JSON.parse(JSON.stringify(store.state)));
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')