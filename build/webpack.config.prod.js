const path = require('path');
const webpack = require('webpack')

process.env.NODE_ENV = 'production'; // 对于vue-loader代码有效

module.exports = {
	entry: './index.js', // 这里竟然这样写
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'vue-pressure.min.js',
		library: 'VuePressure',
		libraryTarget: 'umd',
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	externals: {
		vue: 'vue',
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				include: [path.resolve(__dirname, '../src')]
			}, {
				test: /\.js$/,
				loader: 'babel-loader',
				include: [path.resolve(__dirname, '../src')]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'), // 对于src代码有效
	    }),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
	],
}