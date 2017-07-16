import {hasOwnProperty} from './'

// Walk through object properties recursively
const walk = (o, visitor, ...args) => {
	if (typeof o === 'object') {
		visitor(o, ...args)

		for (const key in o) {
			if (hasOwnProperty(o, key)) {
				const val = o[key]
				if (typeof val === 'object') {
					walk(val, visitor, ...args)
				}
			}
		}
	}
}

export default walk
