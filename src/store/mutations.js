import Vue from "vue";
import {
	RECEIVE_ADDRESS,
	RECEIVE_SHOPS,
	RECEIVE_CATEGORYS,
	RECEIVE_USER_INFO,
	RESET_USER_INFO,
	RECEIVE_SHOP_GOODS,
	RECEIVE_SHOP_RATINGS,
	RECEIVE_SHOP_INFO,
	INCREMENT_FOOD_COUNT,
	DECREMENT_FOOD_COUNT,
	CLEAR_CARTS_SHOP,
	RECEIVE_SEARCH_SHOP,
} from "./mutations-types";

export default {
	// { address } 传入的是个对象,解构赋值提取出来
	[RECEIVE_ADDRESS](state, { address }) {
		state.address = address;
	},
	[RECEIVE_SHOPS](state, { shops }) {
		state.shops = shops;
	},
	[RECEIVE_CATEGORYS](state, { categorys }) {
		state.categorys = categorys;
	},
	[RECEIVE_USER_INFO](state, userInfo) {
		state.userInfo = userInfo;
	},
	[RESET_USER_INFO](state) {
		state.userInfo = {};
	},

	[RECEIVE_SHOP_GOODS](state, goods) {
		state.goods = goods;
	},
	[RECEIVE_SHOP_RATINGS](state, ratings) {
		state.ratings = ratings;
	},
	[RECEIVE_SHOP_INFO](state, info) {
		state.info = info;
	},

	[INCREMENT_FOOD_COUNT](state, { food }) {
		if (!food.count) {
			Vue.set(food, "count", 1);
			// 添加属性,将其添加进vuex管理
			state.cartFoods.push(food);
		} else {
			food.count++;
		}
	},
	[DECREMENT_FOOD_COUNT](state, { food }) {
		if (food.count) {
			food.count--;
			// 当数量为0时,将其剔除vuex管理
			if (food.count === 0) {
				state.cartFoods.splice(state.cartFoods.indexOf(food), 1);
			}
		}
	},
	// 清空购物车
	[CLEAR_CARTS_SHOP](state) {
		// 将所有的数量变为0
		state.cartFoods.forEach(food => {
			food.count = 0;
		});
		// 清空购物车数组
		state.cartFoods = [];
	},
	// 更新搜索的商家信息列表
	[RECEIVE_SEARCH_SHOP](state, searchShops) {
		state.searchShops = searchShops;
	},
};
