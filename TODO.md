# TODO

use componentDidUpdate for binding the closeMenuIfClicked... handlers (?)
allow event handlers to return false and stop events (?)
options creation (was part of buildMenu and selectFocusedOption)
handle comma keypress for tags mode (handleKeyDown keyCode 188)
clicking on labels (single and multi select)
ensure an option is always focused (was _ getNewFocusedOption)
proper pagination support in Async component
asyncDelay - wait x ms before calling getOptions in Async

## Component Methods

handle _ closeMenuIfClickedOutside
handle _ bindCloseMenuIfClickedOutside
handle _ unbindCloseMenuIfClickedOutside
handle _ focusedOptionReveal

componentWillUnmount
componentWillReceiveProps
componentDidUpdate
clickedOutsideElement
getFirstFocusableOption
handleMouseDownOnMenu
_ getNewFocusedOption
handleOptionLabelClick

## Performance concerns

checking the focused option after every render
filtering the options on every render

## Questions

Why is the reference check in filterOptions for excluded values not matching options?
