/**
 * 调用API接口的函数封装
 */
import ajax from "./ajax";
const BASIC_URL = "/api";

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
const getAddress = geohash => ajax(`${BASIC_URL}/position${geohash}`);
// [2、获取食品分类列表](#2获取食品分类列表)
const getFoodCategoryList = () => ajax(`${BASIC_URL}/index_category`);
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
const getShopList = (longitude, latitude) => ajax(`${BASIC_URL}/shops`, { longitude, latitude });
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
const getShopList_Search = (geohash, keyword) => ajax(`${BASIC_URL}/search_shops`, { geohash, keyword });
// [5、获取一次性验证码](#5获取一次性验证码)
const getOnceCode = () => ajax(`${BASIC_URL}/captcha`);
// [6、用户名密码登陆](#6用户名密码登陆)
const useAccountRegister = (name, pwd, captcha) => ajax(`${BASIC_URL}/login_pwd`, { name, pwd, captcha }, "POST");
// [7、发送短信验证码](#7发送短信验证码)
const sendNoteCode = phone => ajax(`${BASIC_URL}/sendcode`, { phone });
// [8、手机号验证码登陆](#8手机号验证码登陆)
const usePhoneCodeRegister = (phone, code) => ajax(`${BASIC_URL}/login_sms`, { phone, code }, "POST");
// [9、根据会话获取用户信息](#9根据会话获取用户信息)
const getUserInfo = () => ajax(`${BASIC_URL}/userinfo`);
// [10、用户登出](#10用户登出)
const userLogout = () => ajax(`${BASIC_URL}/logout`);

// 11、请求shop_goods
const reqShopGoods = () => ajax(`${BASIC_URL}/shop_goods`);
// 12、请求shop_ratings
const reqShopRatings = () => ajax(`${BASIC_URL}/shop_ratings`);
// 13、请求shop_info
const reqShopInfo = () => ajax(`${BASIC_URL}/shop_info`);

export default {
	getAddress,
	getFoodCategoryList,
	getShopList,
	getShopList_Search,
	getOnceCode,
	useAccountRegister,
	sendNoteCode,
	usePhoneCodeRegister,
	getUserInfo,
	userLogout,
	reqShopGoods,
	reqShopRatings,
	reqShopInfo,
};
