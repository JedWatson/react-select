require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react'),
	Select = require('react-select');
 
var SelectField = React.createClass({displayName: 'SelectField',
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
			React.createElement(Select, {options: ops, value: this.props.value})
		);
	}
});
 
var RemoteSelectField = React.createClass({displayName: 'RemoteSelectField',
	loadOptions: function(input, callback) {
		
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
			React.createElement(Select, {asyncOptions: this.loadOptions, value: this.props.value})
		);
	}
});

/*
var MultiSelectField = React.createClass({
	render: function() {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry' }
		];
		return <div>
			<label>{this.props.label}</label>
			<Select multi={true} options={ops} value={this.props.value} />
		</div>;
	}
});
*/

React.render(
	React.createElement("div", null, 
		React.createElement(SelectField, {label: "State:"}), 
		React.createElement(RemoteSelectField, {label: "Remote:"}), 
		{/*<MultiSelectField label="Multi:"/>*/}
	),
	document.getElementById('example')
);

},{"react":undefined,"react-select":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0U2VsZWN0ID0gcmVxdWlyZSgncmVhY3Qtc2VsZWN0Jyk7XG4gXG52YXIgU2VsZWN0RmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdTZWxlY3RGaWVsZCcsXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG9wcyA9IFtcblx0XHRcdHsgbGFiZWw6ICdBdXN0cmFsaWFuIENhcGl0YWwgVGVycml0b3J5JywgdmFsdWU6ICdhdXN0cmFsaWFuLWNhcGl0YWwtdGVycml0b3J5JyB9LFxuXHRcdFx0eyBsYWJlbDogJ05ldyBTb3V0aCBXYWxlcycsIHZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1ZpY3RvcmlhJywgdmFsdWU6ICd2aWN0b3JpYScgfSxcblx0XHRcdHsgbGFiZWw6ICdRdWVlbnNsYW5kJywgdmFsdWU6ICdxdWVlbnNsYW5kJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1dlc3Rlcm4gQXVzdHJhbGlhJywgdmFsdWU6ICd3ZXN0ZXJuLWF1c3RyYWxpYScgfSxcblx0XHRcdHsgbGFiZWw6ICdTb3V0aCBBdXN0cmFsaWEnLCB2YWx1ZTogJ3NvdXRoLWF1c3RyYWxpYScgfSxcblx0XHRcdHsgbGFiZWw6ICdUYXNtYW5pYScsIHZhbHVlOiAndGFzbWFuaWEnIH0sXG5cdFx0XHR7IGxhYmVsOiAnTm9ydGhlcm4gVGVycml0b3J5JywgdmFsdWU6ICdub3J0aGVybi10ZXJyaXRvcnknIH1cblx0XHRdO1xuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHRoaXMucHJvcHMubGFiZWwpLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7b3B0aW9uczogb3BzLCB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZX0pXG5cdFx0KTtcblx0fVxufSk7XG4gXG52YXIgUmVtb3RlU2VsZWN0RmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdSZW1vdGVTZWxlY3RGaWVsZCcsXG5cdGxvYWRPcHRpb25zOiBmdW5jdGlvbihpbnB1dCwgY2FsbGJhY2spIHtcblx0XHRcblx0XHR2YXIgcnRuID0ge1xuXHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHR7IGxhYmVsOiAnT25lJywgdmFsdWU6ICdvbmUnIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdUd28nLCB2YWx1ZTogJ3R3bycgfSxcblx0XHRcdFx0eyBsYWJlbDogJ1RocmVlJywgdmFsdWU6ICd0aHJlZScgfVxuXHRcdFx0XSxcblx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0fTtcblx0XHRcblx0XHRpZiAoaW5wdXQuc2xpY2UoMCwxKSA9PT0gJ2EnKSB7XG5cdFx0XHRpZiAoaW5wdXQuc2xpY2UoMCwyKSA9PT0gJ2FiJykge1xuXHRcdFx0XHRydG4gPSB7XG5cdFx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCJywgdmFsdWU6ICdhYicgfSxcblx0XHRcdFx0XHRcdHsgbGFiZWw6ICdBQkMnLCB2YWx1ZTogJ2FiYycgfSxcblx0XHRcdFx0XHRcdHsgbGFiZWw6ICdBQkNEJywgdmFsdWU6ICdhYmNkJyB9XG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cnRuID0ge1xuXHRcdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHRcdHsgbGFiZWw6ICdBJywgdmFsdWU6ICdhJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FBJywgdmFsdWU6ICdhYScgfSxcblx0XHRcdFx0XHRcdHsgbGFiZWw6ICdBQicsIHZhbHVlOiAnYWInIH1cblx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdGNvbXBsZXRlOiBmYWxzZVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoIWlucHV0Lmxlbmd0aCkge1xuXHRcdFx0cnRuLmNvbXBsZXRlID0gZmFsc2U7XG5cdFx0fVxuXHRcdFxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRjYWxsYmFjayhudWxsLCBydG4pO1xuXHRcdH0sIDUwMCk7XG5cdFx0XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy5sYWJlbCksIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHthc3luY09wdGlvbnM6IHRoaXMubG9hZE9wdGlvbnMsIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlfSlcblx0XHQpO1xuXHR9XG59KTtcblxuLypcbnZhciBNdWx0aVNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBvcHMgPSBbXG5cdFx0XHR7IGxhYmVsOiAnQ2hvY29sYXRlJywgdmFsdWU6ICdjaG9jb2xhdGUnIH0sXG5cdFx0XHR7IGxhYmVsOiAnVmFuaWxsYScsIHZhbHVlOiAndmFuaWxsYScgfSxcblx0XHRcdHsgbGFiZWw6ICdTdHJhd2JlcnJ5JywgdmFsdWU6ICdzdHJhd2JlcnJ5JyB9XG5cdFx0XTtcblx0XHRyZXR1cm4gPGRpdj5cblx0XHRcdDxsYWJlbD57dGhpcy5wcm9wcy5sYWJlbH08L2xhYmVsPlxuXHRcdFx0PFNlbGVjdCBtdWx0aT17dHJ1ZX0gb3B0aW9ucz17b3BzfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cblx0XHQ8L2Rpdj47XG5cdH1cbn0pO1xuKi9cblxuUmVhY3QucmVuZGVyKFxuXHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0RmllbGQsIHtsYWJlbDogXCJTdGF0ZTpcIn0pLCBcblx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFJlbW90ZVNlbGVjdEZpZWxkLCB7bGFiZWw6IFwiUmVtb3RlOlwifSksIFxuXHRcdHsvKjxNdWx0aVNlbGVjdEZpZWxkIGxhYmVsPVwiTXVsdGk6XCIvPiovfVxuXHQpLFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpXG4pO1xuIl19
