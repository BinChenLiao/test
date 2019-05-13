
let path = require('path');

let multiPages = require('./config/multi.pages'); // 获取多页面的配置

let proConfig = require('./config/pro.config'); // 获取生产环境的配置

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
console.log(multiPages)
console.log(process.env.NODE_ENV)
module.exports = {
	publicPath: './',
	// baseUrl: './', // 基本路径
	assetsDir: 'static', // 静态文件
	outputDir: 'dist', // 输出文件目录
  pages: multiPages,
	productionSourceMap: false, // 关闭SourceMap
	// 去掉console.log
	configureWebpack: config => {
		require('vux-loader').merge(config, {
				options: {},
				plugins: ['vux-ui']
		})
		if (process.env.NODE_ENV === "production") {
			const plugins = [];
			plugins.push(proConfig); // 打包忽略警告以及console.log
			// plugins.push(
			// 	new CompressionWebpackPlugin({
			// 		filename: '[path].gz[query]',
			// 		algorithm: 'gzip',
			// 		test: productionGzipExtensions,
			// 		threshold: 10240,
			// 		minRatio: 0.8
			// 	})
			// );
			config.plugins = [
				...config.plugins,
				...plugins
			];
		}
	},
	lintOnSave: true,
  chainWebpack: config => {
		// 起别名
		config.resolve.alias
		.set('@', path.join(__dirname, 'src'))
		.set('@utils', path.join(__dirname, 'src/utils'))
		.set('@components', path.join(__dirname, 'src/components'))
		config.module
		.rule('vue')
		.use('vue-loader')
		.loader('vue-loader')
		.tap(options => {
			console.log(options)
			// 修改它的选项...
			return options
		})
		// 压缩图片
		// config.module
		// 	.rule('images')
		// 	.use('url-loader')
		// 	.loader('url-loader')
		// 	.tap(options => {
		// 		// 修改它的选项...
		// 		options.limit = 100
		// 		return options
		// 	})
		// Object.keys(multiPages).forEach((entryName) => {
		// 	if(process.env.NODE_ENV === "production") {
		// 		config.plugin("extract-css").tap(() => [{
		// 			template: entryName, // 模板路径
		// 			filename: entryName + '.html',
		// 			chunks: [entryName],
		// 			inject: true,
		// 			hash: true,
		// 		}]);
		// 	}
		// });
	},
	// css: {
	// 	loaderOptions: {
	// 		less: {
	// 			data: `
	// 			$baseUrl: "/";
	// 			@import '@/assets/less/webapp.css';
	// 			`
	// 		}
	// 	}
	// },
  devServer: {
    proxy: {
      '/gateway': {
        target: 'https://m.maizuo.com/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        secure: false
      }
    }
  }
}