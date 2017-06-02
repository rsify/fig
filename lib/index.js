const Emitter = require('./internal/emitter')

const DEFAULTS = {}

module.exports = (opts = DEFAULTS) => {
	return new Fig(opts)
}

function Fig (opts) {
	this.opts = opts
	this.state = {}
	this._components = new Map()
	this._tree = {
		root: null
	}

	this._bus = new Emitter()
	this.on = this._bus.on.bind(this._bus)
	this.off = this._bus.off.bind(this._bus)
	this.once = this._bus.once.bind(this._bus)
	this.emit = this._bus.emit.bind(this._bus)
}

Fig.prototype._render = require('./internal/render')

Fig.prototype.mount = require('./mount')
Fig.prototype.use = require('./use')

module.exports.Emitter = Emitter
