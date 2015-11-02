# TODO

default functions for filterOption, filterOptions

use componentDidUpdate for binding the closeMenuIfClicked... handlers

are timeouts (this._ blurTimeout etc) still required? see handleInputBlur()

allow event handlers to return false and stop events (?)

options creation (was part of buildMenu)

optimise / clean up renderInput

hidden input should be optional

## Component Methods

this.closeMenuIfClickedOutside  ._
this.bindCloseMenuIfClickedOutside ._
this.unbindCloseMenuIfClickedOutside ._

componentWillMount
componentDidMount
componentWillUnmount
componentWillReceiveProps
componentDidUpdate
clickedOutsideElement
getStateFromValue
getFirstFocusableOption
initValuesArray
resetValue
fireChangeEvent
handleMouseDownOnMenu
handleKeyDown
getNewFocusedOption ._
autoloadAsyncOptions
loadAsyncOptions
filterOptions
selectFocusedOption
focusOption
focusNextOption
focusPreviousOption
focusAdjacentOption
unfocusOption
buildMenu
handleOptionLabelClick

## Questions

Why are singleValue and multiValue different?
