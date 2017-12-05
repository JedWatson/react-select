/** forked from https://github.com/Diokuz/react-baron **/

'use strict';

let React = require('react');
let createClass = require('create-react-class');
let baron = require('baron');

function getDOMNode(ref) {
	if (React.version < '0.14.0' && ref && ref.getDOMNode) {
		return ref.getDOMNode();
	}

	return ref;
}

let Baron = createClass({
	displayName: 'Baron',

	componentDidMount: function() {
		const clipper = getDOMNode(this.refs.clipper);
		const scroller = getDOMNode(this.refs.scroller);
		const track = getDOMNode(this.refs.track);
		const bar = getDOMNode(this.refs.bar);

		this.baron = baron({
			root: clipper,
			scroller: scroller,
			barOnCls: this.props.barOnCls,
			direction: this.props.direction,
			track: track,
			bar: bar,
			impact: this.props.impact,
			cssGuru: this.props.cssGuru,
			scrollingCls: this.props.scrollingCls,
		});
	},

	componentDidUpdate: function() {
		if(this.baron){
			this.baron.update();
		}
	},

	scrollToLast: function() {
		const scroll = this.props.direction === 'v' ? 'scrollTop' : 'scrollLeft';
		const size = this.props.direction === 'v' ? 'scrollHeight' : 'scrollWidth';
		const node = getDOMNode(this.refs.scroller);

		node[scroll] = node[size];
	},

	getScroller: function() {
		return getDOMNode(this.refs.scroller);
	},

	getClipper: function() {
		return getDOMNode(this.refs.clipper);
	},

	componentWillUnmount: function() {
		if(this.baron) {
			this.baron.dispose();
		}
	},

	render: function render() {
		let barCls = this.props.barCls;
		let trackCls = this.props.trackCls;

		if (this.props.direction === 'h') {
			barCls += ' ' + this.props.hModifier;
			trackCls += ' ' + this.props.hModifier;
		}

		return React.createElement(
			'div',
			{ className: this.props.clipperCls, ref: 'clipper' },
			React.createElement(
				'div',
				{
					className: this.props.scrollerCls,
					ref: 'scroller',
					onScroll: this.props.onScroll,
				},
				this.props.children
			),
			React.createElement(
				'div',
				{ className: trackCls, ref: 'track' },
				React.createElement('div', { className: barCls, ref: 'bar' })
			)
		);
	},
});

Baron.defaultProps = {
	clipperCls: 'clipper',
	scrollerCls: 'scroller',
	trackCls: 'track',
	barCls: 'bar',
	barOnCls: 'baron',
	direction: 'v',
	hModifier: '_h',
	impact: undefined,
	scrollingCls: '_scrolling',
};

module.exports = Baron;
