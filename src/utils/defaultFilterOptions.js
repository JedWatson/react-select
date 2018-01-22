import stripDiacritics from './stripDiacritics';
import trim from './trim';

const isValid = value => {
	return typeof (value) !== 'undefined' && value !== null && value !== '';
};

const filterOptions = (options, filterValue, excludeOptions, props) => {
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

	return options.filter(option => {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(undefined, option, filterValue);
		if (!filterValue) return true;

		const value = option[props.valueKey];
		const label = option[props.labelKey];
		const hasValue = isValid(value);
		const hasLabel = isValid(label);

		if (!hasValue && !hasLabel) {
			return false;
		}

		let valueTest = hasValue ? String(value) : null;
		let labelTest = hasLabel ? String(label) : null;

		if (props.ignoreAccents) {
			if (valueTest && props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
			if (labelTest && props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
		}

		if (props.ignoreCase) {
			if (valueTest && props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (labelTest && props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}

		return props.matchPos === 'start' ? (
			(valueTest && props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue) ||
			(labelTest && props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue)
		) : (
			(valueTest && props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0) ||
			(labelTest && props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0)
		);
	});
};

export default filterOptions;
