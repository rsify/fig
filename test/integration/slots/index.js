import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	const {$, $$} = await prepare(__dirname)

	// Single slot
	t.is($$('.p').length, 1)
	t.is($('.p').parentNode, $('nested#single'))
	t.is($('nested#single').children.length, 1)

	// Multiple & nested slots
	const $multi = $('multi-nested#multi')
	t.is($multi.children.length, 2)
	t.is($multi.children[0], $('.a'))
	t.is($('.a').innerHTML, '1')

	t.is($('.one').children.length, 2)
	t.is($('.one').children[0], $('.b'))
	t.is($('.b').innerHTML, '2')

	t.is($('.two').children.length, 1)
	t.is($('.two').children[0], $('.c'))
	t.is($('.c').innerHTML, '3')
})
