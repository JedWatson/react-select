import stripDiacritics from './stripDiacritics';
import trim from './trim';

function isValid(value) {
	return typeof (value) !== 'undefined' && value !== null && value !== '';
}

function filterOptions (options, filterValue, excludeOptions, props) {
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
		if (props.filterOption) return props.filterOption.call(this, option, filterValue);
		if (!filterValue) return true;

		var value = option[props.valueKey];
		var label = option[props.labelKey];
		var hasValue = isValid(value);
		var hasLabel = isValid(label);

		if (!hasValue && !hasLabel) {
			return false;
		}

		var valueTest = hasValue ? String(value) : null;
		var labelTest = hasLabel ? String(label) : null;

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
}

export default filterOptions;
