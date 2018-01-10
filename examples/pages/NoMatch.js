// @flow
import React from 'react';
import { Link } from 'react-router-dom';

export default function NoMatch() {
	return (
		<div>
			<h1>Oops!</h1>
			<p>Couldn&apos;t find this page.</p>
			<Link to="/">Back home</Link>
		</div>
	);
}
