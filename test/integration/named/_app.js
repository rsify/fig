/* global fig */
const app = fig()
window.app = app

app.use(require('./Component.fig'))
app.use(require('./Child.fig')) // Name: child-default
app.use(require('./Child.fig'), 'child-one')
app.use(require('./Child.fig'), 'child-two')

app.mount('#app', 'component')
