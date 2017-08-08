const path = require('path')

const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const strip = require('rollup-plugin-strip')

module.exports = {
	context: 'window',
	dest: 'dist/fig.js',
	entry: 'src/index.js',
	exports: 'default',
	external: [
		'assert',
		path.resolve('../src/util/noop-fn.js')
	],
	format: 'umd',
	globals: {
		assert: 'assert'
	},
	moduleName: 'fig',
	onwarn: warning => {
		const muted = [
			'EVAL',
			'UNUSED_EXTERNAL_IMPORT',
			'MISSING_NODE_BUILTINS'
		]

		if (muted.includes(warning.code)) {
			return
		}

		console.warn(
			`${warning.message} - (${warning.code}) - ${warning.url}\n\n\n\n`
		)
	},
	plugins: [
		strip({
			debugger: true,
			functions: ['assert.*'],
			sourceMap: false
		}),
		resolve({
			preferBuiltins: true
		}),
		commonjs()
	],
	sourceMap: false
}
