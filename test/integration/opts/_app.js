/* global fig */
const app = fig()
window.app = app

window.fn = () => {}
window.arr = [1, 2, 3]
window.obj = {foo: 'bar'}

app.state = {
	bool: true,
	num: 420,
	str: 'heck',
	fn: window.fn,
	arr: window.arr,
	obj: window.obj
}

app.use(require('./Component.fig'))
app.use(require('./Nested.fig'))

app.mount('#app', 'component')
