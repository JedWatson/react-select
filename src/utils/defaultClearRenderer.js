import React from 'react';

export default function clearRenderer ({ cssPrefix }) {
	return (
		<span
			className={`${cssPrefix}-clear`}
			dangerouslySetInnerHTML={{ __html: '&times;' }}
		/>
	);
};
