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

React.renderComponent(
	React.DOM.div(null, 
		SelectField({label: "State:"}), 
		RemoteSelectField({label: "Remote:"})
	),
	document.getElementById('example')
);

},{"react":undefined,"react-select":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9KZWQvRGV2ZWxvcG1lbnQvUGFja2FnZXMvcmVhY3Qtc2VsZWN0L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2V4YW1wbGVzL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG5cdFNlbGVjdCA9IHJlcXVpcmUoJ3JlYWN0LXNlbGVjdCcpO1xuIFxudmFyIFNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnU2VsZWN0RmllbGQnLFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBvcHMgPSBbXG5cdFx0XHR7IGxhYmVsOiAnQXVzdHJhbGlhbiBDYXBpdGFsIFRlcnJpdG9yeScsIHZhbHVlOiAnYXVzdHJhbGlhbi1jYXBpdGFsLXRlcnJpdG9yeScgfSxcblx0XHRcdHsgbGFiZWw6ICdOZXcgU291dGggV2FsZXMnLCB2YWx1ZTogJ25ldy1zb3V0aC13YWxlcycgfSxcblx0XHRcdHsgbGFiZWw6ICdWaWN0b3JpYScsIHZhbHVlOiAndmljdG9yaWEnIH0sXG5cdFx0XHR7IGxhYmVsOiAnUXVlZW5zbGFuZCcsIHZhbHVlOiAncXVlZW5zbGFuZCcgfSxcblx0XHRcdHsgbGFiZWw6ICdXZXN0ZXJuIEF1c3RyYWxpYScsIHZhbHVlOiAnd2VzdGVybi1hdXN0cmFsaWEnIH0sXG5cdFx0XHR7IGxhYmVsOiAnU291dGggQXVzdHJhbGlhJywgdmFsdWU6ICdzb3V0aC1hdXN0cmFsaWEnIH0sXG5cdFx0XHR7IGxhYmVsOiAnVGFzbWFuaWEnLCB2YWx1ZTogJ3Rhc21hbmlhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ05vcnRoZXJuIFRlcnJpdG9yeScsIHZhbHVlOiAnbm9ydGhlcm4tdGVycml0b3J5JyB9XG5cdFx0XTtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLmRpdihudWxsLCBcblx0XHRcdFJlYWN0LkRPTS5sYWJlbChudWxsLCB0aGlzLnByb3BzLmxhYmVsKSwgXG5cdFx0XHRTZWxlY3Qoe29wdGlvbnM6IG9wcywgdmFsdWU6IHRoaXMucHJvcHMudmFsdWV9KVxuXHRcdCk7XG5cdH1cbn0pO1xuIFxudmFyIFJlbW90ZVNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnUmVtb3RlU2VsZWN0RmllbGQnLFxuXHRsb2FkT3B0aW9uczogZnVuY3Rpb24oaW5wdXQsIGNhbGxiYWNrKSB7XG5cdFx0XG5cdFx0dmFyIHJ0biA9IHtcblx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0eyBsYWJlbDogJ09uZScsIHZhbHVlOiAnb25lJyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnVHdvJywgdmFsdWU6ICd0d28nIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdUaHJlZScsIHZhbHVlOiAndGhyZWUnIH1cblx0XHRcdF0sXG5cdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdH07XG5cdFx0XG5cdFx0aWYgKGlucHV0LnNsaWNlKDAsMSkgPT09ICdhJykge1xuXHRcdFx0aWYgKGlucHV0LnNsaWNlKDAsMikgPT09ICdhYicpIHtcblx0XHRcdFx0cnRuID0ge1xuXHRcdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHRcdHsgbGFiZWw6ICdBQicsIHZhbHVlOiAnYWInIH0sXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUJDJywgdmFsdWU6ICdhYmMnIH0sXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUJDRCcsIHZhbHVlOiAnYWJjZCcgfVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdFx0fTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJ0biA9IHtcblx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQScsIHZhbHVlOiAnYScgfSxcblx0XHRcdFx0XHRcdHsgbGFiZWw6ICdBQScsIHZhbHVlOiAnYWEnIH0sXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUInLCB2YWx1ZTogJ2FiJyB9XG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRjb21wbGV0ZTogZmFsc2Vcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCFpbnB1dC5sZW5ndGgpIHtcblx0XHRcdHJ0bi5jb21wbGV0ZSA9IGZhbHNlO1xuXHRcdH1cblx0XHRcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FsbGJhY2sobnVsbCwgcnRuKTtcblx0XHR9LCA1MDApO1xuXHRcdFxuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBSZWFjdC5ET00uZGl2KG51bGwsIFxuXHRcdFx0UmVhY3QuRE9NLmxhYmVsKG51bGwsIHRoaXMucHJvcHMubGFiZWwpLCBcblx0XHRcdFNlbGVjdCh7YXN5bmNPcHRpb25zOiB0aGlzLmxvYWRPcHRpb25zLCB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZX0pXG5cdFx0KTtcblx0fVxufSk7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChcblx0UmVhY3QuRE9NLmRpdihudWxsLCBcblx0XHRTZWxlY3RGaWVsZCh7bGFiZWw6IFwiU3RhdGU6XCJ9KSwgXG5cdFx0UmVtb3RlU2VsZWN0RmllbGQoe2xhYmVsOiBcIlJlbW90ZTpcIn0pXG5cdCksXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iXX0=
