/*
Hey, welcome to the changeset config! This file has been generated
for you with the default configs we use, and some comments around
what options mean, so that it's easy to customise your workflow.

You should update this as you need to craft your workflow.

Config provided by a CI command takes precedence over the contents of this file.

If a config option isn't present here, we will fall back to the defaults.
*/

const changesetOptions = {
  // If true, we will automatically commit the changeset when the command is run
  commit: false,
};

// This function takes information about a changeset to generate an entry for it in your
// changelog. We provide the full changeset object as well as the version.
// It may be a good idea to replace the commit hash with a link to the commit.

/* the default shape is:
- [patch] ABCDEFG:

  A summary message you wrote, indented
*/

const getReleaseLine = async (changeset, versionType) => {
  const indentedSummary = changeset.summary
    .split('\n')
    .map(l => `  ${l}`.trimRight())
    .join('\n');

  return `- [${versionType}] ${changeset.commit}:\n\n${indentedSummary}`;
};

// This function takes information about what dependencies we are updating in the package.
// It provides an array of related changesets, as well as the dependencies updated.

/*
- Updated dependencies: [ABCDEFG]:
- Updated dependencies: [HIJKLMN]:
  - dependencyA@1.0.1
  - dependencyb@1.2.0
*/
const getDependencyReleaseLine = async (changesets, dependenciesUpdated) => {
  if (dependenciesUpdated.length === 0) return '';

  const changesetLinks = changesets.map(
    changeset => `- Updated dependencies [${changeset.commit}]:`,
  );

  const updatedDepenenciesList = dependenciesUpdated.map(
    dependency => `  - ${dependency.name}@${dependency.version}`,
  );

  return [...changesetLinks, ...updatedDepenenciesList].join('\n');
};

const versionOptions = {
  // If true, we will automatically commit the version updating when the command is run
  commit: false,
  // Adds a skipCI flag to the commit - only valid if `commit` is also true.
  skipCI: false,
  // Do not modify the `changelog.md` files for packages that are updated
  noChangelog: false,
  // A function that returns a string. It takes in options about a change. This allows you to customise your changelog entries
  getReleaseLine,
  // A function that returns a string. It takes in options about when a pacakge is updated because
  getDependencyReleaseLine,
};

const publishOptions = {
  // This sets whether unpublished packages are public by default. We err on the side of caution here.
  public: false,
};

module.exports = {
  versionOptions,
  changesetOptions,
  publishOptions,
};
