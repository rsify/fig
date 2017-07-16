/* eslint no-use-before-define: "off" */

import {
	hasOwnProperty,
	randString,
	walk
} from './util'
import logging from './logger'
import FigError from './error'

const log = logging('render')

// eslint-disable-next-line max-params
function walkElements(element, slotted, components, refs, subtree, bus) {
	for (const child of element.children) {
		const childName = child.nodeName.toLowerCase()
		const attrs = {}

		// Workaround a jsdom bug
		const arr = Array.from(child.attributes)
		for (const attr of arr) {
			const name = attr.name
			const value = attr.value

			if (value.indexOf('fig-ref-') === 0) {
				const id = value.slice('fig-ref-'.length)
				if (refs[id]) {
					attrs[name] = refs[id]
				}

				// Remove all ugly refs from DOM
				child.removeAttribute(name)
			}

			if (!attrs[name]) {
				attrs[name] = value
			}

			if (name.indexOf('@') === 0) {
				const fn = attrs[name]
				if (typeof fn !== 'function') {
					throw new FigError('@event listener must be a function',
						'check your @handlers')
				}

				child['on' + name.slice(1)] = e => {
					e.preventDefault()
					fn(e)
				}
			}
		}

		if (childName === 'slot') {
			child.parentNode.replaceChild(slotted.shift(), child)
		}

		if (components.has(childName)) {
			subtree.children.push(render(child, attrs, components, bus))
		} else {
			walkElements(child, slotted, components, refs, subtree, bus)
		}
	}
}

const ref = prop => {
	const id = randString(10)

	Object.defineProperty(prop, 'toJSON', {
		configurable: true,
		enumerable: false,
		value: () => 'fig-ref-' + id
	})

	return id
}

const render = (element, opts, components, bus) => {
	log.info('rendering', element, 'with opts', opts)

	const name = element.nodeName.toLowerCase()
	const component = components.get(name)

	const subtree = {}
	subtree.name = name
	subtree.$el = element
	subtree.children = []

	const view = {}
	component.script.call(element, view, opts, bus)

	const refs = {}
	walk(o => {
		for (const key in o) {
			if (hasOwnProperty(o, key)) {
				const prop = o[key]
				if (['function', 'object'].indexOf(typeof prop) !== -1 &&
					prop !== null) {
					const id = ref(prop)
					refs[id] = prop
				}
			}
		}
	}, view)

	const childrenArr = Array.from(element.children)
	const slotted = childrenArr.map(x => x.cloneNode(true))
	element.innerHTML = component.template(view)
	walkElements(element, slotted, components, refs, subtree, bus)

	return subtree
}

export default render
