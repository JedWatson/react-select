'use strict';
/* eslint react/jsx-boolean-value: 0 */

// Emulating the DOM here, only so that if this test file gets
// included first, then React thinks there's a DOM, so the other tests
// (e.g. Select-test.js) that do require a DOM work correctly

var jsdomHelper = require('../testHelpers/jsdomHelper');
jsdomHelper();
var unexpected = require('unexpected');
var unexpectedReact = require('unexpected-react');
var unexpectedSinon = require('unexpected-sinon');
var expect = unexpected
	.clone()
	.installPlugin(unexpectedReact)
	.installPlugin(unexpectedSinon);

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var sinon = require('sinon');


var Select = require('../src/Select');

describe('Async', () => {

	var renderer;
	var loadOptions;

	const typeSearchText = function(text) {
		const output = renderer.getRenderOutput();
		// onInputChange is actually bound to loadOptions(...),
		// loadOptions returns the promise, if there is one, so we can use this
		// to chain the assertions onto
		return output.props.onInputChange(text);
	};

	beforeEach(() => {

		renderer = TestUtils.createRenderer();
		loadOptions = sinon.stub();
	});

	describe('using promises', () => {


		beforeEach(() => {

			// Render an instance of the component
			renderer.render(<Select.Async loadOptions={loadOptions} minimumInput={1}/>);
		});


		it('does not call loadOptions', () => {

			expect(loadOptions, 'was not called');
		});

		it('renders the select with no options', () => {

			return expect(renderer, 'to have rendered',
				<Select options={ [] } noResultsText="Type to search"/>);
		});

		it('calls the loadOptions for each input', () => {

			typeSearchText('te');
			typeSearchText('tes');
			typeSearchText('te');
			return expect(loadOptions, 'was called times', 3);
		});

		it('shows "Loading..." after typing', () => {

			typeSearchText('te');
			return expect(renderer, 'to have rendered',
				<Select
					isLoading
					placeholder="Loading..."
					noResultsText="Searching..."
				/>);
		});

		it('shows the returns options when the result returns', () => {

			// Unexpected comes with promises built in - we'll use them
			// rather than depending on another library
			loadOptions.returns(expect.promise((resolve, reject) => {
				resolve({ options: [{ value: 1, label: 'test' }] });
			}));

			typeSearchText('te');

			return loadOptions.firstCall.returnValue.then(() => {

				return expect(renderer, 'to have rendered',
					<Select
						isLoading={false}
						placeholder="Select..."
						noResultsText="No results found"
						options={ [ { value: 1, label: 'test' } ] }
					/>);
			});
		});

		it('shows "Loading..." after typing if refined search matches none of the previous results', () => {

			loadOptions.returns(expect.promise((resolve, reject) => {
				resolve({ options: [{ value: 1, label: 'test' }] });
			}));

			typeSearchText('te');

			return loadOptions.firstCall.returnValue.then(() => {

				typeSearchText('ten');

				return expect(renderer, 'to have rendered',
					<Select
						isLoading
						placeholder="Loading..."
						noResultsText="Searching..."
					/>);
			});
		});

		it('ignores the result of an earlier call, when the responses come in the wrong order', () => {

			let promise1Resolve, promise2Resolve;
			const promise1 = expect.promise((resolve, reject) => {
				promise1Resolve = resolve;
			});
			const promise2 = expect.promise((resolve, reject) => {
				promise2Resolve = resolve;
			});

			loadOptions.withArgs('te').returns(promise1);
			loadOptions.withArgs('tes').returns(promise2);

			const firstResult = typeSearchText('te');
			const secondResult = typeSearchText('tes');

			promise2Resolve({ options: [ { value: 2, label: 'test' } ] });
			promise1Resolve({ options: [ { value: 1, label: 'test to ignore' } ] });

			return expect.promise.all([firstResult, secondResult]).then(() => {
				return expect(renderer, 'to have rendered',
					<Select
						isLoading={false}
						placeholder="Select..."
						noResultsText="No results found"
						options={ [ { value: 2, label: 'test' } ] }
					/>);
			});
		});

		it('treats a rejected promise as empty options', () => {

			let promise1Resolve, promise2Reject;

			const promise1 = expect.promise((resolve, reject) => {
				promise1Resolve = resolve;
			});
			const promise2 = expect.promise((resolve, reject) => {
				promise2Reject = reject;
			});
			loadOptions.withArgs('te').returns(promise1);

			loadOptions.withArgs('tes').returns(promise2);

			const result1 = typeSearchText('te');
			const result2 = typeSearchText('tes');
			promise1Resolve({ options: [ { value: 1, label: 'from te input' }] });
			promise2Reject();

			return expect.promise.all([ result1, result2]).then(() => {
				// Previous results (from 'te') are thrown away, and we render with an empty options list
				return expect(renderer, 'to have rendered', <Select options={ [] }/>);
			});
		});
	});

	describe('with an onInputChange prop', () => {

		let input;
		const onInputChange = v => input = v;

		beforeEach(() => {

			// Render an instance of the component
			renderer.render(<Select.Async
				loadOptions={loadOptions}
				minimumInput={1}
				onInputChange={onInputChange}
			/>);
		});

		it('calls through to the provided onInputChange function', () => {
			typeSearchText('hi');
			return expect(input, 'to equal', 'hi');
		});
	});

	describe('with an isLoading prop', () => {

		beforeEach(() => {

			// Render an instance of the component
			renderer.render(<Select.Async
				loadOptions={loadOptions}
				minimumInput={1}
				isLoading
			/>);
		});

		it('forces the isLoading prop on Select', () => {
			return expect(renderer, 'to have rendered',
			<Select
				isLoading
				noResultsText="Searching..."
				placeholder="Loading..."
			/>);
		});
	});

	describe('with a cache', () => {

		beforeEach(() => {

			// Render an instance of the component
			renderer.render(<Select.Async
				loadOptions={loadOptions}
				minimumInput={1}
				cache={ {} }
			/>);
		});

		it('caches previous responses', () => {
			loadOptions.withArgs('te').returns(expect.promise((resolve,reject) => {
				resolve({ options: [{ value: 'te', label: 'test 1' }] });
			}));
			loadOptions.withArgs('tes').returns(expect.promise((resolve,reject) => {
				resolve({ options: [{ value: 'tes', label: 'test 2' } ] });
			}));

			// Need to wait for the results be returned, otherwise the cache won't be used
			return typeSearchText('te')
				.then(() => typeSearchText('tes'))
				.then(() => typeSearchText('te')) // this should use the cache
				.then(() => {
					return expect(loadOptions, 'was called times', 2);
				});
		});

		it('does not call `loadOptions` for a longer input, after a `complete=true` response', () => {
			loadOptions.withArgs('te').returns(expect.promise((resolve,reject) => {
				resolve({
					complete: true,
					options: [{ value: 'te', label: 'test 1' }]
				});
			}));

			return typeSearchText('te')
				.then(() => typeSearchText('tes'))
				.then(() => {
					return expect(loadOptions, 'was called once');
				});
		});

		it('updates the cache when the cache is reset as a prop', () => {

			renderer.render(<Select.Async
				loadOptions={loadOptions}
				minimumInput={1}
				cache={ { 'tes': { options: [ { value: 1, label: 'updated cache' } ] } } }
			/>);

			typeSearchText('tes');
			expect(loadOptions, 'was not called');
			return expect(renderer, 'to have rendered',
				<Select options={ [ { value: 1, label: 'updated cache' } ] } />
			);
		});

		it('uses the longest complete response if the responses come out-of-order', () => {
			let resolveTe, resolveTes;
			const promises = [];
			promises.push(loadOptions.withArgs('te').returns(expect.promise((resolve, reject) => {
				resolveTe = () => resolve({
					complete: true,
					options: [ { value: 'te', label: 'test 1' } ]
				});
			})));

			promises.push(loadOptions.withArgs('tes').returns(expect.promise((resolve, reject) => {
				resolveTes = () => resolve({
					complete: true,
					options: [ { value: 'tes', label: 'test 2' } ]
				});
			})));

			/* Order is:
			 * 1. User types 'te'
			 * 2. loadOptions is called with 'te'
			 * 3. User types 'tes'
			 * 4. loadOptions is called with 'tes'
			 * 5. Response for 'tes' comes back, with { complete: true }
			 * 6. Response for 'te' comes back, with { complete: true }
			 * 7. User types 'test'
			 * 8. Expect that we get the results for 'tes' as options, not 'te'
			 */

			typeSearchText('te');
			typeSearchText('tes');

			resolveTes();
			resolveTe();

			return expect.promise.all(promises).then(() => {

				typeSearchText('test');

				expect(loadOptions, 'was called times', 2);
				return expect(renderer, 'to have rendered', <Select options={
					[ { value: 'tes', label: 'test 2' }]
				} />);

			});

		});
	});

	describe('using callbacks', () => {

		beforeEach(() => {

			// Render an instance of the component
			renderer.render(<Select.Async loadOptions={loadOptions} minimumInput={1}/>);
		});

		it('shows the returns options when the result returns', () => {

			typeSearchText('te');

			expect(loadOptions, 'was called');

			const callback = loadOptions.args[0][1];

			callback(null, { options: [ { value: 1, label: 'test callback' } ] });


			return expect(renderer, 'to have rendered',
				<Select
					isLoading={false}
					placeholder="Select..."
					noResultsText="No results found"
					options={ [ { value: 1, label: 'test callback' } ] }
				/>);
		});

		it('renders results for each callback', () => {

			typeSearchText('te');
			typeSearchText('tes');

			expect(loadOptions, 'was called times', 2);

			const callback1 = loadOptions.args[0][1];
			const callback2 = loadOptions.args[1][1];

			callback1(null, { options: [ { value: 1, label: 'test callback' } ] });
			callback2(null, { options: [ { value: 2, label: 'test callback 2' } ] });

			return expect(renderer, 'to have rendered',
				<Select
					isLoading={false}
					placeholder="Select..."
					noResultsText="No results found"
					options={ [ { value: 2, label: 'test callback 2' } ] }
				/>);
		});

		it('ignores callbacks from earlier requests (out-of-order responses)', () => {

			typeSearchText('te');
			typeSearchText('tes');

			expect(loadOptions, 'was called times', 2);

			const callback1 = loadOptions.args[0][1];
			const callback2 = loadOptions.args[1][1];

			callback2(null, { options: [ { value: 2, label: 'test callback 2' } ] });
			// Callback1 should be ignored
			callback1(null, { options: [ { value: 1, label: 'test callback' } ] });

			return expect(renderer, 'to have rendered',
				<Select
					isLoading={false}
					placeholder="Select..."
					noResultsText="No results found"
					options={ [ { value: 2, label: 'test callback 2' } ] }
				/>);
		});

		it('uses the cache when available', () => {

			renderer.render(<Select.Async cache={true} loadOptions={loadOptions} />);

			typeSearchText('te');
			loadOptions.args[0][1](null, { options: [ { value: 1, label: 'test1' } ] });
			typeSearchText('tes');
			loadOptions.args[1][1](null, { options: [ { value: 2, label: 'test2' } ] });
			typeSearchText('te');

			expect(loadOptions, 'was called times', 2);

			return expect(renderer, 'to have rendered',
				<Select options={ [ { value: 1, label: 'test1' } ] } />);
		});

		it('throws an error when the callback returns an error', () => {

			typeSearchText('te');

			expect(() => loadOptions.args[0][1](new Error('Something went wrong')),
				'to throw', 'Something went wrong');
		});

		it('assumes no options when the result has no `options` property', () => {

			typeSearchText('te');
			loadOptions.args[0][1](null, [ { value: 1, label: 'should be wrapped in an object' } ] );

			return expect(renderer, 'to have rendered', <Select options={ [] } />);
		});
	});

	describe('with minimumInput', () => {

		describe('=0', () => {

			beforeEach(() => {
				renderer.render(<Select.Async loadOptions={loadOptions} minimumInput={0} cache={false} />);
			});

			it('calls loadOptions immediately', () => {
				// componentDidMount is not currently called with the shallowRenderer, so we need to fake it here
				// When we upgrade to 0.15, we'll be able to use renderer.getMountedInstance()
				// (or, componentDidMount will be called with the shallow renderer)
				renderer._instance._instance.componentDidMount();
				expect(loadOptions, 'was called');
			});

			it('calls loadOptions again when input returns to empty', () => {

				renderer._instance._instance.componentDidMount();
				typeSearchText('t');
				typeSearchText('');
				expect(loadOptions, 'was called times', 3);
			});
		});

		describe('=3', () => {

			beforeEach(() => {
				renderer.render(<Select.Async loadOptions={loadOptions} minimumInput={3} cache={false} />);
			});

			it('does not call loadOptions initially', () => {

				renderer._instance._instance.componentDidMount();
				expect(loadOptions, 'was not called');
			});

			it('does not call loadOptions when 2 characters are entered', () => {

				typeSearchText('te');
				expect(loadOptions, 'was not called');
			});

			it('calls loadOptions when 3 characters are entered', () => {

				typeSearchText('tes');
				expect(loadOptions, 'was called');
			});

			it('resets to `type to search` when text returns to < 3', () => {

				typeSearchText('tes');
				loadOptions.args[0][1](null, { options: [ { value: 1, label: 'test1' } ] });

				typeSearchText('te');
				return expect(renderer, 'to have rendered',
					<Select
						options={ [] }
						placeholder="Select..."
						noResultsText="Type to search"
					/>);

			});
		});
	});

	describe('with ignoreAccents', () => {

		beforeEach(() => {
			renderer.render(<Select.Async
				loadOptions={loadOptions}
				ignoreAccents={true}
				ignoreCase={false}
				cache={false} />);
		});

		it('calls loadOptions with unchanged text', () => {

			typeSearchText('TeSt');
			expect(loadOptions, 'was called with', 'TeSt');
		});

		it('calls loadOptions with accents stripped', () =>  {
			typeSearchText('Gedünstmaßig');
			// This should really be Gedunstmassig: ß -> ss
			expect(loadOptions, 'was called with', 'Gedunstmasig');
		});
	});

	describe('with ignore case', () => {

		beforeEach(() => {

			renderer.render(<Select.Async
				loadOptions={loadOptions}
				ignoreAccents={false}
				ignoreCase={true}
				cache={false} />);
		});

		it('converts everything to lowercase', () => {

			typeSearchText('TeSt');
			expect(loadOptions, 'was called with', 'test');
		});

		it('converts accents to lowercase', () => {

			typeSearchText('WÄRE');
			expect(loadOptions, 'was called with', 'wäre');
		});
	});

	describe('with ignore case and ignore accents', () => {

		beforeEach(() => {

			renderer.render(<Select.Async
				loadOptions={loadOptions}
				ignoreAccents={true}
				ignoreCase={true}
				cache={false} />);
		});

		it('converts everything to lowercase', () => {

			typeSearchText('TeSt');
			expect(loadOptions, 'was called with', 'test');
		});

		it('removes accents and converts to lowercase', () => {

			typeSearchText('WÄRE');
			expect(loadOptions, 'was called with', 'ware');
		});
	});
});
