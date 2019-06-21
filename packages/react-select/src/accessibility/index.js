// @flow

import { type OptionType, type OptionsType } from '../types';

export type InstructionsContext = {
  isSearchable?: boolean,
  isMulti?: boolean,
  label?: string,
  isDisabled?: boolean
};
export type ValueEventContext = { value: string, isDisabled?: boolean };

export const instructionsAriaMessage = (
  event: string,
  context?: InstructionsContext = {}
) => {
  const { isSearchable, isMulti, label, isDisabled } = context;
  switch (event) {
    case 'menu':
      return `Utiliza flecha arriba y flecha abajo para seleccionar una opción${isDisabled ? '' : ', presiona enter para seleccionar la opción en foco'}, presiona Escape para salir del menú, presiona Tab para seleccionar la opción y salir del menú.`;
    case 'input':
      return `${label ? label : 'Select'} está seleccionado ${
        isSearchable ? ', escribe para mejorar la lista' : ''
        }, presiona flecha abajo para abrir el menú, ${
        isMulti ? ' presiona flecha a la izquierda para dar foco a las opciones seleccionadas' : ''
        }`;
    case 'value':
      return 'Utiliza flecha izquierda y flecha derecha para alternar entre opciones en foco, presiona tecla regresar para remover la opción que se encuentra actualmente en foco';
  }
};

export const valueEventAriaMessage = (
  event: string,
  context: ValueEventContext
) => {
  const { value, isDisabled } = context;
  if (!value) return;
  switch (event) {
    case 'deselect-option':
    case 'pop-value':
    case 'remove-value':
      return `Opción ${value}, deseleccionada.`;
    case 'select-option':
      return isDisabled ? `Opción ${value} está deshabilitada. Selecciona otra opción.` : `Opción ${value}, seleccionada.`;
  }
};

export const valueFocusAriaMessage = ({
  focusedValue,
  getOptionLabel,
  selectValue,
}: {
  focusedValue: OptionType,
  getOptionLabel: (option: OptionType) => string,
  selectValue: OptionsType,
}) =>
  `Opción ${getOptionLabel(focusedValue)} ahora en foco, ${selectValue.indexOf(
    focusedValue
  ) + 1} de ${selectValue.length}.`;

export const optionFocusAriaMessage = ({
  focusedOption,
  getOptionLabel,
  options,
}: {
  focusedOption: OptionType,
  getOptionLabel: (option: OptionType) => string,
  options: OptionsType,
}) =>
  `Opción ${getOptionLabel(focusedOption)} ahora en foco${focusedOption.isDisabled ? ' deshabilitada' : ''}, ${options.indexOf(
    focusedOption
  ) + 1} de ${options.length}.`;

export const resultsAriaMessage = ({
  inputValue,
  screenReaderMessage,
}: {
  inputValue: string,
  screenReaderMessage: string,
}) =>
  `${screenReaderMessage}${
  inputValue ? ' para término de búsqueda ' + inputValue : ''
  }.`;
