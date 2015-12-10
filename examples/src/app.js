/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import Contributors from './components/Contributors';
import CustomComponents from './components/CustomComponents';
import CustomRender from './components/CustomRender';
import Multiselect from './components/Multiselect';
import NumericSelect from './components/NumericSelect';
import States from './components/States';
import AllowCreate from './components/AllowCreate';

ReactDOM.render(
	<div>
		<States label="States" searchable />
		<Multiselect label="Multiselect" />
		<Contributors label="Contributors (Async)" />
		<NumericSelect label="Numeric Values" />
		<CustomRender label="Custom Render Methods"/>
		<CustomComponents label="Custom Option and Value Components" />
		<AllowCreate label="Option Creation (tags mode)" allowCreate />
	</div>,
	document.getElementById('example')
);
