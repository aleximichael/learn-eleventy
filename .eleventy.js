const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

module.exports = (config) => {
	config.addPassthroughCopy('./src/images/');
	config.addCollection('work', (collection) => {
		return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
	});
	config.addCollection('featuredWork', (collection) => {
		return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
			(x) => x.data.featured,
		);
	});
	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir: {
			input: 'src',
			output: 'dist',
		},
	};
};