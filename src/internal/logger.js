import { noop } from './util'

const log = (scope, color, ...msg) => {
	console.log(`%cfig ${scope}`,
		`font-weight: bold; color: ${color}`, ...msg)
}

function Logger () {}

const levels = {
	'success': '#11cc00',
	'info': '#6363ff',
	'warn': '#ffb500',
	'error': '#ff5555'
}

for (const level in levels) {
	const hex = levels[level]
	Logger.prototype[level] = (scope, ...msg) => log(scope, hex, ...msg)
}

export default enabled => {
	if (!enabled) return noop
	return new Logger()
}
