require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = require('react'),
	Select = require('react-select');

function logChange(value) {
	console.log('Select value changed: ' + value);
}
 
var SelectField = React.createClass({displayName: 'SelectField',
	getInitialState: function() {
		return {
			selectValue: 'new-south-wales'
		}
	},
	updateValue: function(newValue) {
		logChange(newValue);
		this.setState({
			selectValue: newValue
		});
	},
	render: function() {
		var ops = [
			{ label: 'Australian Capital Territory', value: 'australian-capital-territory' },
			{ label: 'New South Wales', value: 'new-south-wales' },
			{ label: 'Victoria', value: 'victoria' },
			{ label: 'Queensland', value: 'queensland' },
			{ label: 'Western Australia', value: 'western-australia' },
			{ label: 'South Australia', value: 'south-australia' },
			{ label: 'Tasmania', value: 'tasmania' },
			{ label: 'Northern Territory', value: 'northern-territory' }
		];
		return React.createElement("div", null, 
			React.createElement("label", null, this.props.label), 
			React.createElement(Select, {options: ops, value: this.state.selectValue, onChange: this.updateValue})
		);
	}
});
 
var RemoteSelectField = React.createClass({displayName: 'RemoteSelectField',
	loadOptions: function(input, callback) {
		
		input = input.toLowerCase();
		
		var rtn = {
			options: [
				{ label: 'One', value: 'one' },
				{ label: 'Two', value: 'two' },
				{ label: 'Three', value: 'three' }
			],
			complete: true
		};
		
		if (input.slice(0,1) === 'a') {
			if (input.slice(0,2) === 'ab') {
				rtn = {
					options: [
						{ label: 'AB', value: 'ab' },
						{ label: 'ABC', value: 'abc' },
						{ label: 'ABCD', value: 'abcd' }
					],
					complete: true
				};
			} else {
				rtn = {
					options: [
						{ label: 'A', value: 'a' },
						{ label: 'AA', value: 'aa' },
						{ label: 'AB', value: 'ab' }
					],
					complete: false
				};
			}
		} else if (!input.length) {
			rtn.complete = false;
		}
		
		setTimeout(function() {
			callback(null, rtn);
		}, 500);
		
	},
	render: function() {
		return React.createElement("div", null, 
			React.createElement("label", null, this.props.label), 
			React.createElement(Select, {asyncOptions: this.loadOptions, className: "remote-example"})
		);
	}
});


var MultiSelectField = React.createClass({displayName: 'MultiSelectField',
	render: function() {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry' },
			{ label: 'Caramel', value: 'caramel' },
			{ label: 'Cookies and Cream', value: 'cookiescream' },
			{ label: 'Peppermint', value: 'peppermint' }
		];
		return React.createElement("div", null, 
			React.createElement("label", null, this.props.label), 
			React.createElement(Select, {multi: true, placeholder: "Select your favourite(s)", options: ops, onChange: logChange})
		);
	}
});


React.render(
	React.createElement("div", null, 
		React.createElement(SelectField, {label: "Select:"}), 
		React.createElement(MultiSelectField, {label: "Multiselect:"}), 
		React.createElement(RemoteSelectField, {label: "Remote Options:"})
	),
	document.getElementById('example')
);

},{"react":undefined,"react-select":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuXHRTZWxlY3QgPSByZXF1aXJlKCdyZWFjdC1zZWxlY3QnKTtcblxuZnVuY3Rpb24gbG9nQ2hhbmdlKHZhbHVlKSB7XG5cdGNvbnNvbGUubG9nKCdTZWxlY3QgdmFsdWUgY2hhbmdlZDogJyArIHZhbHVlKTtcbn1cbiBcbnZhciBTZWxlY3RGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1NlbGVjdEZpZWxkJyxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2VsZWN0VmFsdWU6ICduZXctc291dGgtd2FsZXMnXG5cdFx0fVxuXHR9LFxuXHR1cGRhdGVWYWx1ZTogZnVuY3Rpb24obmV3VmFsdWUpIHtcblx0XHRsb2dDaGFuZ2UobmV3VmFsdWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2VsZWN0VmFsdWU6IG5ld1ZhbHVlXG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG9wcyA9IFtcblx0XHRcdHsgbGFiZWw6ICdBdXN0cmFsaWFuIENhcGl0YWwgVGVycml0b3J5JywgdmFsdWU6ICdhdXN0cmFsaWFuLWNhcGl0YWwtdGVycml0b3J5JyB9LFxuXHRcdFx0eyBsYWJlbDogJ05ldyBTb3V0aCBXYWxlcycsIHZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1ZpY3RvcmlhJywgdmFsdWU6ICd2aWN0b3JpYScgfSxcblx0XHRcdHsgbGFiZWw6ICdRdWVlbnNsYW5kJywgdmFsdWU6ICdxdWVlbnNsYW5kJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1dlc3Rlcm4gQXVzdHJhbGlhJywgdmFsdWU6ICd3ZXN0ZXJuLWF1c3RyYWxpYScgfSxcblx0XHRcdHsgbGFiZWw6ICdTb3V0aCBBdXN0cmFsaWEnLCB2YWx1ZTogJ3NvdXRoLWF1c3RyYWxpYScgfSxcblx0XHRcdHsgbGFiZWw6ICdUYXNtYW5pYScsIHZhbHVlOiAndGFzbWFuaWEnIH0sXG5cdFx0XHR7IGxhYmVsOiAnTm9ydGhlcm4gVGVycml0b3J5JywgdmFsdWU6ICdub3J0aGVybi10ZXJyaXRvcnknIH1cblx0XHRdO1xuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHRoaXMucHJvcHMubGFiZWwpLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7b3B0aW9uczogb3BzLCB2YWx1ZTogdGhpcy5zdGF0ZS5zZWxlY3RWYWx1ZSwgb25DaGFuZ2U6IHRoaXMudXBkYXRlVmFsdWV9KVxuXHRcdCk7XG5cdH1cbn0pO1xuIFxudmFyIFJlbW90ZVNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnUmVtb3RlU2VsZWN0RmllbGQnLFxuXHRsb2FkT3B0aW9uczogZnVuY3Rpb24oaW5wdXQsIGNhbGxiYWNrKSB7XG5cdFx0XG5cdFx0aW5wdXQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuXHRcdFxuXHRcdHZhciBydG4gPSB7XG5cdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdHsgbGFiZWw6ICdPbmUnLCB2YWx1ZTogJ29uZScgfSxcblx0XHRcdFx0eyBsYWJlbDogJ1R3bycsIHZhbHVlOiAndHdvJyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnVGhyZWUnLCB2YWx1ZTogJ3RocmVlJyB9XG5cdFx0XHRdLFxuXHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHR9O1xuXHRcdFxuXHRcdGlmIChpbnB1dC5zbGljZSgwLDEpID09PSAnYScpIHtcblx0XHRcdGlmIChpbnB1dC5zbGljZSgwLDIpID09PSAnYWInKSB7XG5cdFx0XHRcdHJ0biA9IHtcblx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUInLCB2YWx1ZTogJ2FiJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCQycsIHZhbHVlOiAnYWJjJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCQ0QnLCB2YWx1ZTogJ2FiY2QnIH1cblx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHRcdH07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRydG4gPSB7XG5cdFx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0EnLCB2YWx1ZTogJ2EnIH0sXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUEnLCB2YWx1ZTogJ2FhJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCJywgdmFsdWU6ICdhYicgfVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0Y29tcGxldGU6IGZhbHNlXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghaW5wdXQubGVuZ3RoKSB7XG5cdFx0XHRydG4uY29tcGxldGUgPSBmYWxzZTtcblx0XHR9XG5cdFx0XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGNhbGxiYWNrKG51bGwsIHJ0bik7XG5cdFx0fSwgNTAwKTtcblx0XHRcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0aGlzLnByb3BzLmxhYmVsKSwgXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2FzeW5jT3B0aW9uczogdGhpcy5sb2FkT3B0aW9ucywgY2xhc3NOYW1lOiBcInJlbW90ZS1leGFtcGxlXCJ9KVxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbnZhciBNdWx0aVNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnTXVsdGlTZWxlY3RGaWVsZCcsXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG9wcyA9IFtcblx0XHRcdHsgbGFiZWw6ICdDaG9jb2xhdGUnLCB2YWx1ZTogJ2Nob2NvbGF0ZScgfSxcblx0XHRcdHsgbGFiZWw6ICdWYW5pbGxhJywgdmFsdWU6ICd2YW5pbGxhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1N0cmF3YmVycnknLCB2YWx1ZTogJ3N0cmF3YmVycnknIH0sXG5cdFx0XHR7IGxhYmVsOiAnQ2FyYW1lbCcsIHZhbHVlOiAnY2FyYW1lbCcgfSxcblx0XHRcdHsgbGFiZWw6ICdDb29raWVzIGFuZCBDcmVhbScsIHZhbHVlOiAnY29va2llc2NyZWFtJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1BlcHBlcm1pbnQnLCB2YWx1ZTogJ3BlcHBlcm1pbnQnIH1cblx0XHRdO1xuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHRoaXMucHJvcHMubGFiZWwpLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7bXVsdGk6IHRydWUsIHBsYWNlaG9sZGVyOiBcIlNlbGVjdCB5b3VyIGZhdm91cml0ZShzKVwiLCBvcHRpb25zOiBvcHMsIG9uQ2hhbmdlOiBsb2dDaGFuZ2V9KVxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cblJlYWN0LnJlbmRlcihcblx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcblx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdEZpZWxkLCB7bGFiZWw6IFwiU2VsZWN0OlwifSksIFxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXVsdGlTZWxlY3RGaWVsZCwge2xhYmVsOiBcIk11bHRpc2VsZWN0OlwifSksIFxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVtb3RlU2VsZWN0RmllbGQsIHtsYWJlbDogXCJSZW1vdGUgT3B0aW9uczpcIn0pXG5cdCksXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iXX0=
