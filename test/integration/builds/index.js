import test from 'ava'

import makeDOM from '../../helpers/make-dom'

test('fig.js exports fig', async t => {
	const dom = await makeDOM()
	t.is(typeof dom.window.fig, 'function')
})

test('fig.min.js exports fig', async t => {
	const html = '<script src="dist/fig.min.js"></script>\n' +
		'<script>window.ready()</script>'

	const dom = await makeDOM(html)
	t.is(typeof dom.window.fig, 'function')
})
