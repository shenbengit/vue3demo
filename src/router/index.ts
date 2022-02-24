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
        name: "clientLogin",
        component: () => import("../views/LoginView.vue")
    },
    {
        path: "/register",
        name: "clientRegister",
        component: () => import("../views/RegisterView.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
