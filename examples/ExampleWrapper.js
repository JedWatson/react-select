import React, { Component } from 'react';
import CodeSandboxer, { replaceImports } from 'react-codesandboxer';
import { Action, Actions, ExampleHeading } from './components';
const user = 'JedWatson';
const branch = 'v2';

const sourceUrl = `https://github.com/${user}/react-select/tree/${branch}`;
const rawUrl = `https://raw.githubusercontent.com/${user}/react-select/${branch}`;
const rawPKGJSON = rawUrl + '/package.json';

const rawDataUrl = rawUrl + '/examples/data.js';
const rawComponentsUrl = rawUrl + '/examples/components.js';
const promise = urlPath =>
  fetch(rawUrl + urlPath)
    .then(a => a.text())
    .then(a =>
      replaceImports(a, [
        ['../../../src/*', 'react-select/lib/'],
        ['../../../src', 'react-select'],
        ['../../data', './data'],
        ['../../components', './components'],
      ])
    );

export default class ExampleWrapper extends Component {
  static defaultProps = { isEditable: true };
  render() {
    const configPromise = Promise.all([
      fetch(rawDataUrl).then(a => a.text()),
      fetch(rawComponentsUrl).then(a => a.text()).then(a => replaceImports(a, [
		  ['../src/*', 'react-select/lib/'],
	  ])),
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
        <ExampleHeading>
          <h4>{this.props.label}</h4>
          <Actions>
            <Action
              icon="source"
              href={sourceUrl + this.props.urlPath}
              tag="a"
              target="_blank"
            >
              View Source
            </Action>
            {this.props.isEditable ? (
              <CodeSandboxer
                config={configPromise}
                example={promise(this.props.urlPath)}
                pkgJSON={fetch(rawPKGJSON).then(a => a.json())}
              >
                <Action icon="new-window" type="submit">
                  Open in CodeSandbox
                </Action>
              </CodeSandboxer>
            ) : null}
          </Actions>
        </ExampleHeading>
        {this.props.children}
      </div>
    );
  }
}
