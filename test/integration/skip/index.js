import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	const {$, app} = await prepare(__dirname)

	const ref = $('.x')

	t.truthy(app.ref.potato)
	t.is(app.ref.potato, ref)
	t.is($('.y').innerHTML, '42')

	app.state.foo = 69

	// Should not touch that part of the DOM
	t.is($('.y').innerHTML, '42')

	// Should keep the same reference
	t.is(app.ref.potato, ref)
})
