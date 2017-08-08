const fs = require('fs')
const p = require('util').promisify

const Listr = require('listr')
const babel = require('babel-core')
const rollup = require('rollup')
const uglify = require('uglify-js')

const pkg = require('../package.json')
const config = require('./config')

const banner = `
// fig.js v${pkg.version}
// https://github.com/nikersify/fig
// released under the MIT license

`.split('\n').slice(1).join('\n')

const tasks = new Listr([
	{
		title: 'Rollup dependencies',
		task: async ctx => {
			ctx.bundle = await rollup.rollup(config)
		}
	},
	{
		title: 'Generate code',
		task: async ctx => {
			ctx.code = ctx.bundle.generate(config).code
		}
	},
	{
		title: 'Babel',
		task: async ctx => {
			ctx.babelled = babel.transform(ctx.code, {
				babelrc: false,
				presets: [
					['env', {target: '> 0.25%', modules: false}]
				]
			}).code
		}
	},
	{
		title: 'Uglify',
		task: async ctx => {
			const ugly = uglify.minify(ctx.babelled)
			if (ugly.error) {
				throw ugly.error
			}
			ctx.uglified = ugly.code
		}
	},
	{
		title: 'Write',
		task: async (ctx, task) => {
			if (!fs.existsSync('./dist')) {
				await p(fs.mkdir)('./dist')
			}

			ctx.babelled = banner + ctx.babelled
			ctx.uglified = banner + ctx.uglified

			await p(fs.writeFile)(config.dest, ctx.babelled)
			await p(fs.writeFile)(config.dest
				.replace(/\.js$/, '.min.js'), ctx.uglified)

			const tokB = x => Math.ceil(Buffer.byteLength(x) / 1024)
			const sizeNormal = tokB(ctx.babelled)
			const sizeMinified = tokB(ctx.uglified)

			task.title = `${task.title} (fig.js ${sizeNormal}kB) ` +
				`(fig.min.js ${sizeMinified}kB)`
		}
	}
])

tasks.run().catch(err => {
	console.error(err.stack)
	process.exit(1) // eslint-disable-line unicorn/no-process-exit
})
