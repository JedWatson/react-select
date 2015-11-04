/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import Contributors from './components/Contributors';
import CustomComponents from './components/CustomComponents';
import CustomRenderField from './components/CustomRenderField';
import DisabledUpsellOptions from './components/DisabledUpsellOptions';
import Multiselect from './components/Multiselect';
import NumericSelect from './components/NumericSelect';
import RemoteSelectField from './components/RemoteSelectField';
import SelectedValuesField from './components/SelectedValuesField';
import States from './components/States';

var FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' }
];
var FLAVOURS_WITH_DISABLED_OPTION = FLAVOURS.slice(0);
FLAVOURS_WITH_DISABLED_OPTION.unshift({ label: 'Caramel (You don\'t like it, apparently)', value: 'caramel', disabled: true });

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

ReactDOM.render(
	<div>
		<States label="States" searchable />
		<Multiselect label="Multiselect" />
		<Contributors label="Contributors" />
		<NumericSelect label="Numeric Values" />
		<CustomComponents label="Custom Option and Value Components" />
		{/*
		<SelectedValuesField label="Clickable labels (labels as links)" options={FLAVOURS} hint="Open the console to see click behaviour (data/event)" />
		<SelectedValuesField label="Disabled option" options={FLAVOURS_WITH_DISABLED_OPTION} hint="You savage! Caramel is the best..." />
		<DisabledUpsellOptions label="Disabled option with a link"/>
		<SelectedValuesField label="Option Creation (tags mode)" options={FLAVOURS} allowCreate hint="Enter a value that's NOT in the list, then hit return" />
		<CustomRenderField label="Custom render options/values" />
		<RemoteSelectField label="Remote Options" hint='Type anything in the remote example to asynchronously load options. Valid alternative results are "A", "AA", and "AB"' />
		*/}
	</div>,
	document.getElementById('example')
);
