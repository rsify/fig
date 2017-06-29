/* global fig */
const app = fig()
window.app = app

window.eventStore = []

app.use(require('./Component.fig'))

app.mount('#app', 'component')

document.querySelector('.btn').dispatchEvent(new Event('click'))
document.querySelector('.btn').dispatchEvent(new Event('dblclick'))

document.querySelector('.h1').dispatchEvent(new Event('click'))
document.querySelector('.h1').dispatchEvent(new Event('contextmenu'))
