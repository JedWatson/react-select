import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Gravatar from 'react-gravatar';

const USERS = require('../data/users');
const GRAVATAR_SIZE = 15;

const stringOrNode = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.node,
]);

const GravatarSearchableMenuComponent = createClass({
	propTypes: {
		children: PropTypes.node,
		instancePrefix: PropTypes.string,
		menuContainerStyle: PropTypes.string,
		menuStyle: PropTypes.string,
		onMenuContainerRef: PropTypes.func,
		onMenuMouseDown: PropTypes.func,
		onMenuRef: PropTypes.func,
		onMenuScroll: PropTypes.func
	},
	render () {
		const { onMenuContainerRef, menuContainerStyle, instancePrefix, onMenuMouseDown, onMenuScroll, onMenuRef, menuStyle, children } = this.props;

		const headerFooterStyle = {
			border: 1,
			borderColor: '#aaa',
			color: '#aaa',
			borderStyle: 'dashed',
			textAlign: 'center',
			padding: 10,
			margin: 10
		};

		const customStyle = menuContainerStyle || {};
		customStyle.maxHeight = 230;

		return (<div
			ref={onMenuContainerRef}
			className="Select-menu-outer"
			style={customStyle}>
			<div style={headerFooterStyle}>Perhaps a header...</div>
			<div
				className="Select-menu"
				id={`${instancePrefix}-list`}
				onMouseDown={onMenuMouseDown}
				onScroll={onMenuScroll}
				ref={onMenuRef}
				role="listbox"
				style={menuStyle}
				tabIndex={-1}
			>
				{children}
			</div>
			<div style={headerFooterStyle}>or a footer...</div>
		</div>);
	}
});

const GravatarOption = createClass({
	propTypes: {
		children: PropTypes.node,
		className: PropTypes.string,
		isDisabled: PropTypes.bool,
		isFocused: PropTypes.bool,
		isSelected: PropTypes.bool,
		onFocus: PropTypes.func,
		onSelect: PropTypes.func,
		option: PropTypes.object.isRequired,
	},
	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
	render () {
		let gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};
		return (
			<div className={this.props.className}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={this.props.option.title}>
				<Gravatar email={this.props.option.email} size={GRAVATAR_SIZE} style={gravatarStyle} />
				{this.props.children}
			</div>
		);
	}
});

const GravatarValue = createClass({
	propTypes: {
		children: PropTypes.node,
		placeholder: stringOrNode,
		value: PropTypes.object
	},
	render () {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};
		return (
			<div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					<Gravatar email={this.props.value.email} size={GRAVATAR_SIZE} style={gravatarStyle} />
					{this.props.children}
				</span>
			</div>
		);
	}
});

const UsersField = createClass({
	propTypes: {
		hint: PropTypes.string,
		label: PropTypes.string,
	},
	getInitialState () {
		return {};
	},
	setValue (value) {
		this.setState({ value });
	},
	render () {
		var placeholder = <span>&#9786; Select User</span>;

		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/CustomComponents.js">(Source)</a></h3>
				<Select
					arrowRenderer={arrowRenderer}
					onChange={this.setValue}
					optionComponent={GravatarOption}
					options={USERS}
					placeholder={placeholder}
					value={this.state.value}
					valueComponent={GravatarValue}
					outerComponent={GravatarSearchableMenuComponent}
				/>
				<div className="hint">
					This example implements custom Option and Value components to render a Gravatar image for each user based on their email.
					It also demonstrates rendering HTML elements as the placeholder.
				</div>
			</div>
		);
	}
});

function arrowRenderer () {
	return (
		<span>+</span>
	);
}

module.exports = UsersField;
