import classNames from 'classnames';
import React from 'react';

export default function menuRenderer({
																			 focusedOption,
																			 instancePrefix,
																			 labelKey,
																			 onFocus,
																			 onSelect,
																			 optionClassName,
																			 optionComponent,
																			 optionRenderer,
																			 options,
																			 valueArray,
																			 valueKey,
																			 onOptionRef
																		 }) {
	return options.map(function (option, i) {
		const optionProps = {
			instancePrefix: instancePrefix,
			isDisabled: option.disabled,
			isFocused: option === focusedOption,
			isSelected: valueArray && valueArray.indexOf(option) > -1,
			key: `option-${i}-${option[ valueKey ]}`,
			onFocus: onFocus,
			onSelect: onSelect,
			option: option,
			optionIndex: i,
		};
		return React.createElement(
			optionComponent,
			Object.assign(
				optionProps,
				{
					ref: ref => onOptionRef(ref, optionProps.isFocused),
					className: classNames(optionClassName, {
						'Select-option': true,
						'is-selected': optionProps.isSelected,
						'is-focused': optionProps.isFocused,
						'is-disabled': option.disabled,
					})
				}
			),
			optionRenderer(option, i)
		);
	});
};
