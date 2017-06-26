import render from './internal/render'

export default ($root, state, components, bus) => {
	if ($root) {
		return render($root, state, components, bus)
	}
	return null
}
