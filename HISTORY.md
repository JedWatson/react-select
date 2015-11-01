# React-Select

## v0.9.1 / 2015-11-01

* added; new Contributors example w/ async options loading and custom value / label keys
* fixed; several issues with custom `valueKey` and `labelKey` props
* fixed; autoload now loads options with no search input

## v0.9.0 / 2015-10-29

* added; SCSS stylesheets!
* improved; Options rendering should be more performant
* breaking change; Custom `Option` components now need to pass their `option` prop to event handlers; see [this commit](https://github.com/JedWatson/react-select/commit/89af12a80a972794222b193a767f44234bbe9817) for an example of the required change.

## v0.8.4 / 2015-10-27

* fixed; LESS math operations now work with --strict-math=on, thanks [Vincent Fretin](https://github.com/vincentfretin)

## v0.8.3 / 2015-10-27

* fixed; IE issue where clicking the scrollbar would close the menu, thanks [Pete Nykänen](https://github.com/petetnt)

## v0.8.2 / 2015-10-22

* added; Promise support for `loadAsyncOptions`, thanks [Domenico Matteo](https://github.com/dmatteo)

## v0.8.1 / 2015-10-20

* fixed; `loadAsyncOptions` raises TypeError in setup, see #439 for details, thanks [Pancham Mehrunkar](https://github.com/pancham348)

## v0.8.0 / 2015-10-19

This release contains significant DOM structure and CSS improvements by @jossmac, including:

* no more `position: absolute` for inner controls
* `display: table` is used for layout, which works in IE8 and above, and [all other modern browsers](http://caniuse.com/#feat=css-table)
* less "magic numbers" used for layout, should fix various browser-specific alignment issues
* clear "x" control now animates in
* clearer `.Select--multi` className replaces `.Select.is-multi`
* new height & theme variables
* "dropdown" indicator chevron is no longer displayed for multi-select controls

There are no functional changes, but if you've forked the LESS / CSS to create your own theme you'll want to pay close attention to PR #527 when upgrading to this version.

## v0.7.0 / 2015-10-10

React Select is updated for React 0.14. If you're still using React 0.13, please continue to use `react-select@0.6.x`. There are no functional differences between v0.7.0 and v0.6.12.

Additionally, our tests now require Node.js 4.x. If you are developing `react-select`, please make sure you are running the latest version of node.

Thanks to @bruderstein, @dmatteo and @hull for their help getting these updates shipped!

## v0.6.12 / 2015-10-02

* added; `labelKey` and `valueKey` props, so you can now use different keys in `option` objects for the label and value
* fixed; additional `isMounted()` checks in timeouts
* fixed; componentDidUpdate timeout is reset correctly, see #208 and #434, thanks [Petr Gladkikh](https://github.com/PetrGlad)
* fixed; mousedown event on scrollbar in menu no longer hides it, thanks [Yishai Burt](https://github.com/burtyish)

## v0.6.11 / 2015-09-28

* added; `isLoading` prop, allows indication of async options loading in situations where more control is required, thanks [Jon Gautsch](https://github.com/jgautsch)

## v0.6.10 / 2015-09-24

* fixed; a build issue with the previous release that prevented the stylesheet being generated / included
* fixed; a LESS syntax issue, thanks [Bob Cardenas](https://github.com/bcardi)

## v0.6.9 / 2015-09-19

* added; `style` key for package.json, thanks [Stephen Wan](https://github.com/stephen)
* added; `onInputChange` handler that returns the current input value, thanks [Tom Leslie](https://github.com/lomteslie)
* fixed; simplifying handleKey function & preventDefault behaviour, thanks [davidpene](https://github.com/davidpene)
* fixed; Display spinner while auto-loading initial data, thanks [Ben Jenkinson](https://github.com/BenJenkinson)
* fixed; better support for touch events, thanks [Montlouis-Calixte Stéphane](https://github.com/bulby97)
* fixed; prevent value splitting on non-multi-value select, thanks [Alan R. Soares](https://github.com/alanrsoares)

## v0.6.8 / 2015-09-16

* fixed; broader range of allowed prereleases for React 0.14, including rc1
* fixed; preventing backspace from navigating back in the browser history, thanks [davidpene](https://github.com/davidpene)

## v0.6.7 / 2015-08-28

* fixed; missing styles for `.Select-search-prompt` and `.Select-searching` issues, thanks [Jaak Erisalu](https://github.com/jaakerisalu) and [davidpene](https://github.com/davidpene)

## v0.6.6 / 2015-08-26

* fixed; issue in Chrome where clicking the scrollbar would close the menu, thanks [Vladimir Matsola](https://github.com/vomchik)

## v0.6.5 / 2015-08-24

* fixed; completely ignores clicks on disabled items, unless the target of the click is a link, thanks [Ben Stahl](https://github.com/bhstahl)

## v0.6.4 / 2015-08-24

This release includes a huge improvement to the examples / website thanks to @jossmac. Also:

* added; support for React 0.14 beta3
* fixed; disabled options after searching, thanks @bruderstein
* added; support for "Searching..." text (w/ prop) while loading async results, thanks @bruderstein and @johnomalley
* added; `className`, `style` and `title` keys are now supported in option properties, thanks @bruderstein

## v0.6.3 / 2015-08-18

Otherwise known as "the real 0.6.2" this includes the updated build for the last version; sorry about that!

## v0.6.2 / 2015-08-13

* changed; if the `searchable` prop is `false`, the menu is opened _or closed_ on click, more like a standard Select input. thanks [MaaikeB](https://github.com/MaaikeB)

## v0.6.1 / 2015-08-09

* added; Support for options with numeric values, thanks [Dave Brotherstone](https://github.com/bruderstein)
* changed; Disabled options now appear in the search results , thanks [Dave Brotherstone](https://github.com/bruderstein)
* fixed; asyncOptions are reloaded on componentWillReceiveProps when the value has changed, thanks [Francis Cote](https://github.com/drfeelgoud)
* added; `cacheAsyncResults` prop (default `true`) now controls whether the internal cache is used for `asyncOptions`

## v0.6.0 / 2015-08-05

* improved; option, value and single value have been split out into their own components, and can be customised with props. see [#328](https://github.com/JedWatson/react-select/pull/328) for more details.
* improved; Near-complete test coverage thanks to the awesome work of [Dave Brotherstone](https://github.com/bruderstein)
* improved; Support all alpha/beta/rc's of React 0.14.0, thanks [Sébastien Lorber](https://github.com/slorber)
* fixed; Close multi-select menu when tabbing away, thanks [Ben Alpert](https://github.com/spicyj)
* fixed; Bug where Select shows the value instead of the label (reapplying fix)
* fixed; `valueRenderer` now works when `multi={false}`, thanks [Chris Portela](https://github.com/0xCMP)
* added; New property `backspaceRemoves` (default `true`), allows the default behaviour of removing values with backspace when `multi={true}`, thanks [Leo Lehikoinen](https://github.com/lehikol2)

## v0.5.6 / 2015-07-27

* fixed; Allow entering of commas when allowCreate is on but multi is off, thanks [Angelo DiNardi](https://github.com/adinardi)
* fixed; Times (clear) character is now rendered from string unicode character for consistent output, thanks [Nibbles](https://github.com/Siliconrob)
* fixed; allowCreate bug, thanks [goodzsq](https://github.com/goodzsq)
* fixed; changes to props.placeholder weren't being reflected correctly, thanks [alesn](https://github.com/alesn)
* fixed; error when escape is pressedn where `clearValue` was not passed the event, thanks [Mikhail Kotelnikov](https://github.com/mkotelnikov)
* added; More tests, thanks [Dave Brotherstone](https://github.com/bruderstein)

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
