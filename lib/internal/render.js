const genId = require('./genId')

function walk (element, refs, subtree) {
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

			if (name.indexOf('@') === 0) {
				const fn = attrs[name]
				if (typeof fn !== 'function')
					throw '@event listener must be a function'

				child.addEventListener(name.slice(1), function (e) {
					e.preventDefault()
					fn(e)
				})
			}
		}

		if (this._components.has(childName)) {
			subtree.children.push(this._render(child, attrs))
		} else walk.call(this, child, refs, subtree)
	}
}

const ref = (prop) => {
	const id = genId()

	Object.defineProperty(prop, 'toJSON', {
		configurable: true,
		enumerable: false,
		value: () => 'fig-ref-' + id
	})

	return id
}

module.exports = function (element, opts) {
	const name = element.nodeName.toLowerCase()
	const component = this._components.get(name)

	const subtree = {}
	subtree.name = name
	subtree.$el = element
	subtree.children = []

	const view = {}
	component.script.call(element, view, opts, this._bus)

	const refs = {}
	const walkRef = (o) => {
		for (const key in o) {
			if (o.hasOwnProperty(key)) {
				const prop = o[key]
				if (['function', 'object'].indexOf(typeof prop) !== -1) {
					const id = ref(prop)

					refs[id] = prop
				}

				if (typeof prop === 'object'){
					walkRef(prop)
				}
			}
		}
	}

	walkRef(view)

	element.innerHTML = component.template(view)

	walk.call(this, element, refs, subtree)

	return subtree
}
