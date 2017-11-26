import React from 'react';

export default function clearRenderer () {
	return (
		<span
			className="Select-clear"
			dangerouslySetInnerHTML={{ __html: '&times;' }}
		/>
	);
};
