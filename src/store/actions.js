import reqAPI from "../api";
import {
	RECEIVE_ADDRESS,
	RECEIVE_SHOPS,
	RECEIVE_CATEGORYS,
	RECEIVE_USER_INFO,
	RESET_USER_INFO,
	RECEIVE_SHOP_GOODS,
	RECEIVE_SHOP_RATINGS,
	RECEIVE_SHOP_INFO,
	CLEAR_CARTS_SHOP,
	RECEIVE_SEARCH_SHOP,
} from "./mutations-types";
export default {
	// 获取地址信息
	async receive_address({ commit, state: { longitude, latitude } }) {
		// 请求回来数据
		const result = await reqAPI.getAddress(`/${longitude},${latitude}`);
		// 更改到state
		if (result.code === 0) {
			const address = result.data;
			commit(RECEIVE_ADDRESS, { address });
		}
	},
	// 获取商品列表信息
	async receive_shops({ commit, state: { longitude, latitude } }) {
		// 请求回来数据
		const result = await reqAPI.getShopList(longitude, latitude);
		// 更改到state
		if (result.code === 0) {
			const shops = result.data;
			commit(RECEIVE_SHOPS, { shops });
		}
	},
	// 获取食物分类信息
	async receive_categorys({ commit }) {
		// 请求回来数据
		const result = await reqAPI.getFoodCategoryList();
		// 更改到state
		if (result.code === 0) {
			const categorys = result.data;
			commit(RECEIVE_CATEGORYS, { categorys });
		}
	},
	// 异步获取用户登录信息
	async receive_user_info({ commit }) {
		const result = await reqAPI.getUserInfo();
		if (result.code === 0) {
			commit(RECEIVE_USER_INFO, result.data);
		}
	},
	// 异步退出登录
	async reset_user_info({ commit }) {
		let result = await reqAPI.userLogout();
		if (result.code === 0) {
			commit(RESET_USER_INFO);
		}
	},
	// 异步请求shop_goods数据
	async receive_shop_goods({ commit }, callback) {
		let result = await reqAPI.reqShopGoods();
		if (result.code === 0) {
			commit(RECEIVE_SHOP_GOODS, result.data);
			// 数据请求完毕执行回调函数
			callback && callback();
		}
	},
	// 异步请求shop_ratings数据
	async receive_shop_ratings({ commit }, callback) {
		let result = await reqAPI.reqShopRatings();
		if (result.code === 0) {
			commit(RECEIVE_SHOP_RATINGS, result.data);
			// 数据请求完毕执行回调函数
			callback && callback();
		}
	},
	// 异步请求shop_info数据
	async receive_shop_info({ commit }) {
		let result = await reqAPI.reqShopInfo();
		if (result.code === 0) {
			commit(RECEIVE_SHOP_INFO, result.data);
		}
	},
	// 清空购物车内容
	[CLEAR_CARTS_SHOP]({ commit }) {
		commit(CLEAR_CARTS_SHOP);
	},
	// 异步请求searchShop数据
	async searchShops({ commit, state: { longitude, latitude } }, keyWord) {
		let geohash = `${longitude},${latitude}`;
		let result = await reqAPI.getShopList_Search(geohash, keyWord);
		if (result.code === 0) {
			commit(RECEIVE_SEARCH_SHOP, result.data);
		}
	},
};
