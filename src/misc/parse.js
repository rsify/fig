export default function (str) {
	const exports = {}
	const module = {
		exports
	}
	// Livin on the edge
	eval(str) // eslint-disable-line no-eval
	return module.exports
}
