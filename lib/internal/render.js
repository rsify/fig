function walk (element, view) {
	for (const child of element.children) {
		const childName = child.nodeName.toLowerCase()
		if (this._components.has(childName)) {
			const opts = {}
			for (const attr of child.attributes)
				opts[attr.name] = attr.value

			this._render(child, opts)
		}

		walk.call(this, child, view)
	}
}

module.exports = function (element, opts) {
	const name = element.nodeName.toLowerCase()
	const component = this._components.get(name)

	const view = {}
	element.opts = opts
	component.script.call(element, view, this._bus)
	element.innerHTML = component.template(view)

	for (const attr of element.attributes)
		element.removeAttribute(attr.name)

	walk.call(this, element, view)

	return element
}
