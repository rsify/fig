/* global fig */
const app = fig()
window.app = app

app.state = {
	single: 42,
	arr: [0, 1],
	nest: {
		foo: 42
	}
}

app.use(require('./Component.fig'))

app.mount('#app', 'component')
