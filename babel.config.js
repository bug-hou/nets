module.exports = {
	presets: ["@babel/preset-env", "@babel/preset-typescript"]
	// "presets": [
	// 	[
	// 		"@babel/preset-env",
	// 		{
	// 			"modules": false,
	// 			"useBuiltIns": "usage",
	// 			"corejs": "2.6.10",
	// 			"targets": {
	// 				"ie": 10
	// 			}
	// 		},
	// 		"@babel/preset-typescript"
	// 	]
	// ],
	// "plugins": [
	// 	// 解决多个地方使用相同代码导致打包重复的问题
	// 	["@babel/plugin-transform-runtime"]
	// ],
	// "ignore": ["node_modules/**"]
}
