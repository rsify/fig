import test from 'ava'

import Emitter from '../../src/internal/emitter'

test('returns this on all methods', t => {
	const e = new Emitter()

	t.is(e, e.on(), '.on')
	t.is(e, e.off(), '.off')
	t.is(e, e.once(), '.once')
	t.is(e, e.emit(), '.emit')
})

test('registers listeners', t => {
	const e = new Emitter()

	e.on('one', () => {})
	t.is(e.listeners.length, 1, 'registers a listener')

	e.on('two', () => {})
	e.on('two', () => {})
	t.is(e.listeners.length, 3, 'two listeners on one domain')

	e.off('two')
	t.is(e.listeners.length, 1, 'removes all listeners by name')

	const f = () => {}
	e.on('one', f)
	e.on('one', f)
	e.off('one', f)
	t.is(e.listeners.length, 1, 'removes listeners by name & fn')
})

test('emits events', t => {
	const e = new Emitter()

	e.on('one', () => {
		t.pass('no payload')
	})
	e.emit('one')

	let i = 0
	const two = () => i++
	e.on('two', two)
	e.on('two', two)
	e.on('two', two)
	e.emit('two')
	t.is(i, 3, 'emits to multiple listeners on same domain')

	const obj = {foo: 'bar'}
	e.on('three', p => {
		t.is(p, obj, 'retains reference to object in listener')
	})
	e.emit('three', obj)

	let j = 0
	e.once('four', () => j++)
	e.emit('four')
	e.emit('four')
	e.emit('four')
	t.is(j, 1, 'once listens only once and unregisters')
})

test('wildcard domain', t => {
	(() => {
		const e = new Emitter()
		let i = 0
		e.on('*', () => i++)

		e.emit('text')
		t.is(i, 1, 'text')

		e.emit('cool-text')
		t.is(i, 2, 'cool-text')
	})()

	;(() => {
		const e = new Emitter()
		let i = 0
		e.on('a*b*c', () => i++)

		e.emit('abc')
		t.is(i, 1, 'abc')

		e.emit('ac')
		t.is(i, 1, 'ac')

		e.emit('abetac')
		t.is(i, 2, 'abetac')

		e.emit('alulbec')
		t.is(i, 3, 'alulbec')
	})()

	;(() => {
		const e = new Emitter()
		let i = 0
		e.on('*huh*', () => i++)

		e.emit('huh', () => i++)
		t.is(i, 1, 'huh')

		e.emit('phuh')
		t.is(i, 2, 'phuh')

		e.emit('huhp')
		t.is(i, 3, 'huhp')

		e.emit('phuhp')
		t.is(i, 4, 'phuhp')

		e.emit('puup')
		t.is(i, 4, 'puup')
	})()
})
