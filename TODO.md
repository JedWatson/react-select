# TODO

use componentDidUpdate for binding the closeMenuIfClicked... handlers (?)
allow event handlers to return false and stop events (?)
options creation (was part of buildMenu and selectFocusedOption)
clicking on labels (single and multi select)
handle comma keypress for tags mode (handleKeyDown keyCode 188)
focus options on mouseMove (requires re-work of className prop, pass isFocused instead)
ensure an option is always focused (was _ getNewFocusedOption)
proper pagination support in Async component
asyncDelay - wait x ms before calling getOptions in Async
no results found shouldn't be displayed when all options are selected and there's no input

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

## Probably replaced (needs review)

getStateFromValue
initValuesArray
resetValue
fireChangeEvent
buildMenu

## Performance concerns

checking the focused option after every render
filtering the options on every render

## Questions

Why is the reference check in filterOptions for excluded values not matching options?
