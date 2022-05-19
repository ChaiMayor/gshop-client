import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

//引入filters过滤器
import "./filters";

//引入VueRouter
import VueRouter from "vue-router";

// 引入图片懒加载插件
import VueLazyload from "vue-lazyload";

// 引入store
import store from "./store";

//引入路由器
import router from "./router"; //路由器配置在第三号

Vue.use(ElementUI);

//懒加载配置
import loading from "./common/imgs/loading.gif";
import error from "./common/imgs/error.gif";

Vue.use(VueLazyload, {
	error, //图片加载出错显示的图片
	loading, //图片加载中使用的图片
});

//应用插件
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
	store,
	beforeCreate() {
		Vue.prototype.$bus = this; // 安装全局事件总线，$bus就是当前应用的vm
	},
}).$mount("#app");
