/* global __dirname */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const flatten = require('flat');

const file = path.join(__dirname, '/tokens.yaml');

const writeJSON = tokens =>
	fs.writeFileSync(
		path.join(__dirname, '/tokens.json'),
		JSON.stringify(tokens)
	);

const writeSass = tokens => {
	const flattened = flatten(tokens, { delimiter: '-' });
	const output = Object.entries(flattened)
		.map(([key, value]) => `$${key}: "${value}";`)
		.join('');

	fs.writeFileSync(path.join(__dirname, '/tokens.scss'), output);
};

try {
	const content = fs.readFileSync(file, 'utf-8');
	const tokens = yaml.safeLoad(content);
	writeJSON(tokens);
	writeSass(tokens);
} catch (e) {
	console.error(e); // eslint-disable-line
}
