require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./examples/src/app.js":[function(require,module,exports){
var React = require('react'),
	Select = require('react-select');
 
var SelectField = React.createClass({displayName: 'SelectField',
	changed: function(value) {
		console.log('Select value changed: ' + value);
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
			React.createElement(Select, {options: ops, value: this.props.value, onChange: this.changed})
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
			React.createElement(Select, {asyncOptions: this.loadOptions, value: this.props.value, className: "remote-example"})
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

},{"react":false,"react-select":false}]},{},["./examples/src/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG5cdFNlbGVjdCA9IHJlcXVpcmUoJ3JlYWN0LXNlbGVjdCcpO1xuIFxudmFyIFNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnU2VsZWN0RmllbGQnLFxuXHRjaGFuZ2VkOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdGNvbnNvbGUubG9nKCdTZWxlY3QgdmFsdWUgY2hhbmdlZDogJyArIHZhbHVlKTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgb3BzID0gW1xuXHRcdFx0eyBsYWJlbDogJ0F1c3RyYWxpYW4gQ2FwaXRhbCBUZXJyaXRvcnknLCB2YWx1ZTogJ2F1c3RyYWxpYW4tY2FwaXRhbC10ZXJyaXRvcnknIH0sXG5cdFx0XHR7IGxhYmVsOiAnTmV3IFNvdXRoIFdhbGVzJywgdmFsdWU6ICduZXctc291dGgtd2FsZXMnIH0sXG5cdFx0XHR7IGxhYmVsOiAnVmljdG9yaWEnLCB2YWx1ZTogJ3ZpY3RvcmlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1F1ZWVuc2xhbmQnLCB2YWx1ZTogJ3F1ZWVuc2xhbmQnIH0sXG5cdFx0XHR7IGxhYmVsOiAnV2VzdGVybiBBdXN0cmFsaWEnLCB2YWx1ZTogJ3dlc3Rlcm4tYXVzdHJhbGlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1NvdXRoIEF1c3RyYWxpYScsIHZhbHVlOiAnc291dGgtYXVzdHJhbGlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1Rhc21hbmlhJywgdmFsdWU6ICd0YXNtYW5pYScgfSxcblx0XHRcdHsgbGFiZWw6ICdOb3J0aGVybiBUZXJyaXRvcnknLCB2YWx1ZTogJ25vcnRoZXJuLXRlcnJpdG9yeScgfVxuXHRcdF07XG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy5sYWJlbCksIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtvcHRpb25zOiBvcHMsIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCBvbkNoYW5nZTogdGhpcy5jaGFuZ2VkfSlcblx0XHQpO1xuXHR9XG59KTtcbiBcbnZhciBSZW1vdGVTZWxlY3RGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1JlbW90ZVNlbGVjdEZpZWxkJyxcblx0bG9hZE9wdGlvbnM6IGZ1bmN0aW9uKGlucHV0LCBjYWxsYmFjaykge1xuXHRcdFxuXHRcdHZhciBydG4gPSB7XG5cdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdHsgbGFiZWw6ICdPbmUnLCB2YWx1ZTogJ29uZScgfSxcblx0XHRcdFx0eyBsYWJlbDogJ1R3bycsIHZhbHVlOiAndHdvJyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnVGhyZWUnLCB2YWx1ZTogJ3RocmVlJyB9XG5cdFx0XHRdLFxuXHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHR9O1xuXHRcdFxuXHRcdGlmIChpbnB1dC5zbGljZSgwLDEpID09PSAnYScpIHtcblx0XHRcdGlmIChpbnB1dC5zbGljZSgwLDIpID09PSAnYWInKSB7XG5cdFx0XHRcdHJ0biA9IHtcblx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUInLCB2YWx1ZTogJ2FiJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCQycsIHZhbHVlOiAnYWJjJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCQ0QnLCB2YWx1ZTogJ2FiY2QnIH1cblx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHRcdH07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRydG4gPSB7XG5cdFx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0EnLCB2YWx1ZTogJ2EnIH0sXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUEnLCB2YWx1ZTogJ2FhJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCJywgdmFsdWU6ICdhYicgfVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0Y29tcGxldGU6IGZhbHNlXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghaW5wdXQubGVuZ3RoKSB7XG5cdFx0XHRydG4uY29tcGxldGUgPSBmYWxzZTtcblx0XHR9XG5cdFx0XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGNhbGxiYWNrKG51bGwsIHJ0bik7XG5cdFx0fSwgNTAwKTtcblx0XHRcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0aGlzLnByb3BzLmxhYmVsKSwgXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2FzeW5jT3B0aW9uczogdGhpcy5sb2FkT3B0aW9ucywgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIGNsYXNzTmFtZTogXCJyZW1vdGUtZXhhbXBsZVwifSlcblx0XHQpO1xuXHR9XG59KTtcblxuLypcbnZhciBNdWx0aVNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBvcHMgPSBbXG5cdFx0XHR7IGxhYmVsOiAnQ2hvY29sYXRlJywgdmFsdWU6ICdjaG9jb2xhdGUnIH0sXG5cdFx0XHR7IGxhYmVsOiAnVmFuaWxsYScsIHZhbHVlOiAndmFuaWxsYScgfSxcblx0XHRcdHsgbGFiZWw6ICdTdHJhd2JlcnJ5JywgdmFsdWU6ICdzdHJhd2JlcnJ5JyB9XG5cdFx0XTtcblx0XHRyZXR1cm4gPGRpdj5cblx0XHRcdDxsYWJlbD57dGhpcy5wcm9wcy5sYWJlbH08L2xhYmVsPlxuXHRcdFx0PFNlbGVjdCBtdWx0aT17dHJ1ZX0gb3B0aW9ucz17b3BzfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cblx0XHQ8L2Rpdj47XG5cdH1cbn0pO1xuKi9cblxuUmVhY3QucmVuZGVyKFxuXHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0RmllbGQsIHtsYWJlbDogXCJTdGF0ZTpcIn0pLCBcblx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFJlbW90ZVNlbGVjdEZpZWxkLCB7bGFiZWw6IFwiUmVtb3RlOlwifSksIFxuXHRcdHsvKjxNdWx0aVNlbGVjdEZpZWxkIGxhYmVsPVwiTXVsdGk6XCIvPiovfVxuXHQpLFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpXG4pO1xuIl19
