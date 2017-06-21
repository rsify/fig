import { walk } from './util'

const watch = (obj, prop, notify) => {
	const o = obj[prop]

	walk(visit, o, notify)
	defineWatchedProp(obj, prop, notify)
}

const WATCHED_NAME = '__fig-watched__'

// mutating array prototype methods
const MUTATING = ['copyWithin', 'fill', 'pop', 'push',
	'reverse', 'shift', 'sort', 'splice', 'unshift']

const visit = (o, notify) => {
	if (!o[WATCHED_NAME]) {
		defineHiddenProp(o, WATCHED_NAME, true)

		// check if object is interesting
		// as in has methods that could modify it which we need to wrap
		// (e.g. arrays)
		if (o.constructor !== {}.constructor) {
			const names = Object.getOwnPropertyNames(
				[].constructor.prototype)
			for (const key of names) {
				const orig = o[key]
				if (typeof orig === 'function') {
					// skip if we're sure it's not a mutating method
					if (Array.isArray(o) &&	MUTATING.indexOf(key) === -1)
						continue

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
}

const wrapFactory = (that, fn, notify) => {
	return function FigWrap () {
		const res = fn.apply(that, arguments)
		walk(visit, that, notify)
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
			walk(visit, v, notify)
			notify()
		},
		get: () => {
			return v
		}
	})
}

export {
	watch
}
