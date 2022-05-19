const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

export default {
	plugins: [new NodePolyfillPlugin()],
};
