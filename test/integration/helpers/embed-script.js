export default (window, js) => {
	const $script = window.document.createElement('script')
	$script.innerHTML = js
	window.document.head.appendChild($script)
}
