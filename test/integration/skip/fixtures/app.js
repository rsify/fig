/* global fig */
const app = fig()
window.app = app

app.use(require('./Component.fig'))

app.state = {
	foo: 42
}

app.mount('#app', 'component')
