import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

class Outer extends React.Component {

	render () {
		const { onMenuContainerRef, menuContainerStyle, instancePrefix, onMenuMouseDown, onMenuScroll, onMenuRef, menuStyle, children } = this.props;

		return (<div
			ref={onMenuContainerRef}
			className="Select-menu-outer"
			style={menuContainerStyle}>
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
		</div>);
	}
}

Outer.propTypes = {
	children: PropTypes.node,
	instancePrefix: PropTypes.string,			// instance prefix
	menuContainerStyle: PropTypes.object,		// menu container style
	menuStyle: PropTypes.object,				// menu style
	onMenuContainerRef: PropTypes.func,			// method to handle setting menuContainer ref
	onMenuMouseDown: PropTypes.func,			// method to handle mouseDown on the menu
	onMenuRef: PropTypes.func,					// method to handle setting menu ref
	onMenuScroll: PropTypes.func
};

export default Outer;
