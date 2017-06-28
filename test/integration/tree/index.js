import test from 'ava'

import bundler from '../helpers/bundler'
import embed from '../helpers/embed-script'
import makeDOM from '../helpers/make-dom'

test(async t => {
	const {window} = await makeDOM()
	const bundle = await bundler('test/integration/tree/_app.js')
	embed(window, bundle)
	const app = window.app

	t.true(Array.isArray(app._tree.children))
	t.is(app._tree.name, 'component')
	t.is(app._tree.children.length, 3)
	let i = 3
	while (i--) {
		t.is(app._tree.children[i].name, 'nested-component')
		t.is(app._tree.children[i].children.length, 0)
	}
})
