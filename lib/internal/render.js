module.exports = function (component, view) {
	const f = (children) => {
		for (const child of children) {
			const name = child.nodeName.toLowerCase()
			if (this._components.has(name)) {
				const component = this._components.get(name)

				// for convenience
				const opts = {}
				for (const attr of child.attributes)
					opts[attr.name] = attr.value

				child.opts = opts

				const view = {}
				component.script.call(child, view, this._bus)

				child.innerHTML = component.template(view)

				f(child.children)
			}
		}
	}

	// spawn a document fragment to be inserted into real document after render
	const d = document.createDocumentFragment()
	d.append(new component.constructor())

	f(d.children, view)

	return d
}
