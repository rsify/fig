/* eslint no-use-before-define: "off" */
/* eslint max-params: "off" */

import {
	hasOwnProperty,
	randString,
	walk
} from '../util'
import logging from '../class/logger'
import FigError from '../class/error'

const log = logging('render')

const ID_PREFIX = 'fig-id-'

function walkElements(element, slotted, components, identifiers, subtree, bus,
	ref) {
	for (const child of element.children) {
		const childName = child.nodeName.toLowerCase()
		const attrs = {}

		if (child.classList.contains('__fig-skip')) {
			if (!child.attributes.id) {
				throw new FigError('missing id attribute',
					'skip mixin must have an id attribute provided')
			}
			const id = child.attributes.id.value

			const grandchildren = child.children
			if (grandchildren.length !== 1) {
				throw new FigError(
					'incorrect amount of root nodes',
					'skip mixin must only have one root level child')
			}
			const grandchild = grandchildren[0]

			if (ref[id]) {
				// Create temporary node to prevent morphing
				// the child's children.

				const tmpChild = document.createElement('div')
				tmpChild.isSameNode = target => target === ref[id]

				element.replaceChild(tmpChild, child)
			} else {
				ref[id] = grandchild
				element.replaceChild(ref[id], child)
			}

			continue
		}

		const arr = Array.from(child.attributes)
		for (const attr of arr) {
			const name = attr.name
			const value = attr.value

			if (value.indexOf(ID_PREFIX) === 0) {
				const id = value.slice(ID_PREFIX.length)
				if (identifiers[id]) {
					attrs[name] = identifiers[id]
				}

				// Remove all ugly identifiers from DOM
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
			subtree.children.push(render(child, attrs, components, bus, ref))
		} else {
			walkElements(child, slotted, components, identifiers, subtree, bus,
				ref)
		}
	}
}

const identify = prop => {
	const id = randString(10)

	Object.defineProperty(prop, 'toJSON', {
		configurable: true,
		enumerable: false,
		value: () => ID_PREFIX + id
	})

	return id
}

const render = (element, opts, components, bus, ref) => {
	log.info('rendering', element, 'with opts', opts)

	const name = element.nodeName.toLowerCase()
	const component = components.get(name)

	const subtree = {}
	subtree.name = name
	subtree.$el = element
	subtree.children = []

	const view = {}
	component.script.call(element, view, opts, bus)

	const identifiers = {}
	walk(view, o => {
		for (const key in o) {
			if (hasOwnProperty(o, key)) {
				const prop = o[key]
				if (['function', 'object'].indexOf(typeof prop) !== -1 &&
					prop !== null) {
					const id = identify(prop)
					identifiers[id] = prop
				}
			}
		}
	})

	const childrenArr = Array.from(element.children)
	const slotted = childrenArr.map(x => x.cloneNode(true))
	element.innerHTML = component.template(view)
	walkElements(element, slotted, components, identifiers, subtree, bus, ref)

	return subtree
}

export default render
