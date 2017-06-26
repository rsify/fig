function Logger(scope, fn) {
	this.scope = scope
	this.fn = fn
}

const levels = {
	success: '#11cc00',
	info: '#6363ff',
	warn: '#ffb500',
	error: '#ff5555'
}

const constructor = (scope, fn = console.log) => {
	return new Logger(scope, fn)
}

for (const level in levels) {
	if (Object.prototype.hasOwnProperty.call(levels, level)) {
		const hex = levels[level]
		Logger.prototype[level] = function (...msg) {
			if (constructor.enabled) {
				this.fn(`%cfig ${this.scope}`,
					`font-weight: bold; color: ${hex}`, ...msg)
			}
		}
	}
}

constructor.enabled = true

export default constructor
