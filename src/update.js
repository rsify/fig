module.exports = function () {
	if (this._$root)
		this._tree = this._render(this._$root, this.state)
}
