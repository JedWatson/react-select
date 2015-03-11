# React-Select

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
