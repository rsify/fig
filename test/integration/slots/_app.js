/* global fig */
const app = fig()
window.app = app

app.use(require('./Component.fig'))
app.use(require('./Nested.fig'))
app.use(require('./MultiNested.fig'))

app.mount('#app', 'component')
