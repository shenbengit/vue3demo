import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import IndexView from "../views/IndexView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "index",
        component: IndexView
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/LoginView.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/RegisterView.vue")
    },
    {
        path: "/administrator/home",
        name: "administratorHome",
        component: () => import("../views/administrator/HomeView.vue")
    },
    {
        path: "/client/home",
        name: "clientHome",
        component: () => import("../views/client/HomeView.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
