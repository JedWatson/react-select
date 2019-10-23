import React, { forwardRef, useCallback, useState } from 'react';

export const defaultProps = {
  defaultInputValue: '',
  defaultMenuIsOpen: false,
  defaultValue: null,
};

const manageState = SelectComponent =>
  forwardRef(
    (
      {
        value: valueProp,
        onChange: onChangeProp,
        defaultValue = null,
        inputValue: inputValueProp,
        onInputChange: onInputChangeProp,
        defaultInputValue = '',
        menuIsOpen: menuIsOpenProp,
        onMenuOpen: onMenuOpenProp,
        onMenuClose: onMenuCloseProp,
        defaultMenuIsOpen = false,
        ...props
      },
      ref
    ) => {
      const [valueState, setValue] = useState(defaultValue);
      const [inputValueState, setInputValue] = useState(defaultInputValue);
      const [menuIsOpenState, setMenuIsOpen] = useState(defaultMenuIsOpen);

      const value = valueProp !== undefined ? valueProp : valueState;
      const inputValue =
        inputValueProp !== undefined ? inputValueProp : inputValueState;
      const menuIsOpen =
        menuIsOpenProp !== undefined ? menuIsOpenProp : menuIsOpenState;

      const onChange = useCallback(
        (newValue, actionMeta) => {
          if (typeof onChangeProp === 'function') {
            onChangeProp(newValue, actionMeta);
          }
          setValue(newValue);
        },
        [onChangeProp]
      );

      const onInputChange = useCallback(
        (newInputValue, actionMeta) => {
          // TODO: for backwards compatibility, we allow the prop to return a new
          // value; remove this in the next major version (breaking change)
          const modifiedInputValue =
            typeof onInputChangeProp === 'function'
              ? onInputChangeProp(inputValue, actionMeta)
              : undefined;
          setInputValue(
            modifiedInputValue !== undefined
              ? modifiedInputValue
              : newInputValue
          );
        },
        [onInputChangeProp]
      );

      const onMenuOpen = useCallback(() => {
        if (typeof onMenuOpenProp === 'function') {
          onMenuOpenProp();
        }
        setMenuIsOpen(true);
      }, [onMenuOpenProp]);

      const onMenuClose = useCallback(() => {
        if (typeof onMenuCloseProp === 'function') {
          onMenuCloseProp();
        }
        setMenuIsOpen(false);
      }, [onMenuCloseProp]);

      return (
        <SelectComponent
          {...props}
          ref={ref}
          value={value}
          onChange={onChange}
          inputValue={inputValue}
          onInputChange={onInputChange}
          menuIsOpen={menuIsOpen}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
        />
      );
    }
  );

export default manageState;
