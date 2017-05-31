module.exports = function (component, view) {
	// spawn a query-able mini html document
	const d = document.implementation.createHTMLDocument()
	d.body.innerHTML = component.template(opts)

	const f = (children) => {
		for (const child of children) {
			const name = child.nodeName.toLowerCase()
			if (this._components.has(name)) {
				const component = this._components.get(name)

				// for convenience
				const opts = {}
				for (const attr of child.attributes) opts[attr.name] = attr.value
				child.opts = opts

				const view = {}
				component.script.call(child, view, this._bus)

				child.innerHTML = component.template(view)

				f(child)
			}
		}
	}

	f(d.body.children, view)

	return d.body.innerHTML
}
