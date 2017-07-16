import {hasOwnProperty} from './'

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

export default walk
