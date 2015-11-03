# TODO

use componentDidUpdate for binding the closeMenuIfClicked... handlers
are timeouts (this._ blurTimeout etc) still required? see handleInputBlur()
allow event handlers to return false and stop events (?)
options creation (was part of buildMenu and selectFocusedOption)
hidden input should be optional
clicking on labels (single and multi select)
prop to use legacy 'simpleValue' mode
handle comma for tags mode (handleKeyDown keyCode 188)

## Component Methods

handle _ closeMenuIfClickedOutside
handle _ bindCloseMenuIfClickedOutside
handle _ unbindCloseMenuIfClickedOutside
handle _ focusedOptionReveal

componentWillMount
componentDidMount
componentWillUnmount
componentWillReceiveProps
componentDidUpdate
clickedOutsideElement
getFirstFocusableOption
handleMouseDownOnMenu
getNewFocusedOption ._
autoloadAsyncOptions
loadAsyncOptions
handleOptionLabelClick

## Probably replaced (needs review)

getStateFromValue
initValuesArray
resetValue
fireChangeEvent
buildMenu

## Questions

Why is the reference check in filterOptions for excluded values not matching options?
