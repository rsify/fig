import { isPromise } from './util'

class Chain {
	constructor () {
		this.stack = []
	}

	defer (fn) {
		this.stack.push(fn)
		if (this.stack.length === 1) this.next()
	}

	next () {
		if (this.stack.length === 0) return

		const fn = this.stack[0]
		const res = fn()

		const done = () => {
			this.stack.shift()
			this.next()
		}

		if (isPromise(res))
			res.then(done).catch(err => console.error(err, err.stack))
		else done()
	}
}

export default Chain
