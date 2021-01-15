//挂载home页面下的新增、编辑等页面

export default [{
    path: '/Home',
    name: 'Home',
    component: resolve => (require(["@/views/home/Home.vue"], resolve)),
    children: [{
        path: '/sysManage/physicalTableStructure',
        name: 'physicalTableStructure',
        component: resolve => (require(["@/views/sysManage/physicalTabManage/Edit"], resolve))
    }, ],
}];