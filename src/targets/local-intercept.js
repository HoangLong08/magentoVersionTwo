const componentOverrideMapping = require('./componentOverrideMapping');
const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');

module.exports = targets => {
	targets.of("@magento/venia-ui").routes.tap(routes => {
		routes.push({
			name: "BrandList",
			pattern: "/brand.html",
			path: require.resolve("../components/brands/index.js")
		})
		routes.push({
			name: "BrandDetails",
			pattern: "/brand/:brandUrl",
			path: require.resolve("../components/branddetails/index.js")
		})
		routes.push({
			name: "BrandCategory",
			pattern: "/brand/category/:categoryUrl",
			path: require.resolve("../components/category/index.js")
		})


		// return routes;
	});
	targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
		new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
	})
}