import fs from 'fs'
import path from 'path'
import {promisify} from 'util'
import {VirtualConsole, JSDOM} from 'jsdom'

export default async html => {
	if (!html) {
		const p = path.resolve(__dirname, 'base.html')
		html = await promisify(fs.readFile)(p)
	}

	const virtualConsole = new VirtualConsole()
	virtualConsole.sendTo(console)

	const dom = new JSDOM(html, {
		virtualConsole,
		runScripts: 'dangerously',
		resources: 'usable'
	})

	return new Promise(resolve => {
		dom.window.ready = resolve.bind(null, dom)
	})
}
