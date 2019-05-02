'use strict';
require('dotenv').config();
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

function makeQuery(commitSha) {
  return `
    query {
      search(
        type: ISSUE
        query: "sha:${commitSha}+repo:JedWatson/react-select"
        first: 1
      ) {
        edges {
          node {
            ... on PullRequest {
              number
              author {
                login
              }
            }
          }
        }
      }
    }
  `;
}

const fetch = require('node-fetch');

async function fetchGHData(commitSha) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error(
      'Please create a GitHub personal access token at https://github.com/settings/tokens/new and add it to a .env file in the root of the repository'
    );
  }
  let data = await fetch(
    `https://api.github.com/graphql?access_token=${process.env.GITHUB_TOKEN}`,
    {
      method: 'POST',
      body: JSON.stringify({ query: makeQuery(commitSha) }),
    }
  ).then(x => x.json());

  // this is for the case where
  if (!data.data || !data.data.search || !data.data.search.edges) {
    throw new Error(
      'An error occurred when fetching data from GitHub\n' +
        JSON.stringify(data)
    );
  }
  if (
    !data.data.search.edges[0] ||
    !data.data.search.edges[0].node ||
    !data.data.search.edges[0].node.number ||
    !data.data.search.edges[0].node.author ||
    !data.data.search.edges[0].node.author.login
  ) {
    return null;
  }
  let { node } = data.data.search.edges[0];
  return { username: node.author.login, number: node.number };
}

const getReleaseLine = async (changeset, versionType) => {
  const indentedSummary = changeset.summary
    .split('\n')
    .map(l => `  ${l}`.trimRight())
    .join('\n');
  let data = await fetchGHData(changeset.commit);
  if (data !== null) {
    let { number, username } = data;
    return `- [${versionType}] ${
      changeset.commit
    } [#${number}](https://github.com/JedWatson/react-select/pulls/${number}) Thanks [@${username}](https://github.com/${username}):\n\n${indentedSummary}`;
  }
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
    changeset => `- Updated dependencies [${changeset.commit}]:`
  );

  const updatedDepenenciesList = dependenciesUpdated.map(
    dependency => `  - ${dependency.name}@${dependency.version}`
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
  public: true,
};

module.exports = {
  versionOptions,
  changesetOptions,
  publishOptions,
};
