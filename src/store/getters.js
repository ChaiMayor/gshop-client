export default {
	totalCount(state) {
		return state.cartFoods.reduce((totalPre, food) => totalPre + food.count, 0);
	},
	totalPrice(state) {
		return state.cartFoods.reduce((totalPre, food) => totalPre + food.count * food.price, 0);
	},
};
