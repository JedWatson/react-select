/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import Creatable from './components/Creatable';
import Contributors from './components/Contributors';
import GithubUsers from './components/GithubUsers';
import CustomComponents from './components/CustomComponents';
import CustomRender from './components/CustomRender';
import Multiselect from './components/Multiselect';
import NumericSelect from './components/NumericSelect';
import BooleanSelect from './components/BooleanSelect';
import Virtualized from './components/Virtualized';
import States from './components/States';

ReactDOM.render(
	<div>
		<div className="white-theme-container">
			<div className="components-container">
				<States label="States" searchable theme=""/>
				<Multiselect label="Multiselect" theme=""/>
				<Virtualized label="Virtualized" theme=""/>
				<Contributors label="Contributors (Async)" theme=""/>
				<GithubUsers label="Github users (Async with fetch.js)" theme="" />
				<NumericSelect label="Numeric Values" theme="" />
				<BooleanSelect label="Boolean Values" theme="" />
				<CustomRender label="Custom Render Methods" theme="" />
				<CustomComponents label="Custom Placeholder, Option, Value, and Arrow Components" theme="" />
				<Creatable
					hint="Enter a value that's NOT in the list, then hit return"
					label="Custom tag creation"
					theme=""
				/>
			</div>
		</div>
		<div className="dark-theme-container">
			<div className="components-container">
				<States label="States" searchable theme="dark"/>
				<Multiselect label="Multiselect" theme="dark"/>
				<Virtualized label="Virtualized" theme="dark"/>
				<Contributors label="Contributors (Async)" theme="dark"/>
				<GithubUsers label="Github users (Async with fetch.js)" theme="dark"/>
				<NumericSelect label="Numeric Values" theme="dark" />
				<BooleanSelect label="Boolean Values" theme="dark" />
				<CustomRender label="Custom Render Methods" theme="dark" />
				<CustomComponents label="Custom Placeholder, Option, Value, and Arrow Components" theme="dark" />
				<Creatable
					hint="Enter a value that's NOT in the list, then hit return"
					label="Custom tag creation"
					theme="dark"
				/>
			</div>
		</div>
	</div>,
	document.getElementById('example')
);
