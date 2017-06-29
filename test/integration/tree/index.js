import test from 'ava'

import prepare from '../helpers/prepare'

test(async t => {
	const {app} = await prepare('test/integration/tree/_app.js')

	t.true(Array.isArray(app._tree.children))
	t.is(app._tree.name, 'component')
	t.is(app._tree.children.length, 3)
	let i = 3
	while (i--) {
		t.is(app._tree.children[i].name, 'nested-component')
		t.is(app._tree.children[i].children.length, 0)
	}
})
