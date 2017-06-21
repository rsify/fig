// for js optimization
const noop = () => {}

// generate a random string of set length
const randString = length => {
	let res = ''
	while (res.length < length) {
		res = res + Math.random().toString(36).slice(2)
	}
	return res.slice(0, length)
}

// walk through object properties recursively
const walk = (visitor, o, ...args) => {
	if (typeof o === 'object') {
		visitor(o, ...args)

		for (const key in o) {
			if (o.hasOwnProperty(key)) {
				const val = o[key]
				if (typeof val === 'object') {
					walk(visitor, val, ...args)
				}
			}
		}
	}
}

// match wildcard strings with domains
// e.g. wildcard('hello-world', 'hello-*') === true
//      wildcard('heck-*', 'heck') === false
const wildcard = (name, domain) => {
	const str = domain.split('').map(x => {
		if (x === '*') return '.*'
		const code = x.charCodeAt(0)
		let hex = code.toString(16)

		// pad to 4 digits
		let i = 4 - hex.length
		while (i--) hex = '0' + hex

		return '\\u' + hex
	}).join('')

	const re = new RegExp(str)
	return re.test(name)
}

export {
	noop,
	randString,
	walk,
	wildcard
}
