import React from 'react';
import PropTypes from 'prop-types';

export default function arrowRenderer({ onMouseDown }) {
	return React.createElement('span', {
		className: 'Select-arrow',
		onMouseDown: onMouseDown
	});
};

arrowRenderer.propTypes = {
	onMouseDown: PropTypes.func
};