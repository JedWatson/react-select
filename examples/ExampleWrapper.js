import React, { Component } from 'react';
import CodeSandboxer, { replaceImports } from 'react-codesandboxer';
import { Link } from './components';
const user = 'JedWatson';
const branch = 'v2';

const sourceUrl = `https://github.com/${user}/react-select/tree/${branch}`;
const rawUrl = `https://raw.githubusercontent.com/${user}/react-select/${branch}`;
const rawPKGJSON = rawUrl + '/package.json';

const rawDataUrl = rawUrl + '/examples/data.js';
const rawComponentsUrl = rawUrl + '/examples/components.js';

export default class ExampleWrapper extends Component {
  render() {
    const configPromise = Promise.all([
      fetch(rawDataUrl).then(a => a.text()),
      fetch(rawComponentsUrl).then(a => a.text()),
    ]).then(([data, components]) => ({
      providedDeps: { glam: '^5.0.1' },
      providedFiles: {
        'data.js': {
          content: data,
        },
        'components.js': {
          content: components,
        },
      },
    }));

    return (
      <div>
        <h4>
          {this.props.label}
          {' - '}
          <Link href={sourceUrl + this.props.urlPath}>Source</Link>
          {' - '}
          <CodeSandboxer
            skipDeploy
            afterDeploy={console.log}
            example={fetch(rawUrl + this.props.urlPath)
              .then(a => a.text())
              .then(a =>
                replaceImports(a, [
                  ['../../src/*', 'react-select/lib/'],
                  ['../../src', 'react-select'],
                  ['../../data', './data'],
                  ['../../components', './components'],
                ])
              )}
            pkgJSON={fetch(rawPKGJSON).then(a => a.json())}
            config={configPromise}
          >
            <button type="submit">Open in CodeSandbox</button>
          </CodeSandboxer>
        </h4>
        {this.props.children}
      </div>
    );
  }
}
