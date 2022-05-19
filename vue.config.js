const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	configureWebpack: {
		devServer: {
			port: 8089, //端口号
			// open: true, //自动打开浏览器
			host: "localhost", //使用的域名
		},
	},
	devServer: {
		proxy: {
			"/api": {
				//匹配所有以'/api'开头的请求路径
				target: "http://localhost:4000", //代理目标的基础路径
				changeOrigin: true,
				pathRewrite: { "/api": "" }, //发送请求时,替换掉匹配前缀
			},
			/*
				changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
				changeOrigini设置为falsef时，服务器收到的请求头中的host为：localhost:8080
				changeOriging默认值为true
			*/
		},
	},
});
