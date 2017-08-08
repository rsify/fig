/* global fig */
const app = fig()
window.app = app

app.state = {
	x: 'pre'
}

app.use(require('./Component.fig'))
