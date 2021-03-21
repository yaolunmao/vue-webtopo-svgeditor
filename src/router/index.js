import { createRouter, createWebHistory } from 'vue-router'
// import mineRouter from "./mineRouter";
// import JsBridge from "../utils/jsbridge";
const routerHistory = createWebHistory();

let routes = [
    // route -> routes
    // 首页
    {
        path: '/',
        name: '/',
        component: () =>
        import ('../views/CircuitEdit.vue'),
    },
    // 编辑器页面
    {
        path: '/CircuitEdit',
        name: 'CircuitEdit',
        component: () =>
            import ('../views/CircuitEdit.vue'),
    },
    // 预览页页面
    {
        path: '/CircuitPreview',
        name: 'CircuitPreview',
        component: () =>
            import ('../views/CircuitPreview.vue'),
    }


]

// routes = routes.concat(mineRouter)

const router = createRouter({
    history: routerHistory,
    routes
});

// // 路由守卫
router.beforeEach((to, from, next) => {
    console.log(to);
    next();
});

export default router