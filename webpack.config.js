var webpack = require('webpack');
var path = require('path');


module.exports = {
	entry: {
		javascript: "./src/app.js",
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.json']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ["babel-loader"]
			}
		]
	},
	watch: true,
	output: {
		filename: "app.js",
		path: path.join(__dirname, 'static')
	}
};
