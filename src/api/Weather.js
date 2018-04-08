import Base from './Base';

export default class Weather extends Base {
	getAt(woeId) {
		const q = `select item.title, item.condition from weather.forecast where woeid = ${woeId} and u='c'`;
		const format = 'json';

		return this.fetch('/v1/public/yql/', { q, format }).then(
			result => result.query.results.channel.item.condition
		);
	}
}
