# Contributing

Thanks for your interest in React-Select. All forms of contribution are
welcome, from issue reports to PRs and documentation / write-ups.

Before you open a PR:

* If you're planning to add or change a major feature in a PR, please ensure
the change is aligned with the project roadmap by opening an issue first,
especially if you're going to spend a lot of time on it.
* In development, run `gulp dev` to build (+watch) the project source, and run
the [development server](http://localhost:8000).
* Please ensure all the examples work correctly after your change. If you're
adding a major new use-case, add a new example demonstrating its use.
* Please **do not** commit the build files. Make sure **only** your changes to
`/src/`, `/less/` and `/examples/src` are included in your PR.
* Be careful to follow the code style of the project. Run `npm run lint` after
your changes and ensure you do not introduce any new errors or warnings.

* Ensure that your effort is aligned with the project's roadmap by talking to
the maintainers, especially if you are going to spend a lot of time on it.
* Make sure there's an Issue open for any work you take on and intend to submit
as a pull request - it helps core members review your concept and direction
early and is a good way to discuss what you're planning to do.
* If you open an issue and are interested in working on a fix, please let us
know. We'll help you get started, rather than adding it to the queue.
* Make sure you do not add regressions by running `npm test`. Please also
[follow our established coding conventions](https://github.com/keystonejs/keystone/wiki/Coding-Standards) (with regards to formatting, etc)
* You can also run `npm run lint` and `npm run style` - our linter is a WIP
but please ensure there are not more violations than before your changes.
* All new features and changes need documentation. We have three translations,
please read our [Documentation Guidelines](https://github.com/keystonejs/keystone/wiki/Documentation-Translation-Guidelines).

If you are working on the React Admin UI, you'll also need to know this:

* The Admin UI is generated with Browserify by gulp. In development, run
`gulp watch-scripts`. 
* _Make sure you revert your build before submitting a PR_ to reduce the change
of conflicts. `gulp build-scripts` is run after PRs are merged and before any
releases are made.

If you'd like to talk to the core developers, we all hang out in a Slack channel
to discuss Keystone. Ping @jedwatson to get an invite.
