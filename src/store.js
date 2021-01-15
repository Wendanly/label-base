import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import {
  UserInfo,
  GetMenuList
} from "@/api/login.js";
Vue.use(Vuex)

let vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer(val) {
    return {
      // 指定需要持久化的state
      token: val.token,
      userInfo: val.userInfo,
      tenants: val.tenants,
      ansycRouterList: val.ansycRouterList,
      menuList: val.menuList,

    }
  }
})
export default new Vuex.Store({
  state: {
    token: '',
    userInfo: '',
    tenants: '',
    ansycRouterList: [], //动态路由表是否已获得，需固化
    ansycRouterStatus: false, //当前路由表是否被刷新清除
    menuList: [],

  },
  mutations: {
    setToken(state, val) {
      state.token = val;
    },
    setUserInfo(state, val) {
      state.userInfo = val;
    },
    setTenants(state, val) {
      state.tenants = val;
    },
    setAnsycRouterList(state, val) {
      state.ansycRouterList = val;
    },
    setAnsycRouterStatus(state, val) {
      state.ansycRouterStatus = val;
    },
    setMenuList(state, val) {
      state.menuList = val;
    },
    resetState(state, val) {
      for (let i in state) {
        state[i] = val[i];
      }
    },
  },
  actions: {
    getUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        UserInfo({}).then(res => {
          // console.log(res);
          commit('setUserInfo', res)
          resolve(res);
        });
      });
    },
    getMenuList({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        GetMenuList(params).then(res => {
          // console.log(res);
          resolve(res);
        });
      });
    },
  },
  plugins: [vuexLocal.plugin]
})