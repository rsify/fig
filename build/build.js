const fs = require('fs')
const p = require('util').promisify

const Listr = require('listr')
const babel = require('babel-core')
const rollup = require('rollup')
const uglify = require('uglify-js')

const config = require('./config')

// Dirty way to update the listr task list
const immediate = () => new Promise(resolve => {
	setTimeout(resolve, 0)
})

const tasks = new Listr([
	{
		title: 'Rollup dependencies',
		task: async ctx => {
			ctx.bundle = await rollup.rollup(config)
			await immediate()
		}
	},
	{
		title: 'Generate code',
		task: async ctx => {
			ctx.code = ctx.bundle.generate(config).code
			await immediate()
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
			await immediate()
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
			await immediate()
		}
	},
	{
		title: 'Write',
		task: async (ctx, task) => {
			if (!await p(fs.stat)('../dist')) {
				await p(fs.mkdir)('../dist')
			}

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

tasks.run().catch(() => {})
