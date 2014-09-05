require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./examples/src/app.js":[function(require,module,exports){
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

},{"react":false,"react-select":false}]},{},["./examples/src/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3JlYWN0LXNlbGVjdC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLi9leGFtcGxlcy9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0U2VsZWN0ID0gcmVxdWlyZSgncmVhY3Qtc2VsZWN0Jyk7XG4gXG52YXIgU2VsZWN0RmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdTZWxlY3RGaWVsZCcsXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG9wcyA9IFtcblx0XHRcdHsgbGFiZWw6ICdBdXN0cmFsaWFuIENhcGl0YWwgVGVycml0b3J5JywgdmFsdWU6ICdhdXN0cmFsaWFuLWNhcGl0YWwtdGVycml0b3J5JyB9LFxuXHRcdFx0eyBsYWJlbDogJ05ldyBTb3V0aCBXYWxlcycsIHZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1ZpY3RvcmlhJywgdmFsdWU6ICd2aWN0b3JpYScgfSxcblx0XHRcdHsgbGFiZWw6ICdRdWVlbnNsYW5kJywgdmFsdWU6ICdxdWVlbnNsYW5kJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1dlc3Rlcm4gQXVzdHJhbGlhJywgdmFsdWU6ICd3ZXN0ZXJuLWF1c3RyYWxpYScgfSxcblx0XHRcdHsgbGFiZWw6ICdTb3V0aCBBdXN0cmFsaWEnLCB2YWx1ZTogJ3NvdXRoLWF1c3RyYWxpYScgfSxcblx0XHRcdHsgbGFiZWw6ICdUYXNtYW5pYScsIHZhbHVlOiAndGFzbWFuaWEnIH0sXG5cdFx0XHR7IGxhYmVsOiAnTm9ydGhlcm4gVGVycml0b3J5JywgdmFsdWU6ICdub3J0aGVybi10ZXJyaXRvcnknIH1cblx0XHRdO1xuXHRcdHJldHVybiBSZWFjdC5ET00uZGl2KG51bGwsIFxuXHRcdFx0UmVhY3QuRE9NLmxhYmVsKG51bGwsIHRoaXMucHJvcHMubGFiZWwpLCBcblx0XHRcdFNlbGVjdCh7b3B0aW9uczogb3BzLCB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZX0pXG5cdFx0KTtcblx0fVxufSk7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChcblx0U2VsZWN0RmllbGQoe2xhYmVsOiBcIlN0YXRlOlwifSksXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iXX0=
