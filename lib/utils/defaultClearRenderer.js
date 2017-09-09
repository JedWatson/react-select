import React from 'react';

export default function clearRenderer() {
	return React.createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
};