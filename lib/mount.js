module.exports = function ($el, componentName) {
	if (typeof $el === 'string') $el = document.querySelector($el)
	if (!$el) throw 'invalid element selector'

	const component = this._components.get(componentName)
	if (!component) throw 'invalid component name'

	this._$root = document.createElement(componentName)
	$el.parentNode.replaceChild(this._$root, $el)
	this.update()

	return this._$root
}
