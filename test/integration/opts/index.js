import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	const {app, window} = await prepare('test/integration/opts/_app.js')

	const state = app.state
	const opts = window.passedOpts

	// Due to the way pugjs works, we need to cast booleans & numbers
	// to get predictable behaviour
	// More here: https://pugjs.org/language/attributes.html
	t.is(Boolean(opts.bool), state.bool)
	t.is(parseInt(opts.num, 10), state.num)
	t.is(opts.str, state.str)
	t.is(opts.fn, state.fn)
	t.is(opts.arr, state.arr)
	t.is(opts.obj, state.obj)
})
