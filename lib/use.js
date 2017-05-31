module.exports = function (comp) {
	if (!Array.isArray(comp)) comp = [comp]

	for (const component of comp) {
		// skip if already registered
		if (this._components.has(component.name))
			throw 'component already registered'

		const constructor = document.registerElement(component.name)
		const name = component.name
		const template = component.template
		const style = component.style
		const script = component.default

		this._components.set(component.name, {
			constructor,
			template,
			style,
			script
		})
	}
}
