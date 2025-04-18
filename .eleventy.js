const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const rssPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = (config) => {
	config.addPlugin(rssPlugin);
	config.addFilter('dateFilter', dateFilter);
	config.addFilter('w3DateFilter', w3DateFilter);
	config.addPassthroughCopy('./src/images/');
	config.addCollection('work', (collection) => {
		return sortByDisplayOrder(collection.getFilteredByGlob('./src/portfolio/*.md'));
	});
	config.addCollection('featuredWork', (collection) => {
		return sortByDisplayOrder(collection.getFilteredByGlob('./src/portfolio/*.md')).filter(
			(x) => x.data.featured,
		);
	});
	config.addCollection('blog', (collection) => {
		return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
	});
	config.addCollection('people', (collection) => {
		return collection.getFilteredByGlob('./src/people/*.md').sort((a, b) => {
			return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
		});
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