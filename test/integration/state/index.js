import test from 'ava'

import prepare from '../../helpers/prepare'

test('simple prop', async t => {
	const {$, app} = await prepare(__dirname)

	t.is($('#single').innerHTML, '42')
	app.state.single = 69
	t.is($('#single').innerHTML, '69')
})

test('iterable prop', async t => {
	const {$$, app} = await prepare(__dirname)

	t.is($$('.li').length, 2)
	app.state.arr.push(2)
	t.is($$('.li').length, 3)
	app.state.arr.pop()
	t.is($$('.li').length, 2)
	app.state.arr.splice(0)
	t.is($$('.li').length, 0)
})

test('nested prop', async t => {
	const {$, app} = await prepare(__dirname)

	t.is($('#nest').innerHTML, '42')
	app.state.nest.foo = 69
	t.is($('#nest').innerHTML, '69')
})
