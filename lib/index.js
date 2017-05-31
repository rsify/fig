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
}

Fig.prototype._render = require('./internal/render')

Fig.prototype.mount = require('./mount')
Fig.prototype.use = require('./use')
// Fig.prototype.on = require('./on')
