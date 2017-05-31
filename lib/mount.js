module.exports = function (el, componentName) {
	if (typeof el === 'string') el = document.querySelector(el)
	if (!el) throw 'invalid element selector'

	const component = this._components[componentName]
	if (!el) throw 'invalid component name'

	const replacement = new component.constructor()

	this._tree.root = {
		name: component.name,
		$el: replacement
		data: {}
		parent: null,
		children: []
	}

	replacement.innerHTML = this._render(component, this.state)
	el.parentNode.replaceChild(replacement, el)

	return replacement
}
