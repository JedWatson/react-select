import React from 'react';
import PropTypes from 'prop-types';

const arrowRenderer = ({ onMouseDown }) => {
	return (
		<span
			className="Select-arrow"
			onMouseDown={onMouseDown}
		/>
	);
};

arrowRenderer.propTypes = {
	onMouseDown: PropTypes.func,
};

export default arrowRenderer;
