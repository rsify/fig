import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	const {app, $} = await prepare(__dirname)
	const events = {
		'button click': 0
	}

	for (const event of Object.keys(events)) {
		app.on(event, () => events[event]++)
	}

	t.is(events['button click'], 0)
	$('button').click()
	t.is(events['button click'], 1)
})
