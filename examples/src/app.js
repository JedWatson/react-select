/* eslint react/prop-types: 0 */

import React from 'react';
import Select from 'react-select';

import CustomRenderField from './components/CustomRenderField';
import MultiSelectField from './components/MultiSelectField';
import RemoteSelectField from './components/RemoteSelectField';
import SelectedValuesField from './components/SelectedValuesField';
import StatesField from './components/StatesField';
import UsersField from './components/UsersField';
import ValuesAsNumbersField from './components/ValuesAsNumbersField';

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

React.render(
	<div>
		<StatesField />
		<StatesField label="States (non-searchable):" searchable={false} />
		<UsersField label='Users (custom options/value):' />
		<ValuesAsNumbersField label="Values as numbers" />
		<MultiSelectField label="Multiselect:"/>
		<SelectedValuesField label="Clickable labels (labels as links):" options={FLAVOURS} />
		<SelectedValuesField label="Disabled option:" options={FLAVOURS_WITH_DISABLED_OPTION} />
		<SelectedValuesField label="Option Creation (tags mode):" options={FLAVOURS} allowCreate />
		<CustomRenderField label="Custom render options/values:" />
		<CustomRenderField label="Custom render multiple options/values:" multi delimiter="," />
		<RemoteSelectField label="Remote Options:"/>
	</div>,
	document.getElementById('example')
);
