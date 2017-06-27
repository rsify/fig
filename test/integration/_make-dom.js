import fs from 'fs'
import path from 'path'
import {promisify} from 'util'
import {JSDOM} from 'jsdom'

export default async html => {
	if (!html) {
		const p = path.resolve(__dirname, 'fixtures/base.html')
		html = await promisify(fs.readFile)(p)
	}

	const dom = new JSDOM(html, {
		runScripts: 'dangerously',
		resources: 'usable'
	})

	return new Promise(resolve => {
		dom.window.ready = resolve.bind(null, dom)
	})
}
