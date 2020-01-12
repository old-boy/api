module.exports = [{
    name: 'Dashboard',
    id: 'basic',
    icon: 'el-icon-menu',
    // sub: [{
    //     name: 'Layout 布局',
    //     componentName: 'BasicLayout'
    // }, {
    //     name: 'Container 布局容器',
    //     componentName: 'BasicContainer'
    // }]
}, {
    name: 'Product',
    id: 'form',
    icon: 'el-icon-present',
    sub: [{
        name: 'Tag',
        componentName: '/product/tag'
    }, {
        name: 'Faq',
        componentName: "/product/faq"
    }, {
        name: "Static Page",
        componentName: "/product/staticPage"
    }]
}]