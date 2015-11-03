# TODO

default functions for filterOption, filterOptions

use componentDidUpdate for binding the closeMenuIfClicked... handlers

are timeouts (this._ blurTimeout etc) still required? see handleInputBlur()

allow event handlers to return false and stop events (?)

options creation (was part of buildMenu)

hidden input should be optional

clicking on labels (single and multi select)

prop to use legacy 'simpleValue' mode

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
handleKeyDown
getNewFocusedOption ._
autoloadAsyncOptions
loadAsyncOptions
selectFocusedOption
handleOptionLabelClick

## Probably replaced (needs review)

getStateFromValue
initValuesArray
resetValue
fireChangeEvent
buildMenu

## Questions

Why are singleValue and multiValue different?
