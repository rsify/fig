import {noop} from './internal/util'
import logging from './internal/logger'

const log = logging('use')

export default (comp, registry) => {
	if (!Array.isArray(comp)) {
		comp = [comp]
	}

	for (const component of comp) {
		// Skip if already registered
		if (registry.has(component.name)) {
			throw new Error(`component already registered (${component.name})`)
		}

		const name = component.name
		const template = component.template
		const style = component.style || ''
		const script = component.default || noop

		if (typeof name === 'undefined' || name === null) {
			throw new Error('component name is not specified')
		}

		if (typeof template === 'undefined' || template === null) {
			throw new Error(`component ${name} is missing template`)
		}

		let $style = document.querySelector('#fig-style-tag')
		if (!$style) {
			$style = document.createElement('style')
			$style.id = 'fig-style-tag'
			document.getElementsByTagName('head')[0].appendChild($style)
		}

		// Default display style
		const s = component.name + ' {display: inline-block;}\n' + style
		$style.innerHTML += s + '\n'

		registry.set(component.name, {
			name,
			template,
			style,
			script
		})

		log.success('registered component', component.name)
	}
}
