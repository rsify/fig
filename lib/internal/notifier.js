const set = (obj, prop, notify) => {
	const o = obj[prop]

	walk(o, notify)
	defineProp(obj, prop, notify)
}

const walk = (o, notify) => {
	if (typeof o === 'object') {
		// wrap setters with our methods
		for (const key in o) {
			if (o.hasOwnProperty(key)) {
				defineProp(o, key, notify)
			}
		}

		// check if object is interesting
		// as in has methods that could modify it which we need to wrap
		// (e.g. arrays)
		if (o.constructor !== {}.constructor) {
			const names = Object.getOwnPropertyNames([].constructor.prototype)
			for (const key of names) {
				const orig = o[key]
				if (typeof orig === 'function') {
					o[key] = wrapFactory(o, orig, notify)
				}
			}
		}

		for (const key in o) {
			if (o.hasOwnProperty(key)) {
				if (typeof o[key] === 'object')
					walk(o[key], notify)
			}
		}
	}
}

const wrapFactory = (that, fn, notify) => {
	return function FigWrap () {
		fn.apply(that, arguments)
		notify()
	}
}

const defineProp = (obj, prop, notify) => {
	let v = obj[prop]

	Object.defineProperty(obj, prop, {
		set: o => {
			notify()
			v = o
		},
		get: () => {
			return v
		}
	})
}

module.exports = {
	set
}
