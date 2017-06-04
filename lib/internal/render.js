const genId = require('./genId')

function walk (element, refs) {
	for (const child of element.children) {
		const childName = child.nodeName.toLowerCase()
		const attrs = {}

		for (const attr of child.attributes) {
			const name = attr.name
			const value = attr.value

			if (value.indexOf('fig-ref-') === 0) {
				const id = value.slice('fig-ref-'.length)
				if (refs[id]) attrs[name] = refs[id]

				// remove all ugly refs from DOM
				child.removeAttribute(name)
			}

			if (!attrs[name]) attrs[name] = value

			// TODO event listener
			if (name.indexOf('@') === 0) {}
		}

		if (this._components.has(childName)) {
			this._render(child, attrs)
		} else walk.call(this, child, refs)
	}
}

module.exports = function (element, attrs) {
	const name = element.nodeName.toLowerCase()
	const component = this._components.get(name)

	const view = {}
	element.attrs = attrs
	component.script.call(element, view, this._bus)

	const refs = {}
	for (const key in view) {
		if (view.hasOwnProperty(key)) {
			const prop = view[key]
			if (['function', 'object'].indexOf(typeof prop) !== -1) {
				const id = genId()
				prop.toJSON = () => 'fig-ref-' + id
				refs[id] = prop
			}
		}
	}

	element.innerHTML = component.template(view)


	walk.call(this, element, refs)

	return element
}
