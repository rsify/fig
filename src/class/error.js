import logging from './logger'

const log = logging('error')

export default class FigError extends Error {
	constructor(msg, ...tips) {
		const t = tips.join(' / ')
		log.error(`${msg} (${t})`)
		super(msg)
		this.name = 'FigError'
	}
}
