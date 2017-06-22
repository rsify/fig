import Chain from './internal/chain'
import Emitter from './internal/emitter'
import logging from './internal/logger'
import mount from './mount'
import update from './update'
import use from './use'
import watch from './internal/notifier'

const log = logging('app')

const DEFAULTS = {
	debug: false
}

const constructor = (opts = DEFAULTS) => {
	return new Fig(opts)
}

class Fig {
	constructor (opts) {
		this.opts = opts

		logging.enabled = opts.debug

		log.info('initializing with config', opts)

		this.state = {}
		watch(this, 'state', () => {
			if (this._$root) {
				logging('notifier').info('state changes detected, updating...')
				this._tree = update(this._$root, this.state,
					this._components, this._bus)
				}
		})

		this._components = new Map()
		this._tree = null

		this._bus = new Emitter()
		this.on = this._bus.on.bind(this._bus)
		this.off = this._bus.off.bind(this._bus)
		this.once = this._bus.once.bind(this._bus)
		this.emit = this._bus.emit.bind(this._bus)

		this.chain = new Chain()
	}

	mount ($el, name) {
		this.chain.defer(() => {
			this._$root = mount($el, this._components.get(name))

			update(this._$root, this.state, this._components, this._bus)
		})
	}

	update () {
		this.chain.defer(() => {
			update(this._$root, this.state, this._components, this._bus)
		})
	}

	use (comp) {
		this.chain.defer(async () => {
			return await use(comp, this._components)
		})
	}
}

export default constructor
