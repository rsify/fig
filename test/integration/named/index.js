import test from 'ava'

import prepare from '../helpers/prepare'

test(async t => {
	const {$$} = await prepare('test/integration/named/_app.js')

	t.is($$('.c').length, 3)
})
