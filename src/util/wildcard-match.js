// Match wildcard strings with domains
// e.g. wildcard('hello-world', 'hello-*') === true
//      wildcard('heck-*', 'heck') === false
const wildcard = (name, domain) => {
	const str = domain.split('').map(x => {
		if (x === '*') {
			return '.*'
		}
		const code = x.charCodeAt(0)
		let hex = code.toString(16)

		// Pad to 4 digits
		let i = 4 - hex.length
		while (i--) {
			hex = '0' + hex
		}

		return '\\u' + hex
	}).join('')

	const re = new RegExp(`^${str}$`)
	return re.test(name)
}

export default wildcard
