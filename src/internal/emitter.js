import { wildcard } from './util'

function Bus () {
	if (!(this instanceof Bus)) return new Bus()

	this.listeners = []
	return this
}

Bus.prototype.on = function (domain, fn) {
	if (!domain || !fn) return this
	this.listeners.push({
		domain, fn
	})

	return this
}

Bus.prototype.off = function (domain, fn) {
	if (!domain) return this

	const candidates = this.listeners
		.filter(l => wildcard(domain, l.domain))
		.filter(l => fn ? l.fn === fn : true)

	for (const c of candidates)
		this.listeners.splice(this.listeners.indexOf(c), 1)

	return this
}

Bus.prototype.once = function (domain, fn) {
	if (!domain || !fn) return this

	const tmp = () => {
		fn()
		this.off(domain, tmp)
	}
	this.on(domain, tmp)

	return this
}

Bus.prototype.emit = function (domain, payload) {
	if (!domain) return this

	const candidates = this.listeners
		.filter(l => wildcard(domain, l.domain))

	for (const c of candidates)
		c.fn(payload)

	return this
}

export default Bus
