import axios from "axios";

export default function ajax(url = "", data = {}, type = "GET") {
	return new Promise((resolve, reject) => {
		// 用于接收请求完返回的promise对象
		let promise = null;
		if (type.toLowerCase() === "get") {
			// 用于进行拼串
			let dataStr = "";
			// 将所有的key和value保存为字符串
			Object.keys(data).forEach(key => {
				dataStr += key + "=" + data[key] + "&";
			});
			// 将url和query参数拼接,截取到最后一个&符
			dataStr = url + "?" + dataStr.substring(0, dataStr.lastIndexOf("&"));
			// 发送axios的get请求
			promise = axios.get(dataStr);
		} else if (type.toLowerCase() === "post") {
			// 发送axios的post请求
			promise = axios.post(url, data);
		}
		// 获得到返回的promise对象判断状态
		promise
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
}
