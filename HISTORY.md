# React-Select

## v0.5.5 / 2015-07-12

* fixed; replaced usage of `component.getDOMNode()` with `React.findDOMNode(component)` for compatibility with React 0.14

## v0.5.4 / 2015-07-06

* fixed; regression in 0.5.3 that broke componentWillMount, sorry everyone!
* added; `addLabelText` prop for customising the "add {label}?" text when in tags mode, thanks [Fenn](https://github.com/Fenntasy)

## v0.5.3 / 2015-07-05

* fixed; autoload issues, thanks [Maxime Tyler](https://github.com/iam4x)
* fixed; style incompatibilities with Foundation framework, thanks [Timothy Kempf](https://github.com/Fauntleroy)

## v0.5.2 / 2015-06-28

* fixed; bug where Select shows the value instead of the label, thanks [Stephen Demjanenko](https://github.com/sdemjanenko)
* added; 'is-selected' classname is added to the selected option, thanks [Alexey Volodkin](https://github.com/miraks)
* fixed; async options are now loaded with the initial value, thanks [Pokai Chang](https://github.com/Neson)
* fixed; `react-input-autosize` now correctly escapes ampersands (&), not actually a fix in react-select but worth noting here because it would have been causing a problem in `react-select` as well.

## v0.5.1 / 2015-06-21

* added; custom option and value rendering capability, thanks [Brian Reavis](https://github.com/brianreavis)
* fixed; collapsing issue when single-select or empty multi-select fields are disabled
* fixed; issue where an empty value would be left after clearing all values in a multi-select field

## v0.5.0 / 2015-06-20

* fixed; `esc` key incorrectly created empty options, thanks [rgrzelak](https://github.com/rgrzelak)
* adeed; New feature to allow option creation ("tags mode"), enable with `allowCreate` prop, thanks [Florent Vilmart](https://github.com/flovilmart) and [Brian Reavis](https://github.com/brianreavis)
* fixed; IE8 compatibility fallback for `addEventListener/removeEventListener`, which don't exist in IE8, thanks [Stefan Billiet](https://github.com/StefanBilliet)
* fixed; Undefined values when using asyncOptions, thanks [bannaN](https://github.com/bannaN)
* fixed; Prevent add the last focused value when the drop down menu is closed / Pushing enter without dropdown open adds a value, thanks [Giuseppe](https://github.com/giuse88)
* fixed; Callback context is undefined, thanks [Giuseppe](https://github.com/giuse88)
* fixed; Issue with event being swallowed on Enter `keydown`, thanks [Kevin Burke](https://github.com/kembuco)
* added; Support for case-insensitive filtering when `matchPos="start"`, thanks [wesrage](https://github.com/wesrage)
* added; Support for customizable background color, thanks [John Morales](https://github.com/JohnMorales)
* fixed; Updated ESLint and cleared up warnings, thanks [Alexander Shemetovsky](https://github.com/AlexKVal)
* fixed; Close dropdown when clicking on select, thanks [Nik Butenko](https://github.com/nkbt)
* added; Tests, and mocha test framework, thanks [Craig Dallimore](https://github.com/craigdallimore)
* fixed; You can now start the example server and watch for changes with `npm start`


## v0.4.9 / 2015-05-11

* fixed; focus was being grabbed by the select when `autoload` and `asyncOptions` were set
* added; `focus` method on the component
* added; support for disabled options, thanks [Pasha Palangpour](https://github.com/pashap)
* improved; more closures, less binds, for better performance, thanks [Daniel Cousens](https://github.com/dcousens)

## v0.4.8 / 2015-05-02

* fixed; restored `dist/default.css`
* fixed; standalone example works again
* fixed; clarified dependency documentation and added dependencies for Bower
* fixed; Scoping issues in `_bindCloseMenuIfClickedOutside`, thanks [bannaN](https://github.com/bannaN)
* fixed; Doesnt try to set focus afterupdate if component is disabled, thanks [bannaN](https://github.com/bannaN)

## v0.4.7 / 2015-04-21

* improved; lodash is no longer a dependency, thanks [Daniel Lo Nigro](https://github.com/Daniel15)

## v0.4.6 / 2015-04-06

* updated; dependencies, build process and input-autosize component

## v0.4.5 / 2015-03-28

* fixed; issue with long options overlapping arrow and clear icons, thanks [Rohit Kalkur](https://github.com/rovolution)

## v0.4.4 / 2015-03-26

* fixed; error handling click events when the menu is closed, thanks [Ilya Petrov](https://github.com/muromec)
* fixed; issue where options will not be filtered in certain conditions, thanks [G. Kay Lee](https://github.com/gsklee)

## v0.4.3 / 2015-03-25

* added tests and updated dependencies

## v0.4.2 / 2015-03-23

* added; ESLint and contributing guide
* fixed; incorrect `classnames` variable assignement in window scope
* fixed; all ESLint errors and warnings (except invalid JSX undefined/unused vars due to ESLint bug)
* fixed; first option is now focused correctly, thanks [Eivind Siqveland Larsen](https://github.com/esiqveland)

## v0.4.1 / 2015-03-20

* fixed; IE11 issue: clicking on scrollbar within menu no longer closes menu, thanks [Rohit Kalkur](https://github.com/rovolution)

## v0.4.0 / 2015-03-12

* updated; compatible with React 0.13

## v0.3.5 / 2015-03-09

* improved; less/no repaint on scroll for preformance wins, thanks [jsmunich](https://github.com/jsmunich)
* added; `onBlur` and `onFocus` event handlers, thanks [Jonas Budelmann](https://github.com/cloudkite)
* added; support for `inputProps` prop, passed to the `<input>` component, thanks [Yann Plantevin](https://github.com/YannPl)
* changed; now using [react-component-gulp-tasks](https://github.com/JedWatson/react-component-gulp-tasks) for build
* fixed; issue w/ remote callbacks overriding cached options, thanks [Corey McMahon](https://github.com/coreymcmahon)
* fixed; if not `this.props.multi`, menu doesn't need handleMouseDown, thanks [wenbing](https://github.com/wenbing)

## v0.3.4 / 2015-02-23

* fixed; issues with the underscore/lodash dependency change, thanks [Aaron Powell](https://github.com/aaronpowell)

## v0.3.3 / 2015-02-22

* added; `disabled` prop, thanks [Danny Shaw](https://github.com/dannyshaw)
* added; `searchable` prop - set to `false` to disable the search box, thanks [Julen Ruiz Aizpuru](https://github.com/julen)
* added; `onOptionLabelClick` prop - see [#66](https://github.com/JedWatson/react-select/pull/66) for docs, thanks [Dmitry Smirnov](https://github.com/dmitry-smirnov)
* fixed; `text-overflow: ellipsis;` typo, thanks [Andru Vallance](https://github.com/andru)

## v0.3.2 / 2015-01-30

* fixed; issue adding undefined values to multiselect, thanks [Tejas Dinkar](https://github.com/gja)

## v0.3.1 / 2015-01-20

* fixed; missing `var` statement

## v0.3.0 / 2015-01-20

* added; node compatible build now available in `/lib`

## v0.2.14 / 2015-01-07

* added; `searchPromptText` property that is displayed when `asyncOptions` is set and there are (a) no options loaded, and (b) no input entered to search on, thanks [Anton Fedchenko](https://github.com/kompot)
* added; `clearable` property (defaults to `true`) to control whether the "clear" control is available, thanks [Anton Fedchenko](https://github.com/kompot)

## v0.2.13 / 2015-01-05

* fixed; height issues in Safari, thanks [Joss Mackison](https://github.com/jossmac)
* added; Option to specify "Clear value" label as prop for i18n

## v0.2.12 / 2015-01-04

* fixed; UI now responds to touch events, and works on mobile devices! thanks [Fraser Xu](https://github.com/fraserxu)

## v0.2.11 / 2015-01-04

* fixed; Options in the dropdown now scroll into view when they are focused, thanks [Adam](https://github.com/fmovlex)
* improved; Example dist is now excluded from the npm package

## v0.2.10 / 2015-01-01

* fixed; More specific mixin name to avoid conflicts (css)
* fixed; Example CSS now correctly rebuilds on changes in development
* fixed; Values are now expanded correctly when options change (see #28)
* added; Option to specify "No results found" label as prop for i18n, thanks [Julen Ruiz Aizpuru](https://github.com/julen)

## v0.2.9 / 2014-12-09

* added; `filterOption` and `filterOptions` props for more control over filtering

## v0.2.8 / 2014-12-08

* added; `matchPos` option to control whether to match the `start` or `any` position in the string when filtering options (default: `any`)
* added; `matchProp` option to control whether to match the `value`, `label` or `any` property of each option when filtering (default: `any`)

## v0.2.7 / 2014-12-01

* fixed; screen-readers will now read "clear value" instead of "times" for the clear button
* fixed; non-left-click mousedown events aren't blocked by the control


## v0.2.6 / 2014-11-30

* improved; better comparison of changes to [options] in `willReceiveProps`
* fixed; now focuses the first option correctly when in multiselect mode
* fixed; fixed focused option behaviour on value change
* fixed; when filtering, there is always a focused option (#19)
* changed; using ^ in package.json to compare dependencies

## v0.2.5 / 2014-11-20

* fixed; compatibility with case-sensitive file systems

## v0.2.4 / 2014-11-20

* fixed; package.json pointed at the right file

## v0.2.3 / 2014-11-17

* fixed; Updating state correctly when props change
* improved; Build tasks and docs
* added; Working standalone build
* added; Minified dist version
* added; Publised to Bower

## v0.2.2 / 2014-11-15

* fixed; backspace event being incorrectly cancelled

## v0.2.1 / 2014-11-15

* fixed; issue where backspace incorrectly clears the value (#14)

## v0.2.0 / 2014-11-15

* changed; Major rewrite to improve focus handling and internal state management
* added; Support for `multi` prop, enable multiselect mode

## v0.1.1 / 2014-11-03

* added; Support for `onChange` event
* added; `propTypes` are defined by the `Select` component now
* added; `className` property, sets the `className` on the outer `div` element
* fixed; Removed deprecated `React.DOM.x` calls

## v0.1.0 / 2014-11-01

* updated; React to 0.12.0

## v0.0.6 / 2014-10-14

* fixed; Error keeping value when using Async Options
