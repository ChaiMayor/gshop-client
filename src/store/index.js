// 该文件用于创建 Vuex 中最为核心的 store

// 引入 Vue 核心库
import Vue from "vue";
// 引入Vuex
import Vuex from "vuex";
// 应用 Vuex 插件
Vue.use(Vuex);
// 引入外部文件
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import state from "./state";

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	getters,
	state,
});
