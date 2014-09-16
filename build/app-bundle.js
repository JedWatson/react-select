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
		return React.DOM.div(null, 
			React.DOM.label(null, this.props.label), 
			Select({asyncOptions: this.loadOptions, value: this.props.value})
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

React.renderComponent(
	React.DOM.div(null, 
		SelectField({label: "State:"}), 
		RemoteSelectField({label: "Remote:"}), 
		{/*<MultiSelectField label="Multi:"/>*/}
	),
	document.getElementById('example')
);

},{"react":undefined,"react-select":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9KZWQvRGV2ZWxvcG1lbnQvUGFja2FnZXMvcmVhY3Qtc2VsZWN0L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2V4YW1wbGVzL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuXHRTZWxlY3QgPSByZXF1aXJlKCdyZWFjdC1zZWxlY3QnKTtcbiBcbnZhciBTZWxlY3RGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1NlbGVjdEZpZWxkJyxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgb3BzID0gW1xuXHRcdFx0eyBsYWJlbDogJ0F1c3RyYWxpYW4gQ2FwaXRhbCBUZXJyaXRvcnknLCB2YWx1ZTogJ2F1c3RyYWxpYW4tY2FwaXRhbC10ZXJyaXRvcnknIH0sXG5cdFx0XHR7IGxhYmVsOiAnTmV3IFNvdXRoIFdhbGVzJywgdmFsdWU6ICduZXctc291dGgtd2FsZXMnIH0sXG5cdFx0XHR7IGxhYmVsOiAnVmljdG9yaWEnLCB2YWx1ZTogJ3ZpY3RvcmlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1F1ZWVuc2xhbmQnLCB2YWx1ZTogJ3F1ZWVuc2xhbmQnIH0sXG5cdFx0XHR7IGxhYmVsOiAnV2VzdGVybiBBdXN0cmFsaWEnLCB2YWx1ZTogJ3dlc3Rlcm4tYXVzdHJhbGlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1NvdXRoIEF1c3RyYWxpYScsIHZhbHVlOiAnc291dGgtYXVzdHJhbGlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1Rhc21hbmlhJywgdmFsdWU6ICd0YXNtYW5pYScgfSxcblx0XHRcdHsgbGFiZWw6ICdOb3J0aGVybiBUZXJyaXRvcnknLCB2YWx1ZTogJ25vcnRoZXJuLXRlcnJpdG9yeScgfVxuXHRcdF07XG5cdFx0cmV0dXJuIFJlYWN0LkRPTS5kaXYobnVsbCwgXG5cdFx0XHRSZWFjdC5ET00ubGFiZWwobnVsbCwgdGhpcy5wcm9wcy5sYWJlbCksIFxuXHRcdFx0U2VsZWN0KHtvcHRpb25zOiBvcHMsIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlfSlcblx0XHQpO1xuXHR9XG59KTtcbiBcbnZhciBSZW1vdGVTZWxlY3RGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1JlbW90ZVNlbGVjdEZpZWxkJyxcblx0bG9hZE9wdGlvbnM6IGZ1bmN0aW9uKGlucHV0LCBjYWxsYmFjaykge1xuXHRcdFxuXHRcdHZhciBydG4gPSB7XG5cdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdHsgbGFiZWw6ICdPbmUnLCB2YWx1ZTogJ29uZScgfSxcblx0XHRcdFx0eyBsYWJlbDogJ1R3bycsIHZhbHVlOiAndHdvJyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnVGhyZWUnLCB2YWx1ZTogJ3RocmVlJyB9XG5cdFx0XHRdLFxuXHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHR9O1xuXHRcdFxuXHRcdGlmIChpbnB1dC5zbGljZSgwLDEpID09PSAnYScpIHtcblx0XHRcdGlmIChpbnB1dC5zbGljZSgwLDIpID09PSAnYWInKSB7XG5cdFx0XHRcdHJ0biA9IHtcblx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUInLCB2YWx1ZTogJ2FiJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCQycsIHZhbHVlOiAnYWJjJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCQ0QnLCB2YWx1ZTogJ2FiY2QnIH1cblx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHRcdH07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRydG4gPSB7XG5cdFx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0EnLCB2YWx1ZTogJ2EnIH0sXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUEnLCB2YWx1ZTogJ2FhJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCJywgdmFsdWU6ICdhYicgfVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0Y29tcGxldGU6IGZhbHNlXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghaW5wdXQubGVuZ3RoKSB7XG5cdFx0XHRydG4uY29tcGxldGUgPSBmYWxzZTtcblx0XHR9XG5cdFx0XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGNhbGxiYWNrKG51bGwsIHJ0bik7XG5cdFx0fSwgNTAwKTtcblx0XHRcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLmRpdihudWxsLCBcblx0XHRcdFJlYWN0LkRPTS5sYWJlbChudWxsLCB0aGlzLnByb3BzLmxhYmVsKSwgXG5cdFx0XHRTZWxlY3Qoe2FzeW5jT3B0aW9uczogdGhpcy5sb2FkT3B0aW9ucywgdmFsdWU6IHRoaXMucHJvcHMudmFsdWV9KVxuXHRcdCk7XG5cdH1cbn0pO1xuXG4vKlxudmFyIE11bHRpU2VsZWN0RmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG9wcyA9IFtcblx0XHRcdHsgbGFiZWw6ICdDaG9jb2xhdGUnLCB2YWx1ZTogJ2Nob2NvbGF0ZScgfSxcblx0XHRcdHsgbGFiZWw6ICdWYW5pbGxhJywgdmFsdWU6ICd2YW5pbGxhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1N0cmF3YmVycnknLCB2YWx1ZTogJ3N0cmF3YmVycnknIH1cblx0XHRdO1xuXHRcdHJldHVybiA8ZGl2PlxuXHRcdFx0PGxhYmVsPnt0aGlzLnByb3BzLmxhYmVsfTwvbGFiZWw+XG5cdFx0XHQ8U2VsZWN0IG11bHRpPXt0cnVlfSBvcHRpb25zPXtvcHN9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuXHRcdDwvZGl2Pjtcblx0fVxufSk7XG4qL1xuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQoXG5cdFJlYWN0LkRPTS5kaXYobnVsbCwgXG5cdFx0U2VsZWN0RmllbGQoe2xhYmVsOiBcIlN0YXRlOlwifSksIFxuXHRcdFJlbW90ZVNlbGVjdEZpZWxkKHtsYWJlbDogXCJSZW1vdGU6XCJ9KSwgXG5cdFx0ey8qPE11bHRpU2VsZWN0RmllbGQgbGFiZWw9XCJNdWx0aTpcIi8+Ki99XG5cdCksXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iXX0=
