import React from 'react';
import PropTypes from 'prop-types';

export default function arrowRenderer (props) {
	return (
		<span
			className="Select-arrow"
			onMouseDown={props.onMouseDown}
		/>
	);
};

arrowRenderer.propTypes = {
	onMouseDown: PropTypes.func,
};
