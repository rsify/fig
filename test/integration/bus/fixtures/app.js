/* global fig */
const app = fig()
window.app = app

app.use(require('./Component.fig'))

app.mount('#app', 'component')
