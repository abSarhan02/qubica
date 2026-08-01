import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw
} from "vue-router";

import CatalogView from "../views/CatalogView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import CartView from "../views/CartView.vue";
import WishlistView from "@/views/WishlistView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "catalog",
        component: CatalogView
    },
    {
        path: "/products/:id",
        name: "product-detail",
        component: ProductDetailView
    },
    {
        path: "/cart",
        name: "cart",
        component: CartView
    },
    {
        path: "/wishlist",
        name: "wishlist",
        component: WishlistView
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFoundView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;