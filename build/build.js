const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')

const config = require('./config')

rollup.rollup(config).then(bundle => {
	bundle.write(config)
}).catch(console.error)
