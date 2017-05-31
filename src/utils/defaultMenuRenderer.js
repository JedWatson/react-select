import classNames from 'classnames';
import React from 'react';

function menuRenderer ({
	focusedOption,
	instancePrefix,
	labelKey,
	onFocus,
	onSelect,
	onDelete,
	optionClassName,
	optionComponent,
	optionRenderer,
	options,
	valueArray,
	valueKey,
	onOptionRef
}) {
	let Option = optionComponent;

	return options.map((option, i) => {
		let isSelected = valueArray && valueArray.indexOf(option) > -1;
		let isFocused = option === focusedOption;
		let optionClass = classNames(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});
		// ,
			// 'is-deleted': option.deleted
		// if (option.deleted) {
		// 	return null;
		// }

		return (
			<Option
				className={optionClass}
				instancePrefix={instancePrefix}
				isDisabled={option.disabled}
				isFocused={isFocused}
				isSelected={isSelected}
				key={`option-${i}-${option[valueKey]}`}
				onFocus={onFocus}
				onSelect={onSelect}
				option={option}
				optionIndex={i}
				ref={ref => { onOptionRef(ref, isFocused); }}
				onDelete={onDelete}
			>
				{optionRenderer(option, i)}
			</Option>
				// isDeleted={option.deleted}
		);
	});
}

module.exports = menuRenderer;
