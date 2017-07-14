import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	const {$$} = await prepare(__dirname)

	t.is($$('.c').length, 3)
})
