import bundler from './bundler'
import embed from './embed-script'
import makeDOM from './make-dom'

export default async p => {
	const dom = await makeDOM()
	const {window} = dom
	const bundle = await bundler(p)
	embed(window, bundle)

	return {
		app: window.app,
		dom,
		window,
		$: window.document.querySelector.bind(window.document),
		$$: window.document.querySelectorAll.bind(window.document)
	}
}
