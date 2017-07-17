import PropTypes from 'prop-types';

const stringOrNode = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.node
]);

const SelectPropTypes = {
    addLabelText: PropTypes.string,       // placeholder displayed when you want to add a label on a multi-value input
    'aria-describedby': PropTypes.string, // HTML ID(s) of element(s) that should be used to describe this input (for assistive tech)
    'aria-label': PropTypes.string,       // Aria label (for assistive tech)
    'aria-labelledby': PropTypes.string,  // HTML ID of an element that should be used as the label (for assistive tech)
    arrowRenderer: PropTypes.func,        // Create drop-down caret element
    autoBlur: PropTypes.bool,             // automatically blur the component when an option is selected
    autofocus: PropTypes.bool,            // autofocus the component on mount
    autosize: PropTypes.bool,             // whether to enable autosizing or not
    backspaceRemoves: PropTypes.bool,     // whether backspace removes an item if there is no text input
    backspaceToRemoveMessage: PropTypes.string,  // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
    className: PropTypes.string,          // className for the outer element
    clearAllText: stringOrNode,           // title for the "clear" control when multi: true
    clearRenderer: PropTypes.func,        // create clearable x element
    clearValueText: stringOrNode,         // title for the "clear" control
    clearable: PropTypes.bool,            // should it be possible to reset value
    deleteRemoves: PropTypes.bool,        // whether backspace removes an item if there is no text input
    delimiter: PropTypes.string,          // delimiter to use to join multiple values for the hidden field value
    disabled: PropTypes.bool,             // whether the Select is disabled or not
    escapeClearsValue: PropTypes.bool,    // whether escape clears the value when the menu is closed
    filterOption: PropTypes.func,         // method to filter a single option (option, filterString)
    filterOptions: PropTypes.any,         // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
    ignoreAccents: PropTypes.bool,        // whether to strip diacritics when filtering
    ignoreCase: PropTypes.bool,           // whether to perform case-insensitive filtering
    inputProps: PropTypes.object,         // custom attributes for the Input
    inputRenderer: PropTypes.func,        // returns a custom input component
    instanceId: PropTypes.string,         // set the components instanceId
    isLoading: PropTypes.bool,            // whether the Select is loading externally or not (such as options being loaded)
    joinValues: PropTypes.bool,           // joins multiple values into a single form field with the delimiter (legacy mode)
    labelKey: PropTypes.string,           // path of the label value in option objects
    matchPos: PropTypes.string,           // (any|start) match the start or entire string when filtering
    matchProp: PropTypes.string,          // (any|label|value) which option property to filter on
    menuBuffer: PropTypes.number,         // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
    menuContainerStyle: PropTypes.object, // optional style to apply to the menu container
    menuRenderer: PropTypes.func,         // renders a custom menu with options
    menuStyle: PropTypes.object,          // optional style to apply to the menu
    multi: PropTypes.bool,                // multi-value input
    name: PropTypes.string,               // generates a hidden <input /> tag with this field name for html forms
    noResultsText: stringOrNode,          // placeholder displayed when there are no matching search results
    onBlur: PropTypes.func,               // onBlur handler: function (event) {}
    onBlurResetsInput: PropTypes.bool,    // whether input is cleared on blur
    onChange: PropTypes.func,             // onChange handler: function (newValue) {}
    onClose: PropTypes.func,              // fires when the menu is closed
    onCloseResetsInput: PropTypes.bool,   // whether input is cleared when menu is closed through the arrow
    onFocus: PropTypes.func,              // onFocus handler: function (event) {}
    onInputChange: PropTypes.func,        // onInputChange handler: function (inputValue) {}
    onInputKeyDown: PropTypes.func,       // input keyDown handler: function (event) {}
    onMenuScrollToBottom: PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
    onOpen: PropTypes.func,               // fires when the menu is opened
    onValueClick: PropTypes.func,         // onClick handler for value labels: function (value, event) {}
    openAfterFocus: PropTypes.bool,       // boolean to enable opening dropdown when focused
    openOnFocus: PropTypes.bool,          // always open options menu on focus
    optionClassName: PropTypes.string,    // additional class(es) to apply to the <Option /> elements
    optionComponent: PropTypes.func,      // option component to render in dropdown
    optionRenderer: PropTypes.func,       // optionRenderer: function (option) {}
    options: PropTypes.array,             // array of options
    pageSize: PropTypes.number,           // number of entries to page when using page up/down keys
    placeholder: stringOrNode,            // field placeholder, displayed when there's no value
    required: PropTypes.bool,             // applies HTML5 required attribute when needed
    resetValue: PropTypes.any,            // value to use when you clear the control
    scrollMenuIntoView: PropTypes.bool,   // boolean to enable the viewport to shift so that the full menu fully visible when engaged
    searchable: PropTypes.bool,           // whether to enable searching feature or not
    simpleValue: PropTypes.bool,          // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
    style: PropTypes.object,              // optional style to apply to the control
    tabIndex: PropTypes.string,           // optional tab index of the control
    tabSelectsValue: PropTypes.bool,      // whether to treat tabbing out while focused to be value selection
    value: PropTypes.any,                 // initial field value
    valueComponent: PropTypes.func,       // value component to render
    valueKey: PropTypes.string,           // path of the label value in option objects
    valueRenderer: PropTypes.func,        // valueRenderer: function (option) {}
    wrapperStyle: PropTypes.object,       // optional style to apply to the component wrapper
};

export default SelectPropTypes;
