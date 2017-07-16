// Downloads a string from the given url

export default url => {
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest()

		req.addEventListener('load', () => {
			resolve(req.response)
		})

		req.addEventListener('error', err => {
			reject(err)
		})

		req.open('GET', url)
		req.send()
	})
}
