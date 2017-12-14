import classNames from 'classnames';
import React from 'react';

function menuRenderer ({
	focusedOption,
	focusOption,
	inputValue,
	instancePrefix,
	labelKey,
	onFocus,
	onOptionRef,
	onSelect,
	optionClassName,
	optionComponent,
	optionRenderer,
	options,
	removeValue,
	selectValue,
	valueArray,
	valueKey,
}) {
	let Option = optionComponent;

	return options.map((option, i) => {
		let isSelected = valueArray && valueArray.some(x => x[valueKey] == option[valueKey]);
		let isFocused = option === focusedOption;
		let optionClass = classNames(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled,
		});

		return (
			<Option
				className={optionClass}
				focusOption={focusOption}
				inputValue={inputValue}
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
				removeValue={removeValue}
				selectValue={selectValue}
			>
				{optionRenderer(option, i, inputValue)}
			</Option>
		);
	});
}

export default menuRenderer;
