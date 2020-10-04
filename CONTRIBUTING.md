# Contributing

Thanks for your interest in React-Select. All forms of contribution are
welcome, from issue reports to PRs and documentation / write-ups.

Before you open a PR:

* In development, run `yarn start` to build (and watch) the project source, and run
the [development server](http://localhost:8000).
* Please ensure all the examples work correctly after your change. If you're
adding a major new use-case, add a new example `/docs/examples` and subsequent documentation demonstrating its use `/docs/pages`.
* Ensure that your effort is aligned with the project's roadmap by talking to
the maintainers, especially if you are going to spend a lot of time on it.
* Make sure there's an issue open for any work you take on and intend to submit
as a pull request - it helps core members review your concept and direction
early and is a good way to discuss what you're planning to do.
* If you open an issue and are interested in working on a fix, please let us
know. We'll help you get started, rather than inadvertently doubling up on your hard work.
* Make sure you do not add regressions by running `yarn test`.
* Where possible, include tests with your changes, either that demonstrates the
bug, or tests the new functionality. If you're not sure how to test your
changes, feel free to ping @gwyneplaine
* Please [follow our established coding conventions](https://github.com/keystonejs/keystone/wiki/Coding-Standards)
(with regards to formatting, etc)
* All new features and changes need documentation.

## Running the docs website

You can run the website in a local environment using the following steps:

```sh
git clone https://github.com/JedWatson/react-select
cd react-select
yarn
yarn build
cd docs
yarn
yarn start
```
**Note:**

* We recommend using [yarn](https://classic.yarnpkg.com/en/) for setting up the local development environment for this project. Using `npm` might raise unexpected errors.
* The docs come without a compiled react-select build. You have to run the **build** task in the project's root directory before running the **start** task as shown above. Alternatively, you can run the **watch** task in parallel.
