import morph from 'nanomorph'

import render from './render'

export default ($root, state, components, bus) => {
	if ($root) {
		const $rendered = $root.cloneNode(false)
		const tree = render($rendered, state, components, bus)
		morph($root, $rendered)
		return tree
	}
	return null
}
