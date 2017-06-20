import logging from './internal/logger'

const log = logging('mount')

export default ($el, component) => {
	if (typeof $el === 'string') $el = document.querySelector($el)
	if (!$el) throw 'invalid element selector'

	if (!component) throw 'specified component doesn\'t exist'

	log.info('attempting to mount component', component.name, 'at element', $el)

	const $root = document.createElement(component.name)
	$el.parentNode.replaceChild($root, $el)

	log.success('mount', 'mounted app to', $root)

	return $root
}
