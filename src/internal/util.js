// Handy shorthand
const hasOwnProperty = (o, key) => {
	return Object.prototype.hasOwnProperty.call(o, key)
}

// Per https://www.ecma-international.org/ecma-262/6.0/#sec-promise.resolve
const isPromise = x => {
	return Promise.resolve(x) === x
}

// For js optimization
const noop = () => {}

// Generate a random string of set length
const randString = (length = 8) => {
	let res = ''
	while (res.length < length) {
		res += Math.random().toString(36).slice(2)
	}
	return res.slice(0, length)
}

// Walk through object properties recursively
const walk = (visitor, o, ...args) => {
	if (typeof o === 'object') {
		visitor(o, ...args)

		for (const key in o) {
			if (hasOwnProperty(o, key)) {
				const val = o[key]
				if (typeof val === 'object') {
					walk(visitor, val, ...args)
				}
			}
		}
	}
}

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

	const re = new RegExp(str)
	return re.test(name)
}

export {
	hasOwnProperty,
	isPromise,
	noop,
	randString,
	walk,
	wildcard
}
