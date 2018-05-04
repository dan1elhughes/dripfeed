const { localStorage } = window;

const KEY = '_';

export default class Store {
	get(key) {
		const data = JSON.parse(localStorage.getItem(KEY) || '{ "settings": [] }');
		return key ? data[key] : data;
	}

	set(key, value) {
		const existingData = this.get();
		const newProperty = { [key]: value };

		localStorage.setItem(
			KEY,
			JSON.stringify({
				...existingData,
				...newProperty,
			})
		);
	}
}
