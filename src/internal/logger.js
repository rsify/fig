import {hasOwnProperty} from './util'

function Logger(scope, c) {
	this.scope = scope
	this.c = c
}

const levels = {
	success: '#11cc00',
	info: '#6363ff',
	warn: '#ffb500'
}

const constructor = (scope, c = console) => {
	return new Logger(scope, c)
}

for (const level in levels) {
	if (hasOwnProperty(levels, level)) {
		const hex = levels[level]
		Logger.prototype[level] = function (...msg) {
			if (constructor.enabled) {
				this.c.log(`%cfig ${this.scope}`,
					`font-weight: bold; color: ${hex}`, ...msg)
			}
		}
	}
}

Logger.prototype.error = function (...msg) {
	this.c.error(`%cfig ${this.scope}`,
		'font-weight: bold', ...msg)
}

constructor.enabled = true

export default constructor
