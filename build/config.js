const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')

const pkg = require('../package.json')

const banner = `
// fig.js v${pkg.version}
// https://github.com/nikersify/fig
// released under the MIT license
`.split('\n').slice(1).join('\n')

module.exports = {
	banner,
	dest: 'dist/fig.js',
	context: 'window',
	entry: 'src/index.js',
	exports: 'default',
	format: 'umd',
	moduleName: 'fig',
	plugins: [
		resolve(),
		commonjs()
	],
	sourceMap: false,
	onwarn: async msg => {
		if (msg.code === 'EVAL') {
			return
		}
		console.warn(msg.message, msg.url)
	}
}
