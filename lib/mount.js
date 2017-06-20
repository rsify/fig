module.exports = function ($el, componentName) {
	if (typeof $el === 'string') $el = document.querySelector($el)
	if (!$el) throw 'invalid element selector'

	const component = this._components.get(componentName)
	if (!component) throw 'invalid component name'

	this._log.info('mount', 'attempting to mount component', component.name,
		'at element', $el)

	this._$root = document.createElement(componentName)
	$el.parentNode.replaceChild(this._$root, $el)

	this._log.success('mount', 'mounted app to', this._$root)
	this.update()
}
