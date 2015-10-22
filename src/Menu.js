var React = require('react');
var classes = require('classnames');

const Menu = React.createClass({
  displayName: 'Menu',

  propTypes: {
		addLabelText: React.PropTypes.string,      // placeholder displayed when you want to add a label on a multi-value input
		allowCreate: React.PropTypes.bool,         // whether to allow creation of new entries
		asyncOptions: React.PropTypes.func,        // function to call to get options
		disabled: React.PropTypes.bool,            // whether the Select is disabled or not
		filteredOptions: React.PropTypes.array,    // options filtered
    focusOption: React.PropTypes.func,         // called when an option is focused
		focusedOption: React.PropTypes.object,     // focused option
    inputValue: React.PropTypes.string,        // input value
    isLoading: React.PropTypes.func,           // check if we are in loading mode
    labelKey: React.PropTypes.string,          // path of the label value in option objects
		newOptionCreator: React.PropTypes.func,    // factory to create new options when allowCreate set
		noResultsText: React.PropTypes.string,     // placeholder displayed when there are no matching search results
		optionComponent: React.PropTypes.func,     // option component to render in dropdown
		optionRenderer: React.PropTypes.func,      // optionRenderer: function (option) {}
		searchPromptText: React.PropTypes.string,  // label to prompt for search input
		searchingText: React.PropTypes.string,     // message to display whilst options are loading via asyncOptions
    selectValue: React.PropTypes.func,         // called when a value is selected
    unfocusOption: React.PropTypes.func,       // called to unfocus an option
    value: React.PropTypes.string,             // value
		valueKey: React.PropTypes.string           // path of the label value in option objects
	},

  getInitialState() {
    return {
      focusRect: null,
      position: null
    };
  },

  componentDidUpdate() {
    if (this.state.focusRect) {
      var menuDOM = ReactDOM.findDOMNode(this.refs.menu);
      var menuRect = menuDOM.getBoundingClientRect();

      if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
        menuDOM.scrollTop = (focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight);
      }
    }
  },

  buildMenu () {
		var focusedValue = this.props.focusedOption ? this.props.focusedOption[this.props.valueKey] : null;
		var renderLabel = this.props.optionRenderer;
		if (!renderLabel) renderLabel = (op) => op[this.props.labelKey];
		if (this.props.filteredOptions.length > 0) {
			focusedValue = focusedValue == null ? this.props.filteredOptions[0] : focusedValue;
		}
		// Add the current value to the filtered options in last resort
		var options = this.props.filteredOptions;
		if (this.props.allowCreate && this.props.inputValue.trim()) {
			var inputValue = this.props.inputValue;
			options = options.slice();
			var newOption = this.props.newOptionCreator ? this.props.newOptionCreator(inputValue) : {
				value: inputValue,
				label: inputValue,
				create: true
			};
			options.unshift(newOption);
		}
		var ops = Object.keys(options).map(function(key) {
			var op = options[key];
			var isSelected = this.props.value === op[this.props.valueKey];
			var isFocused = focusedValue === op[this.props.valueKey];
			var optionClass = classes({
				'Select-option': true,
				'is-selected': isSelected,
				'is-focused': isFocused,
				'is-disabled': op.disabled
			});
			var ref = isFocused ? 'focused' : null;
			var mouseEnter = this.props.focusOption.bind(null, op);
			var mouseLeave = this.props.unfocusOption.bind(null, op);
			var mouseDown = this.props.selectValue.bind(null, op);
			var optionResult = React.createElement(this.props.optionComponent, {
				key: 'option-' + op[this.props.valueKey],
				className: optionClass,
				renderFunc: renderLabel,
				mouseEnter: mouseEnter,
				mouseLeave: mouseLeave,
				mouseDown: mouseDown,
				click: mouseDown,
				addLabelText: this.props.addLabelText,
				option: op,
				ref: ref
			});
			return optionResult;
		}, this);

		if (ops.length) {
			return ops;
		} else {
			var noResultsText, promptClass;
			if (this.props.isLoading()) {
				promptClass = 'Select-searching';
				noResultsText = this.props.searchingText;
			} else if (this.props.inputValue || !this.props.asyncOptions) {
				promptClass = 'Select-noresults';
				noResultsText = this.props.noResultsText;
			} else {
				promptClass = 'Select-search-prompt';
				noResultsText = this.props.searchPromptText;
			}

			return (
				<div className={promptClass}>
					{noResultsText}
				</div>
			);
		}
	},

  handleMouseDownOnMenu (event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
	},

  render() {
    const style = this.state.position || null;

    const props = {
			ref: 'menu',
			className: 'Select-menu',
			onMouseDown: this.handleMouseDownOnMenu
		};

		return (
			<div ref="selectMenuContainer" className="Select-menu-outer" {...{ style }}>
				<div {...props}>{this.buildMenu()}</div>
			</div>
		);
  }
});

module.exports = Menu;
