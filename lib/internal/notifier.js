const set = (obj, prop, notify) => {
	const o = obj[prop]

	walk(o, notify)
	defineWatchedProp(obj, prop, notify)
}

const WATCHED_NAME = '__fig-watched__'

const walk = (o, notify) => {
	if (typeof o === 'object') {
		if (!o[WATCHED_NAME]) {
			defineHiddenProp(o, WATCHED_NAME, true)

			// check if object is interesting
			// as in has methods that could modify it which we need to wrap
			// (e.g. arrays)
			if (o.constructor !== {}.constructor) {
				const names = Object.getOwnPropertyNames([].constructor.prototype)
				for (const key of names) {
					const orig = o[key]
					if (typeof orig === 'function') {
						const wrapper = wrapFactory(o, orig, notify)
						defineHiddenProp(o, key, wrapper)
					}
				}
			}
		}

		// wrap setters with our methods
		for (const key in o) {
			if (o.hasOwnProperty(key)) {
				defineWatchedProp(o, key, notify)
			}
		}

		for (const key in o) {
			if (o.hasOwnProperty(key)) {
				const val = o[key]
				if (typeof val === 'object') {
					walk(o[key], notify)
				}
			}
		}
	}
}

const wrapFactory = (that, fn, notify) => {
	return function FigWrap () {
		const res = fn.apply(that, arguments)
		walk(that, notify)
		notify()
		return res
	}
}

const defineHiddenProp = (obj, prop, value) => {
	Object.defineProperty(obj, prop, {
		value: value,
		enumerable: false
	})
}

const defineWatchedProp = (obj, prop, notify) => {
	let v = obj[prop]

	Object.defineProperty(obj, prop, {
		set: o => {
			v = o
			walk(v, notify)
			notify()
		},
		get: () => {
			return v
		}
	})
}

module.exports = {
	set
}
