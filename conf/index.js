const path = require('path')

/**
 * outputDir 导出路径
 * cacheDir 缓存路径
 */

module.exports.config = {
	outputDir: path.join(__dirname, '../output/'),
	cacheDir: path.join(__dirname, '../cache/')
}