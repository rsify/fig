/* eslint max-params: "off" */

import morph from 'nanomorph'

import render from './render'

export default ($root, state, components, bus, refs) => {
	if ($root) {
		const $rendered = $root.cloneNode(false)
		const tree = render($rendered, state, components, bus, refs)
		morph($root, $rendered)
		return tree
	}
	return null
}
