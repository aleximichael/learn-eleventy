const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async () => {
	try {
		let url = 'https://11ty-from-scratch-content-feeds.piccalil.li/media.json';
		const { items } = await EleventyFetch(url, {
			duration: '1d',
			type: 'json',
		});
		return items;
	} catch (err) {
		console.log(err);
		return [];
	}
};