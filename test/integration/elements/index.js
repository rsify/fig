import test from 'ava'

import prepare from '../helpers/prepare'

test(async t => {
	const {$} = await prepare('test/integration/elements/_app.js')

	t.is($('body').children.length, 1)
	const comp = $('body').children[0]
	t.is(comp.nodeName.toLowerCase(), 'component')
	t.is(comp.children.length, 1)
	const nested = comp.children[0]
	t.is(nested.nodeName.toLowerCase(), 'nested')
	t.is(nested.children.length, 1)
	t.is(nested.children[0], $('.n'))
	t.is($('.n').innerHTML, 'hello!')

	t.pass()
})
