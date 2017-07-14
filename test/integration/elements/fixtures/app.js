/* global fig */
const app = fig()
window.app = app

app.use(require('./Component.fig'))
app.use(require('./Nested.fig'))

app.mount('#app', 'component')
