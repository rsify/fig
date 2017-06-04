module.exports = function (el, componentName) {
	if (typeof el === 'string') el = document.querySelector(el)
	if (!el) throw 'invalid element selector'

	const component = this._components.get(componentName)
	if (!el) throw 'invalid component name'

	const replacement = this._render(document.createElement(componentName), this.state)
	el.parentNode.replaceChild(replacement, el)

	this._tree.root = {
		name: component.name,
		$el: replacement,
		data: {},
		parent: null,
		children: []
	}

	return replacement
}
