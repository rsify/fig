const Emitter = require('./internal/emitter')
const notifier = require('./internal/notifier')

const DEFAULTS = {}

module.exports = (opts = DEFAULTS) => {
	return new Fig(opts)
}

function Fig (opts) {
	this.opts = opts

	this.state = {}
	notifier.set(this, 'state', () => this.update())

	this._render = require('./internal/render')
	this._components = new Map()
	this._root = null

	this._bus = new Emitter()
	this.on = this._bus.on.bind(this._bus)
	this.off = this._bus.off.bind(this._bus)
	this.once = this._bus.once.bind(this._bus)
	this.emit = this._bus.emit.bind(this._bus)
}

Fig.prototype.mount = require('./mount')
Fig.prototype.set = notifier.set
Fig.prototype.update = require('./update')
Fig.prototype.use = require('./use')

module.exports.Emitter = Emitter
