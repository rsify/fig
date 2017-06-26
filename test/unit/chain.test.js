import test from 'ava'

import Chain from '../../src/internal/chain'

const CALLCOUNT = 100

const order = calls => {
	let i = CALLCOUNT
	for (const call of calls) {
		if (call !== --i) {
			return false
		}
	}
	return true
}

test('single sync', t => {
	const c = new Chain()
	const calls = []

	c.defer(() => {
		calls.push(0)
	})

	t.is(calls.length, 1, 'calls exactly once')
	t.is(c.stack.length, 0, 'stack is empty')
})

test('multiple sync', t => {
	const c = new Chain()
	const calls = []

	let i = CALLCOUNT
	while (i--) {
		c.defer(() => {
			calls.push(i)
		})
	}

	t.is(calls.length, CALLCOUNT, 'calls correct number of times')

	t.true(order(calls), 'call order is correct')
	t.is(c.stack.length, 0, 'stack is empty')
})

test.cb('single async', t => {
	const c = new Chain()

	const calls = []
	const call = () => {
		calls.push(0)
		return new Promise(resolve => {
			process.nextTick(resolve)
		})
	}

	c.defer(async () => {
		return call()
	})

	const done = () => {
		t.is(calls.length, 1, 'calls exactly once')
		t.is(c.stack[0], done, 'stack has test fn inside')
		t.is(c.stack.length, 1, 'stack has length of 1')

		t.end()
	}

	c.defer(done)
})

test.cb('multiple async', t => {
	const c = new Chain()

	const calls = []
	const call = i => {
		calls.push(i)
		return new Promise(resolve => {
			process.nextTick(resolve)
		})
	}

	let i = CALLCOUNT
	while (i--) {
		const x = i
		c.defer(async () => {
			return call(x)
		})
	}

	const done = () => {
		t.is(calls.length, CALLCOUNT, 'calls correct number of times')
		t.true(order(calls), 'call order is correct')
		t.is(c.stack[0], done, 'stack has test fn inside')
		t.is(c.stack.length, 1, 'stack has length of 1')

		t.end()
	}

	c.defer(done)
})

test.cb('mixed sync and async', t => {
	const c = new Chain()

	const calls = []

	let i = CALLCOUNT
	while (i--) {
		if (Math.random() > 0.5) {
			const x = i
			c.defer(() => {
				calls.push(x)
			})
		} else {
			const x = i
			c.defer(async () => {
				calls.push(x)
				await new Promise(resolve => {
					process.nextTick(resolve)
				})
			})
		}
	}

	const done = () => {
		t.is(calls.length, CALLCOUNT, 'calls correct number of times')
		t.true(order(calls), 'call order is correct')
		t.is(c.stack[0], done, 'stack has test fn inside')
		t.is(c.stack.length, 1, 'stack has length of 1')

		t.end()
	}

	c.defer(done)
})
