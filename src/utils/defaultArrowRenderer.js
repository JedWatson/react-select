import React from 'react';

export default function arrowRenderer ({ onMouseDown, cssPrefix }) {
	return (
		<span
			className={`${cssPrefix}-arrow`}
			onMouseDown={onMouseDown}
		/>
	);
};
