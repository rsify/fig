import FigError from './internal/error'
import logging from './internal/logger'
import parse from './internal/parse'
import pull from './internal/pull'
import {noop} from './internal/util'

const log = logging('use')

const register = (component, registry) => {
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

export default (input, registry) => {
	if (typeof input === 'string') {
		const url = input
		return pull(url).then(res => {
			const exports = parse(res)
			register(exports, registry)
		})
	}

	if (typeof input !== 'object') {
		throw new FigError('invalid component descriptor',
			'first argument of app.use must be a component object or ' +
			'a url-like string')
	}

	// Skip if already registered
	if (registry.has(input.name)) {
		log.warn(`input ${input.name} has already been registered`)
		return
	}

	register(input, registry)
}
