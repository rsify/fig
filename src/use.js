import {noop} from './internal/util'
import logging from './internal/logger'
import FigError from './internal/error'

const log = logging('use')

export default (comp, registry) => {
	if (!Array.isArray(comp)) {
		comp = [comp]
	}

	for (const component of comp) {
		// Skip if already registered
		if (registry.has(component.name)) {
			log.warn(`component ${component.name} has already been registered`)
			continue
		}

		const name = component.name
		const template = component.template
		const style = component.style || ''
		const script = component.default || noop

		if (typeof name === 'undefined' || name === null) {
			throw new FigError('component name is not specified',
				'check label tag in component')
		}

		if (typeof template === 'undefined' || template === null) {
			throw new FigError(`component ${name} is missing template`,
				'template tag is required in every component')
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
