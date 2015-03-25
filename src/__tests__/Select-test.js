'use strict';
/*global describe, it, jest, expect*/

jest.dontMock('../Select');
jest.dontMock('../Value');

var React = require('react/addons');
var Select = require('../Select');
var TestUtils = React.addons.TestUtils;

describe('Select test', function() {

    var options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ];

    function logChange(val) {
        console.log('Selected: ' + val);
    }

    // Render an instance of the component
    var instance = TestUtils.renderIntoDocument(
        <Select
            name="form-field-name"
            value="one"
            options={options}
            onChange={logChange}/>
    );

	var selectInputElement = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];

	it('should assign the given name', function() {
		expect(selectInputElement.getDOMNode().name).toEqual('form-field-name');
	});

});
