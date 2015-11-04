/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import Contributors from './components/Contributors';
import CustomComponents from './components/CustomComponents';
import CustomRender from './components/CustomRender';
import Multiselect from './components/Multiselect';
import NumericSelect from './components/NumericSelect';
import RemoteSelectField from './components/RemoteSelectField';
import SelectedValuesField from './components/SelectedValuesField';
import States from './components/States';

ReactDOM.render(
	<div>
		<States label="States" searchable />
		<Multiselect label="Multiselect" />
		<Contributors label="Contributors" />
		<NumericSelect label="Numeric Values" />
		<CustomRender label="Custom Render Methods"/>
		<CustomComponents label="Custom Option and Value Components" />
		{/*
		<SelectedValuesField label="Option Creation (tags mode)" options={FLAVOURS} allowCreate hint="Enter a value that's NOT in the list, then hit return" />
		<RemoteSelectField label="Remote Options" hint='Type anything in the remote example to asynchronously load options. Valid alternative results are "A", "AA", and "AB"' />
		*/}
	</div>,
	document.getElementById('example')
);
