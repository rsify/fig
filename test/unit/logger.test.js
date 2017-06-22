import test from 'ava'

import logging from '../../src/internal/logger'

test.beforeEach(t => {
	logging.enabled = true

	t.context.calls = []
	t.context.log = logging('things', (...args) => {
		t.context.calls.push(args)
	})
})

test.serial('enabled/disabled', t => {
	const log = t.context.log

	log.success('hello')
	t.is(t.context.calls.length, 1, 'true')

	logging.enabled = false
	log.success('we should be hidden')
	t.is(t.context.calls.length, 1, 'false')
})

test.serial('works', t => {
	const log = t.context.log

	const sentence = 'this is a 69 word long sentence'
	log.success(sentence.split(' '))
	t.is(t.context.calls.length, 1)
	t.is(t.context.calls[0][0], '%cfig things')
	t.is(t.context.calls[0][2].join(' '), sentence)
})
