/*
Note: ESLint is currently misreporting unused / undeclared variables for JSX.
These errors can be ignored until the bug has been fixed.
 */

var React = require('react'),
	Select = require('react-select');

var STATES = require('./data/states');

function logChange(value) {
	console.log('Select value changed: ' + value);
}

var CountrySelect = React.createClass({
	onClick: function() {
		this.props.onSelect(this.props.value);
	},
	render: function() {
		var className = this.props.value === this.props.selected ? 'active' : 'link';
		return <span onClick={this.onClick} className={className}>{this.props.children}</span>;
	}
});

var StatesField = React.createClass({
	getDefaultProps: function () {
		return {
			searchable: true,
			label: 'States:'
		};
	},
	getInitialState: function() {
		return {
			country: 'AU',
			selectValue: 'new-south-wales'
		};
	},
	switchCountry: function(newCountry) {
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue: function(newValue) {
		logChange('State changed to ' + newValue);
		this.setState({
			selectValue: newValue || null
		});
	},
	render: function() {
		var ops = STATES[this.state.country];
		return (
			<div>
				<label>{this.props.label}</label>
				<Select options={ops} value={this.state.selectValue} onChange={this.updateValue} searchable={this.props.searchable} />
				<div className="switcher">
					Country:
					<CountrySelect value="AU" selected={this.state.country} onSelect={this.switchCountry}>Australia</CountrySelect>
					<CountrySelect value="US" selected={this.state.country} onSelect={this.switchCountry}>US</CountrySelect>
				</div>
			</div>
		);
	}
});

var RemoteSelectField = React.createClass({
	loadOptions: function(input, callback) {
		input = input.toLowerCase();

		var rtn = {
			options: [
				{ label: 'One', value: 'one' },
				{ label: 'Two', value: 'two' },
				{ label: 'Three', value: 'three' }
			],
			complete: true
		};

		if (input.slice(0, 1) === 'a') {
			if (input.slice(0, 2) === 'ab') {
				rtn = {
					options: [
						{ label: 'AB', value: 'ab' },
						{ label: 'ABC', value: 'abc' },
						{ label: 'ABCD', value: 'abcd' }
					],
					complete: true
				};
			} else {
				rtn = {
					options: [
						{ label: 'A', value: 'a' },
						{ label: 'AA', value: 'aa' },
						{ label: 'AB', value: 'ab' }
					],
					complete: false
				};
			}
		} else if (!input.length) {
			rtn.complete = false;
		}

		setTimeout(function() {
			callback(null, rtn);
		}, 500);
	},
	render: function() {
		return (
			<div>
				<label>{this.props.label}</label>
				<Select asyncOptions={this.loadOptions} className="remote-example" />
			</div>
		);
	}
});


var MultiSelectField = React.createClass({
	render: function() {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry' },
			{ label: 'Caramel', value: 'caramel' },
			{ label: 'Cookies and Cream', value: 'cookiescream' },
			{ label: 'Peppermint', value: 'peppermint' }
		];
		return (
			<div>
				<label>{this.props.label}</label>
				<Select multi={true} placeholder="Select your favourite(s)" options={ops} onChange={logChange} />
			</div>
		);
	}
});

var SelectedValuesField = React.createClass({

	onLabelClick: function (data, event) {
		console.log(data, event);
	},

	render: function() {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry' },
			{ label: 'Caramel', value: 'caramel' },
			{ label: 'Cookies and Cream', value: 'cookiescream' },
			{ label: 'Peppermint', value: 'peppermint' }
		];
		return (
			<div>
				<label>{this.props.label}</label>
				<Select
					onOptionLabelClick={this.onLabelClick}
					value="chocolate,vanilla,strawberry"
					multi={true}
					placeholder="Select your favourite(s)"
					options={ops}
					onChange={logChange} />
			</div>
		);
	}
});

var SelectCN = require('../../lib/SelectCN');

var SelectCNField = React.createClass({
	render: function() {
		var ops = [
			{ label: '北京市', value: '0' },
			{ label: '天津市', value: '1' },
			{ label: '河北省', value: '2' },
			{ label: '山西省', value: '3' },
			{ label: '内蒙古自治区', value: '4' },
			{ label: '辽宁省', value: '5' },
			{ label: '吉林省', value: '6' },
			{ label: '黑龙江省', value: '7' },
			{ label: '上海市', value: '8' },
			{ label: '江苏省', value: '9' },
			{ label: '浙江省', value: '10' },
			{ label: '安徽省', value: '11' },
			{ label: '福建省', value: '12' },
			{ label: '江西省', value: '13' },
			{ label: '山东省', value: '14' },
			{ label: '河南省', value: '15' },
			{ label: '湖北省', value: '16' },
			{ label: '湖南省', value: '17' },
			{ label: '广东省', value: '18' },
			{ label: '广西壮族自治区', value: '19' },
			{ label: '海南省', value: '20' },
			{ label: '重庆市', value: '21' },
			{ label: '四川省', value: '22' },
			{ label: '贵州省', value: '23' },
			{ label: '云南省', value: '24' },
			{ label: '西藏自治区', value: '25' },
			{ label: '陕西省', value: '26' },
			{ label: '甘肃省', value: '27' },
			{ label: '青海省', value: '28' },
			{ label: '宁夏回族自治区', value: '29' },
			{ label: '新疆维吾尔自治区', value: '30' },
			{ label: '台灣', value: '31' },
			{ label: '香港特别行政区', value: '32' },
			{ label: '澳门特别行政区', value: '33' },
		];
		return (
			<div>
				<label>{this.props.label}</label>
				<SelectCN
					value="22"
					placeholder="选择一个省份"
					options={ops}
					onChange={logChange} />
			</div>
		);
	}
})

React.render(
	<div>
		<StatesField />
		<StatesField label="States (non-searchable):" searchable={false} />
		<MultiSelectField label="Multiselect:"/>
		<SelectedValuesField label="Clickable labels (labels as links):" />
		<RemoteSelectField label="Remote Options:"/>
		<SelectCNField label="支持拼音搜索（全拼或首字母）：" />
	</div>,
	document.getElementById('example')
);
