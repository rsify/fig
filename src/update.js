import render from './internal/render'

export default ($root, state, components, bus) => {
	if ($root) {
		$root.innerHTML = null
		return render($root, state, components, bus)
	}
	return null
}
