import FigError from './internal/error'
import logging from './internal/logger'
import parse from './internal/parse'
import pull from './internal/pull'
import {noop} from './internal/util'

const log = logging('use')

const register = (component, defaultName, registry) => {
	const name = defaultName || component.name
	const template = component.template
	const style = component.style || ''
	const script = component.default || noop

	// Skip if already registered
	if (registry.has(name)) {
		log.warn(`input ${name} has already been registered`)
		return
	}

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
	const s = name + ' {display: inline-block;}\n' + style
	$style.innerHTML += s + '\n'

	registry.set(name, {
		name,
		template,
		style,
		script
	})

	log.success('registered component', name)
}

export default (input, name, registry) => {
	if (typeof input === 'string') {
		const url = input
		return pull(url).then(res => {
			const exports = parse(res)
			register(exports, name, registry)
		})
	}

	if (typeof input !== 'object') {
		throw new FigError('invalid component descriptor',
			'first argument of app.use must be a component object or ' +
			'a url-like string')
	}

	register(input, name, registry)
}
