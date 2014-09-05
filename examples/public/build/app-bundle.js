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
		return React.DOM.div(null, 
			React.DOM.label(null, this.props.label), 
			Select({options: ops, value: this.props.value})
		);
	}
});

React.renderComponent(
	SelectField({label: "State:"}),
	document.getElementById('example')
);

},{"react":undefined,"react-select":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9KZWQvRGV2ZWxvcG1lbnQvUGFja2FnZXMvcmVhY3Qtc2VsZWN0L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2V4YW1wbGVzL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuXHRTZWxlY3QgPSByZXF1aXJlKCdyZWFjdC1zZWxlY3QnKTtcbiBcbnZhciBTZWxlY3RGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1NlbGVjdEZpZWxkJyxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgb3BzID0gW1xuXHRcdFx0eyBsYWJlbDogJ0F1c3RyYWxpYW4gQ2FwaXRhbCBUZXJyaXRvcnknLCB2YWx1ZTogJ2F1c3RyYWxpYW4tY2FwaXRhbC10ZXJyaXRvcnknIH0sXG5cdFx0XHR7IGxhYmVsOiAnTmV3IFNvdXRoIFdhbGVzJywgdmFsdWU6ICduZXctc291dGgtd2FsZXMnIH0sXG5cdFx0XHR7IGxhYmVsOiAnVmljdG9yaWEnLCB2YWx1ZTogJ3ZpY3RvcmlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1F1ZWVuc2xhbmQnLCB2YWx1ZTogJ3F1ZWVuc2xhbmQnIH0sXG5cdFx0XHR7IGxhYmVsOiAnV2VzdGVybiBBdXN0cmFsaWEnLCB2YWx1ZTogJ3dlc3Rlcm4tYXVzdHJhbGlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1NvdXRoIEF1c3RyYWxpYScsIHZhbHVlOiAnc291dGgtYXVzdHJhbGlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1Rhc21hbmlhJywgdmFsdWU6ICd0YXNtYW5pYScgfSxcblx0XHRcdHsgbGFiZWw6ICdOb3J0aGVybiBUZXJyaXRvcnknLCB2YWx1ZTogJ25vcnRoZXJuLXRlcnJpdG9yeScgfVxuXHRcdF07XG5cdFx0cmV0dXJuIFJlYWN0LkRPTS5kaXYobnVsbCwgXG5cdFx0XHRSZWFjdC5ET00ubGFiZWwobnVsbCwgdGhpcy5wcm9wcy5sYWJlbCksIFxuXHRcdFx0U2VsZWN0KHtvcHRpb25zOiBvcHMsIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlfSlcblx0XHQpO1xuXHR9XG59KTtcblxuUmVhY3QucmVuZGVyQ29tcG9uZW50KFxuXHRTZWxlY3RGaWVsZCh7bGFiZWw6IFwiU3RhdGU6XCJ9KSxcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxuKTtcbiJdfQ==
