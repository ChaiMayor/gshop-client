// 文件位置: src/router/index.js

//引入VueRouter
import VueRouter from "vue-router";
//引入Luyou 组件

const Msite = () => import("../pages/Msite/Msite.vue");
const Order = () => import("../pages/Order/Order.vue");
const Profile = () => import("../pages/Profile/Profile.vue");
const Search = () => import("../pages/Search/Search.vue");

// import Msite from "../pages/Msite/Msite.vue";
// import Order from "../pages/Order/Order.vue";
// import Profile from "../pages/Profile/Profile.vue";
// import Search from "../pages/Search/Search.vue";

import Login from "../pages/Login/Login.vue";
import Shop from "../pages/Shop/Shop.vue";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods.vue";
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings.vue";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo.vue";

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	mode: "history", // 切换路由模式
	routes: [
		{
			path: "/",
			redirect: "/msite",
		},
		{
			path: "/msite",
			component: Msite,
			meta: { showFooter: true },
		},
		{
			path: "/order",
			component: Order,
			meta: { showFooter: true },
		},
		{
			path: "/profile",
			component: Profile,
			meta: { showFooter: true },
		},
		{
			path: "/search",
			component: Search,
			meta: { showFooter: true },
		},
		{
			path: "/login",
			component: Login,
		},
		{
			path: "/shop",
			component: Shop,
			children: [
				{
					path: "/",
					redirect: "goods",
				},
				{
					path: "goods",
					component: ShopGoods,
				},
				{
					path: "ratings",
					component: ShopRatings,
				},
				{
					path: "info",
					component: ShopInfo,
				},
			],
		},
	],
});

//暴露router
export default router;
