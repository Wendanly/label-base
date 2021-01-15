import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//和home平级的页面
let routes = [{
        path: '/',
        redirect: '/Login'
    },
    {
        path: '/Login',
        name: 'Login',
        component: resolve => (require(["@/views/Login"], resolve))
    }
];


export default new VueRouter({
    mode: 'history',
    base: '/baselabelui',
    routes
});