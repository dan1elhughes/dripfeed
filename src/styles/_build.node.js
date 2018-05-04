/* global __dirname */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const flatten = require('flat');

const file = path.join(__dirname, '/tokens.yaml');

const writeJSON = tokens =>
	fs.writeFileSync(
		path.join(__dirname, '/tokens.json'),
		JSON.stringify(tokens, null, 4)
	);

const writeSass = tokens => {
	const flattened = flatten(tokens, { delimiter: '-' });
	const output = Object.entries(flattened)
		.map(([key, value]) => `$${key}: '${value}';`)
		.join('\n');

	fs.writeFileSync(path.join(__dirname, '/tokens.scss'), output);
};

const writeCss = tokens => {
	const flattened = flatten(tokens, { delimiter: '-' });

	const before = ':root {\n';
	const after = '\n}';

	const content = Object.entries(flattened)
		.map(([key, value]) => `\t--${key}: '${value}';`)
		.join('\n');

	const output = `${before}${content}${after}`;
	fs.writeFileSync(path.join(__dirname, '/tokens.css'), output);
};

try {
	const content = fs.readFileSync(file, 'utf-8');
	const tokens = yaml.safeLoad(content);
	writeJSON(tokens);
	writeSass(tokens);
	writeCss(tokens);
} catch (e) {
	console.error(e); // eslint-disable-line
}
