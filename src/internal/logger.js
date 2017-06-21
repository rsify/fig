import { noop } from './util'

const log = (scope, color, ...msg) => {
	console.log(`%cfig ${scope}`,
		`font-weight: bold; color: ${color}`, ...msg)
}

function Logger (scope) {
	this.scope = scope
}

const levels = {
	'success': '#11cc00',
	'info': '#6363ff',
	'warn': '#ffb500',
	'error': '#ff5555'
}

for (const level in levels) {
	const hex = levels[level]
	Logger.prototype[level] = function (...msg) {
		if (constructor.enabled)
			log(this.scope, hex, ...msg)
	}
}

const constructor = scope => {
	return new Logger(scope)
}
constructor.enabled = true

export default constructor
