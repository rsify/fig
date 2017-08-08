import fs from 'fs'
import http from 'http'
import path from 'path'

import getPort from 'get-port'
import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	const port = await getPort()
	const server = await new Promise(resolve => {
		const s = http.createServer((req, res) => {
			res.setHeader('Access-Control-Allow-Origin', '*')
			const p = path.join(__dirname, 'fixtures', req.url)
			try {
				const content = fs.readFileSync(p)
				res.end(content, 'utf-8')
			} catch (err) {
				res.writeHead(404)
				res.end(err.toString())
			}
		}).listen(port, () => {
			resolve(s)
		})
	})
	server.unref()

	const {app, $} = await prepare(__dirname)

	app.use(`http://localhost:${port}/Component.fig.js`)

	app.mount('#app', 'component')
	await new Promise(resolve => {
		app.on('fig ready', () => {
			const $x = $('#x')
			t.false($x === null)
			t.is($x.innerHTML, 'heck')
			resolve()
		})
	})
})
