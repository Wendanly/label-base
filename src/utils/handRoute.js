import store from '@/store'
import router from '@/router/router.js';
import localRouterList from '@/router/routerList.js';
//点击登录按钮并成功后调用此方法，之后进入home页面
export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        store.dispatch('getUserInfo').then(res => {
            console.log(res);
            getMenuList().then(resp => {
                resolve('success');
            });

        });
    });

}

const getMenuList = () => {
    return new Promise((resolve, reject) => {
        store.dispatch('getMenuList', {
            tenantId: store.state.tenants[0].ID,
            appId: "2"
        }).then(resp => {
            console.log(resp);
            createRoute(resp.menuList, () => {
                resolve('success');
            });
            sessionStorage.setItem("menuList", JSON.stringify(resp.menuList));
        });
    });
}
//拼装路由父子关系
const createRoute = (menuList, cb) => {
    let menuArr = menuList.filter(o => o.PARENT_MENU_ID == 0); //过滤出一级菜单
    menuArr.filter(m => {
        m.children = []; //给每个一级菜单挂一个空children
        menuList.filter(o => {
            if (m.ID == o.PARENT_MENU_ID) {
                m.children.push(o);
            }
        });
    });
    // console.log(JSON.parse(JSON.stringify(menuArr)));
    //构建路由表
    let routerList = []; //路由表，用于路由跳转，不带层级
    menuArr.map(o => {
        let tmpArr = [];
        if (o.children.length) {
            //children不为零
            o.children.map(m => {
                tmpArr.push(createRouteCell(m))
            });
            o.children = tmpArr; //把构建好的路由赋值给children
        }
        Object.assign(o, createRouteCell(o)); //一级菜单与构建好的路由混在一起
        routerList = routerList.concat(JSON.parse(JSON.stringify(tmpArr))); //拼接到总路由表里
    });
    console.log(JSON.parse(JSON.stringify(routerList)));
    console.log(JSON.parse(JSON.stringify(menuArr)));
    store.commit('setAnsycRouterList', routerList); //固化动态路由表,以后也用于路由跳转
    store.commit('setMenuList', menuArr); //固化动态路由表,以后也用于菜单渲染
    addRoutes(); //加载动态路由
    cb();
}


//加载动态路由
export const addRoutes = () => {
    store.state.ansycRouterList.map(o => o.component = () => import(`@/views${o.path}/index.vue`)); //动态加载路由组件
    localRouterList[0].children = localRouterList[0].children.concat(store.state.ansycRouterList); //动态路由表是挂载home的children下面的，要与已有的合并（此场景会在新增、编辑这种页面出现，以上两种页面不是后端返回的，但也是在home的children下，所以要和后端返回的合并）
    console.log(localRouterList); //home下面的所有路由（本地及后端）
    router.addRoutes(localRouterList); //添加路由
    console.log(router);
    store.commit('setAnsycRouterStatus', true); //改变全局状态，路由表已挂载完成

}


//构建路由模型
const createRouteCell = item => {
    return {
        path: item.MENU_PATH,
        name: item.MENU_CODE,
        meta: {
            id: item.ID,
            name: item.MENU_NAME,
            menuType: item.MENU_TYPE,
            menuClass: item.MENU_CLASS
        },
        //这里不能挂载component 是因为函数无法储存在sessionStorage里
        // component: resolve =>
        //     require([`@/views${item.MENU_PATH}/index.vue`], resolve)
    };
}