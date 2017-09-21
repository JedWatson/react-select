import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const name = 'Select';
const path = 'dist/react-select';
const globals = {
	classnames: 'classNames',
	'prop-types': 'PropTypes',
	'react-dom': 'ReactDOM',
	'react-input-autosize': 'AutosizeInput',
	react: 'React',
};
const external = Object.keys(globals);
const babelOptions = (production) => {
	let result = {
		babelrc: false,
		presets: [['es2015', { modules: false }], 'stage-0', 'react'],
		plugins: ['external-helpers'],
	};
	if (production) {
		result.plugins.push('transform-react-remove-prop-types');
	};
	return result;
};

export default [
	{
		input: 'src/index.js',
		output: {
			file: path + '.es.js',
			format: 'es',
		},
		external: external,
		plugins: [babel(babelOptions(false))],
	},
	{
		input: 'src/index.umd.js',
		output: {
			name: name,
			file: path + '.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [babel(babelOptions(false)), resolve()],
	},
	{
		input: 'src/index.umd.js',
		output: {
			name: name,
			file: path + '.min.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [babel(babelOptions(true)), resolve(), uglify({}, minify)],
	},
];
