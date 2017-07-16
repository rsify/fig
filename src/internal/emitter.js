import {wildcard} from './util'

class Emitter {
	constructor() {
		this.listeners = []
	}

	on(domain, fn) {
		if (!domain || !fn) {
			return this
		}

		this.listeners.push({
			domain, fn
		})
	}

	off(domain, fn) {
		if (!domain) {
			return this
		}

		const candidates = this.listeners
			.filter(l => wildcard(domain, l.domain))
			.filter(l => fn ? l.fn === fn : true)

		for (const c of candidates)		{
			this.listeners.splice(this.listeners.indexOf(c), 1)
		}
	}

	once(domain, fn) {
		if (!domain || !fn) {
			return this
		}

		const tmp = () => {
			fn()
			this.off(domain, tmp)
		}
		this.on(domain, tmp)
	}

	emit(domain, payload) {
		if (!domain) {
			return this
		}

		const candidates = this.listeners
			.filter(l => wildcard(domain, l.domain))

		for (const c of candidates) {
			c.fn(payload)
		}
	}
}

export default Emitter
