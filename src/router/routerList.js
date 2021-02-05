//挂载home页面下的各个功能模块的新增、编辑等页面

export default [{
    path: '/Home',
    name: 'Home',
    component: resolve => (require(["@/views/home/Home.vue"], resolve)),
    children: [{
        path: '/labelManage/physicalTableEdit',
        name: 'physicalTableEdit',
        component: resolve => (require(["@/views/sysManage/physicalTabManage/Edit"], resolve))
    }, ],
}];