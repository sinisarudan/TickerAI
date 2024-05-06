import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
import NewsVue from "@/news/views/News.vue";

const routes: Array<RouteConfig> = [
	{
		path: "/preferences",
		name: "Preferences",
		component: NewsVue,
	},
	{
		path: "/",
		name: "Default",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "news" */ "@/news/views/News.vue"),
	},
	{
		path: "/news",
		name: "News",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "news" */ "@/news/views/News.vue"),
	},
	{
		path: "/news/:market/:marketaspect/:subfilter",
		name: "NewsMarketMarketAspectSubfilter",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "news" */ "@/news/views/News.vue"),
	},
	{
		path: "/news/:market/:marketaspect/",
		name: "NewsMarketMarketAspect",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "news" */ "@/news/views/News.vue"),
	},
	{
		path: "/news/:market/",
		name: "NewsMarket",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "news" */ "@/news/views/News.vue"),
	},
	{
		path: "/account",
		name: "account",
		// route level code-splitting
		// this generates a separate chunk (account.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "account" */ "../views/Account.vue"),
	},
	{
		path: "/my-preferences",
		name: "my-preferences",
		// route level code-splitting
		// this generates a separate chunk (preferences.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "my-preferences" */ "@/news/views/Preferences.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
