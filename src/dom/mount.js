import logging from '../class/logger'
import FigError from '../class/error'

const log = logging('mount')

export default ($el, component) => {
	if (typeof $el === 'string') {
		$el = document.querySelector($el)

		if (!$el) {
			throw new FigError('invalid element selector',
				'check first argument of app.mount')
		}
	}

	if (!($el instanceof HTMLElement)) {
		throw new FigError('invalid element specified',
			'check first argument of app.mount')
	}

	if (!component) {
		throw new FigError('specified component doesn\'t exist',
			'check second argument of app.mount')
	}

	log.info('attempting to mount component', component.name, 'at element', $el)

	const $root = document.createElement(component.name)
	$el.parentNode.replaceChild($root, $el)

	log.success('replaced', $el, 'with', $root)

	return $root
}
