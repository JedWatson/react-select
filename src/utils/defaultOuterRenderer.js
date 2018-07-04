import PropTypes from 'prop-types';
import React from 'react';

const outerRenderer = ({
	instancePrefix,
	menuComponent,
	menuContainerStyle,
	menuStyle,
	onMenuContainerRef,
	onMenuMouseDown,
	onMenuRef,
	onMenuScroll,
	outerComponent
}) => {

	const Outer = outerComponent;

	return (
		<Outer
			onMenuContainerRef={onMenuContainerRef}
			menuContainerStyle={menuContainerStyle}
			instancePrefix={instancePrefix}
			onMenuMouseDown={onMenuMouseDown}
			onMenuScroll={onMenuScroll}
			onMenuRef={onMenuRef}
			menuStyle={menuStyle}>
			{menuComponent}
		</Outer>
	);
};

outerRenderer.propTypes = {
	instancePrefix: PropTypes.string,
	menuComponent: PropTypes.object,
	menuContainerStyle: PropTypes.object,
	menuStyle: PropTypes.object,
	onMenuContainerRef: PropTypes.func,
	onMenuMouseDown: PropTypes.func,
	onMenuRef: PropTypes.func,
	onMenuScroll: PropTypes.func,
	outerComponent: PropTypes.node
};

export default outerRenderer;


