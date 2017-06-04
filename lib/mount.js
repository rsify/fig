module.exports = function ($el, componentName) {
	if (typeof $el === 'string') $el = document.querySelector($el)
	if (!$el) throw 'invalid element selector'

	const component = this._components.get(componentName)
	if (!$el) throw 'invalid component name'

	const $replacement = document.createElement(componentName)
	const tree = {}
	this._root = this._render($replacement, this.state)
	$el.parentNode.replaceChild($replacement, $el)

	return $replacement
}
