import React from 'react';

const clearRenderer = () => {
	return (
		<span
			className="Select-clear"
			dangerouslySetInnerHTML={{ __html: '&times;' }}
		/>
	);
};

export default clearRenderer;
