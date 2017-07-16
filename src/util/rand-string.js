// Generate a random string of set length
const randString = (length = 8) => {
	let res = ''
	while (res.length < length) {
		res += Math.random().toString(36).slice(2)
	}
	return res.slice(0, length)
}

export default randString
