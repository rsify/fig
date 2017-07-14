import css from 'css'
import isEqual from 'lodash.isequal'
import test from 'ava'

import prepare from '../../helpers/prepare'

test(async t => {
	const {app, $} = await prepare(__dirname)
	const ast = css.parse($(`#fig-${app._id}-style`).innerHTML)

	const rules = ast.stylesheet.rules
	t.is(rules.length, 6)

	for (const selector of ['main', 'one', 'two']) {
		const displayRules = rules.filter(x => {
			if (isEqual(x.selectors, [selector]) &&
				x.declarations[0].property === 'display') {
				return true
			}
			return false
		})

		const colorRules = rules.filter(x => {
			if (isEqual(x.selectors, [selector]) &&
				x.declarations[0].property === 'color') {
				return true
			}
			return false
		})

		t.is(displayRules.length, 1)
		t.is(colorRules.length, 1)
		t.pass(selector)
	}
})
