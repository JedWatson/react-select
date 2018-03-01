// @jsx glam

import glam from 'glam';
import React, { Component } from 'react';
import CodeSandboxer, { replaceImports } from 'react-codesandboxer';

import { colors } from '../src/theme';
import Svg from './Svg';

const user = 'JedWatson';
const branch = 'v2';

const sourceUrl = `https://github.com/${user}/react-select/tree/${branch}`;
const rawUrl = `https://raw.githubusercontent.com/${user}/react-select/${branch}`;
const rawPKGJSON = rawUrl + '/package.json';

const rawDataUrl = rawUrl + '/docs/data.js';
const rawComponentsUrl = rawUrl + '/docs/styled-components.js';
const promise = urlPath =>
  fetch(rawUrl + urlPath)
    .then(a => a.text())
    .then(a =>
      replaceImports(a, [
        ['../../../src/*', 'react-select/lib/'],
        ['../../../src', 'react-select'],
        ['../../data', './data'],
        ['../../styled-components', './styled-components'],
      ])
    );

export default class ExampleWrapper extends Component {
  static defaultProps = { isEditable: true };
  configPromise = () =>
    Promise.all([
      fetch(rawDataUrl).then(a => a.text()),
      fetch(rawComponentsUrl)
        .then(a => a.text())
        .then(a => replaceImports(a, [['../src/*', 'react-select/lib/']])),
    ]).then(([data, components]) => ({
      providedDeps: { glam: '^5.0.1' },
      providedFiles: {
        'data.js': {
          content: data,
        },
        'styled-components.js': {
          content: components,
        },
      },
    }));
  render() {
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
                config={this.configPromise}
                example={promise(this.props.urlPath)}
                pkgJSON={fetch(rawPKGJSON).then(a => a.json())}
              >
                <Action icon="new-window" type="submit">
                  Edit in CodeSandbox
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

const ExampleHeading = (props: any) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex ',
      justifyContent: 'space-between',
      paddingBottom: '1em',
      paddingTop: '1.25em',

      '& > h4': {
        margin: 0,
      },
    }}
    {...props}
  />
);

// ==============================
// Source & Sandbox Actions
// ==============================

const SourceIcon = (props: any) => (
  <Svg alt="Source Code Icon" size={16} {...props}>
    <path d="M5.719 14.75c-0.236 0-0.474-0.083-0.664-0.252l-5.060-4.498 5.341-4.748c0.412-0.365 1.044-0.33 1.411 0.083s0.33 1.045-0.083 1.412l-3.659 3.253 3.378 3.002c0.413 0.367 0.45 0.999 0.083 1.412-0.197 0.223-0.472 0.336-0.747 0.336zM14.664 14.748l5.341-4.748-5.060-4.498c-0.413-0.367-1.045-0.33-1.411 0.083s-0.33 1.045 0.083 1.412l3.378 3.003-3.659 3.252c-0.413 0.367-0.45 0.999-0.083 1.412 0.197 0.223 0.472 0.336 0.747 0.336 0.236 0 0.474-0.083 0.664-0.252zM9.986 16.165l2-12c0.091-0.545-0.277-1.060-0.822-1.151-0.547-0.092-1.061 0.277-1.15 0.822l-2 12c-0.091 0.545 0.277 1.060 0.822 1.151 0.056 0.009 0.11 0.013 0.165 0.013 0.48 0 0.904-0.347 0.985-0.835z" />
  </Svg>
);
const NewWindowIcon = (props: any) => (
  <Svg alt="New Window Icon" size={16} {...props}>
    <path d="M18.174 1.826c-1.102-1.102-2.082-0.777-2.082-0.777l-8.639 8.632-1.453 4.319 4.317-1.454 8.634-8.638c0 0 0.324-0.98-0.777-2.082zM10.605 11.605l-0.471 0.47-1.473 0.5c-0.104-0.24-0.234-0.477-0.498-0.74s-0.5-0.394-0.74-0.498l0.5-1.473 0.471-0.47c0 0 0.776-0.089 1.537 0.673 0.762 0.761 0.674 1.538 0.674 1.538zM16 17h-13v-13h5l2-2h-7c-1.1 0-2 0.9-2 2v13c0 1.1 0.9 2 2 2h13c1.1 0 2-0.9 2-2v-7l-2 2v5z" />
  </Svg>
);

const icons = {
  source: SourceIcon,
  'new-window': NewWindowIcon,
};
type ActionProps = {
  children: string,
  css?: Object,
  icon: $Keys<typeof icons>,
  tag: 'a' | 'button',
};
const Action = ({
  children,
  css,
  icon,
  tag: Tag = 'button',
  ...props
}: ActionProps) => {
  const Icon = icons[icon];

  return (
    <Tag
      css={{
        alignItems: 'center',
        background: 0,
        border: 0,
        borderRadius: 3,
        boxSizing: 'border-box',
        color: colors.neutral40,
        cursor: 'pointer',
        display: 'flex ',
        fontSize: 'inherit',
        height: 24,
        marginLeft: 2,
        justifyContent: 'center',
        position: 'relative',
        transition: 'background-color 150ms, box-shadow 150ms, color 150ms',
        width: 30,

        ':hover': {
          backgroundColor: colors.neutral5,
          color: colors.text,
          outline: 0,
        },
        ':active': {
          backgroundColor: colors.neutral10,
          bottom: -1,
        },
        ':focus': {
          outline: 0,
        },

        ...css,
      }}
      title={children}
      {...props}
    >
      <Icon />
    </Tag>
  );
};
const Actions = (props: any) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex ',
      justifyContent: 'space-between',
      opacity: 0,
      transition: 'opacity 200ms, visibility 200ms',
      transitionDelay: '200ms',
      visibility: 'hidden',

      '*:hover > &': {
        opacity: 1,
        transitionDelay: 0,
        visibility: 'visible',
      },
    }}
    {...props}
  />
);
