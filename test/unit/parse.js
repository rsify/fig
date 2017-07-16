import test from 'ava'
import parse from '../../src/misc/parse'

test('named exports', t => {
	const fixture = `
module.exports.m = 1
exports.number = 2
exports.fn = () => {}
exports.undef = undefined
exports.null = null
exports.string = 'str'
exports.obj = {foo: 'bar'}
exports.arr = [1, 2, 3]`

	const exports = parse(fixture)

	t.is(exports.m, 1)
	t.is(exports.number, 2)
	t.is(typeof exports.fn, 'function')
	t.is(exports.undef, undefined)
	t.is(exports.null, null)
	t.is(exports.string, 'str')
	t.deepEqual(exports.obj, {foo: 'bar'})
	t.deepEqual(exports.arr, [1, 2, 3])
})

test('default export', t => {
	const fixture = `module.exports = 'named'`
	const exports = parse(fixture)

	t.is(exports, 'named')
})
