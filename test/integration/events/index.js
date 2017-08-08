import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	const {app, $} = await prepare(__dirname)
	const events = {
		'fig update': 0,
		'fig update pre': 0,
		'fig ready': 0
	}

	for (const event of Object.keys(events)) {
		app.on(event, () => events[event]++)
	}

	// Initial state
	t.deepEqual(events, {
		'fig update': 0,
		'fig update pre': 0,
		'fig ready': 0
	})

	// Ready after mount
	app.mount('#app', 'component')
	t.deepEqual(events, {
		'fig update': 0,
		'fig update pre': 0,
		'fig ready': 1
	})

	// State updates
	app.on('fig update pre', () => {
		t.is($('div').innerHTML, 'pre')
	})
	app.on('fig update', () => {
		t.is($('div').innerHTML, 'post')
	})
	app.state.x = 'post'

	t.deepEqual(events, {
		'fig update': 1,
		'fig update pre': 1,
		'fig ready': 1
	})
})
