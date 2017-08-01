import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	// Root level
	const {$, app} = await prepare(__dirname)

	const rootRef = $('.x')

	t.truthy(app.ref.potato)
	t.is(app.ref.potato, rootRef)
	t.is($('.y').innerHTML, '42')

	app.state.foo = 69

	// Should not touch that part of the DOM
	t.is($('.y').innerHTML, '42')

	// Should keep the same reference
	t.is(app.ref.potato, rootRef)

	// Nested
	const nestedRef = $('.snek')

	t.truthy(app.ref.nested)
	t.is(app.ref.nested, nestedRef)

	t.is($('.sted').children.length, 1)
	t.is($('.sted').children[0], $('.snek'))

	t.is($('.snek').innerHTML, '42')

	app.state.bar = 69
	t.is($('.snek').innerHTML, '42')
	t.is(app.ref.nested, nestedRef)
})
