/* global fig */
const app = fig()
window.app = app

app.use(require('./Main.fig'))
app.use(require('./One.fig'))
app.use(require('./Two.fig'))

app.mount('#app', 'main')
