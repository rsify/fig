import browserify from 'browserify'
import figify from 'figify'

export default async path => {
	const b = browserify(path)
		.transform(figify)

	return new Promise((resolve, reject) => {
		b.bundle((err, buf) => {
			if (err) {
				reject(err)
			} else {
				resolve(buf.toString())
			}
		})
	})
}
