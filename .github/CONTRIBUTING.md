# Contributing

Thanks for your interest in React-Select. All forms of contribution are
welcome, from issue reports to PRs and documentation / write-ups.

Before you open a PR:

- In development, run `yarn start` to build (+watch) the project source, and run
  the [development server](http://localhost:8000).
- Please ensure all the examples work correctly after your change. If you're
  adding a major new use-case, add a new example demonstrating its use.
- Be careful to follow the code style of the project. Run `yarn lint` after
  your changes and ensure you do not introduce any new errors or warnings.
- This repository uses TypeScript, please run `yarn type-check` after your changes to ensure
  that you do not introduce any new type errors.

- Ensure that your effort is aligned with the project's roadmap by talking to
  the maintainers, especially if you are going to spend a lot of time on it.
- Make sure there's an issue open for any work you take on and intend to submit
  as a pull request - it helps core members review your concept and direction
  early and is a good way to discuss what you're planning to do.
- If you open an issue and are interested in working on a fix, please let us
  know. We'll help you get started, rather than adding it to the queue.
- Make sure you do not add regressions by running `yarn test`.
- Where possible, include tests with your changes, either that demonstrates the
  bug, or tests the new functionality. If you're not sure how to test your
  changes, feel free to ping @gwyneplaine or @JedWatson
- Run `yarn coveralls` to check that the coverage hasn't dropped, and look at the
  report (under the generated `coverage` directory) to check that your changes are
  covered
