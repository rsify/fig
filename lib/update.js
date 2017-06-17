module.exports = function () {
	if (this._$root)
		this._root = this._render(this._$root, this.state)
}
