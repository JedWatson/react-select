/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import Contributors from './components/Contributors';
import GithubUsers from './components/GithubUsers';
import CustomComponents from './components/CustomComponents';
import CustomRender from './components/CustomRender';
import Multiselect from './components/Multiselect';
import NumericSelect from './components/NumericSelect';
import Virtualized from './components/Virtualized';
import States from './components/States';
import Vehicles from './components/Vehicles';

ReactDOM.render(
	<div>

		<Multiselect label="Multiselect" />

	</div>,
	document.getElementById('example')
);
