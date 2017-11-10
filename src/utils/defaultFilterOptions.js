import stripDiacritics from './stripDiacritics';
import trim from './trim';

function renderOptions(option, filterValue, excludeOptions, props, earlyMatchRequired) {
	if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
	if (props.filterOption) return props.filterOption.call(this, option, filterValue);
	if (!filterValue) return true;
	var valueTest = String(option[props.valueKey]);
	var labelTest = String(option[props.labelKey]);
	if (props.ignoreAccents) {
		if (props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
		if (props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
	}
	if (props.ignoreCase) {
		if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
		if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
	}
	if(earlyMatchRequired) {
		return props.matchPos === 'start' ? (
			(props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue) ||
			(props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue)
		) : (
			(props.matchProp !== 'label' && valueTest.indexOf(filterValue) == 0) ||
			(props.matchProp !== 'value' && labelTest.indexOf(filterValue) == 0)
		);
	} else {
		return props.matchPos === 'start' ? (
			(props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue) ||
			(props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue)
		) : (
			(props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0) ||
			(props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0)
		);
	}
}

function filterOptions (options, filterValue, excludeOptions, props) {
	var _this = this;
	
	if (props.ignoreAccents) {
		filterValue = stripDiacritics(filterValue);
	}

	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (props.trimFilter) {
		filterValue = trim(filterValue);
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(i => i[props.valueKey]);
	var optionsStartWithFilterValue = options.filter(function (option) {
		return renderOptions(option, filterValue, excludeOptions, props, true)
	});
	var optionsContainFilterValue = options.filter(function (option) {
		return renderOptions(option, filterValue, excludeOptions, props);
	});
	return props.preferEarlyMatch ?
		optionsStartWithFilterValue.concat(optionsContainFilterValue)
		:
		optionsContainFilterValue;
}

export default filterOptions;
