const Emitter = require('../../lib/internal/emitter')
const test = require('tape')

test('returns this on all methods', t => {
	const e = new Emitter()

	t.equal(e, e.on(), '.on')
	t.equal(e, e.off(), '.off')
	t.equal(e, e.once(), '.once')
	t.equal(e, e.emit(), '.emit')

	t.end()
})

test('registers listeners', t => {
	const e = new Emitter()

	e.on('one', () => {})
	t.equal(e.listeners.length, 1, 'registers a listener')

	e.on('two', () => {})
	e.on('two', () => {})
	t.equal(e.listeners.length, 3, 'two listeners on one domain')

	e.off('two')
	t.equal(e.listeners.length, 1, 'removes all listeners by name')

	const f = () => {}
	e.on('one', f)
	e.on('one', f)
	e.off('one', f)
	t.equal(e.listeners.length, 1, 'removes listeners by name & fn')

	t.end()
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
	t.equal(i, 3, 'emits to multiple listeners on same domain')

	const obj = { foo: 'bar' }
	e.on('three', (p) => {
		t.ok(p === obj, 'retains reference to object in listener')
	})
	e.emit('three', obj)

	let j = 0
	e.once('four', () => j++)
	e.emit('four')
	e.emit('four')
	e.emit('four')
	t.equal(j, 1, 'once listens only once and unregisters')

	t.end()
})

test('wildcard domain', t => {
	t.test('*', t => {
		const e = new Emitter()
		let i = 0
		e.on('*', () => i++)

		e.emit('text')
		t.equal(i, 1, 'text')

		e.emit('cool-text')
		t.equal(i, 2, 'cool-text')

		t.end()
	})

	t.test('a*b*c', t => {
		const e = new Emitter()
		let i = 0
		e.on('a*b*c', () => i++)

		e.emit('abc')
		t.equal(i, 1, 'abc')

		e.emit('ac')
		t.equal(i, 1, 'ac')

		e.emit('abetac')
		t.equal(i, 2, 'abetac')

		e.emit('alulbec')
		t.equal(i, 3, 'alulbec')

		t.end()
	})

	t.test('*huh*', t => {
		const e = new Emitter()
		let i = 0
		e.on('*huh*', () => i++)

		e.emit('huh', () => i++)
		t.equal(i, 1, 'huh')

		e.emit('phuh')
		t.equal(i, 2, 'phuh')

		e.emit('huhp')
		t.equal(i, 3, 'huhp')

		e.emit('phuhp')
		t.equal(i, 4, 'phuhp')

		e.emit('puup')
		t.equal(i, 4, 'puup')

		t.end()
	})

	t.end()
})
