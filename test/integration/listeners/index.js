import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	const {$, window} = await prepare(__dirname)
	const ev = window.eventStore

	t.is(ev.length, 2)

	const clickEv = ev[0]
	t.is(clickEv.type, 'click')
	t.is(clickEv.target, $('.btn'))

	const ctxEv = ev[1]
	t.is(ctxEv.type, 'contextmenu')
	t.is(ctxEv.target, $('.h1'))
})
