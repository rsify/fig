// Per https://www.ecma-international.org/ecma-262/6.0/#sec-promise.resolve
const isPromise = x => {
	return Promise.resolve(x) === x
}

export default isPromise
