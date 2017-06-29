import test from 'ava'

import logging from '../../src/internal/logger'

test.beforeEach(t => {
	logging.enabled = true

	t.context.calls = {log: [], error: []}
	t.context.log = logging('test', {
		log: (...args) => {
			t.context.calls.log.push(args)
		},
		error: (...args) => {
			t.context.calls.error.push(args)
		}
	})
})

test.serial('enables/disables', t => {
	const log = t.context.log

	// Logging disabled
	log.success('we are visible')
	t.is(t.context.calls.log.length, 1, 'enabled')

	log.error('we are visible')
	t.is(t.context.calls.error.length, 1, 'enabled')

	logging.enabled = false
	// Logging enabled

	log.success('we are hidden')
	t.is(t.context.calls.log.length, 1, 'disabled')

	log.error('we are visible regardless')
	t.is(t.context.calls.error.length, 2, 'disabled')
})

test.serial('logs', t => {
	const log = t.context.log

	const sentence = 'this is a 69 word long sentence'

	log.success(sentence.split(' '))
	t.is(t.context.calls.log.length, 1)
	t.is(t.context.calls.log[0][0], '%cfig test')
	t.not(t.context.calls.log[0][1].indexOf('#11cc00'), -1, 'correct colour')
	t.is(t.context.calls.log[0][2].join(' '), sentence)

	log.error(sentence.split(' '))
	t.is(t.context.calls.error.length, 1)
	t.is(t.context.calls.error[0][0], '%cfig test')
	t.is(t.context.calls.error[0][2].join(' '), sentence)
})
