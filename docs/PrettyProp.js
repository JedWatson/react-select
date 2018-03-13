// @flow
// @jsx glam

import glam from 'glam';
import React, { type Node } from 'react';

import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import typescript from 'react-syntax-highlighter/languages/prism/typescript';
import { coy } from 'react-syntax-highlighter/styles/prism';

const customCoy = {
  ...coy,
  'code[class*="language-"]': {
    ...coy['code[class*="language-"]'],
    fontFamily: null, // inherit from css
  },
  'pre[class*="language-"]': {
    ...coy['pre[class*="language-"]'],
    fontFamily: null, // inherit from css
  },
};

registerLanguage('typescript', typescript);

const colors = {
  blueText: '#0747A6',
  blueBg: '#DEEBFF',
  grayText: '#5E6C84',
  grayTextLight: '#8993A4',
  grayBg: '#F4F5F7',
  purpleText: '#403294',
  purpleBg: '#EAE6FF',
  greenText: '#006644',
  greenBg: '#E3FCEF',
  redText: '#BF2600',
  redBg: '#FFEBE6',
};

type Props = {
  defaultValue?: any,
  description: string | Node,
  isRequired?: boolean,
  name: string,
  type: string,
  typeDefinition?: any,
};

export const TypeDefinition = ({ children }: { children: Node }) => (
  <SyntaxHighlighter
    language="typescript"
    style={customCoy}
    customStyle={{
      backgroundColor: 'transparent',
      borderRadius: 0,
      fontSize: 13,
      fontFamily: 'Roboto Mono, Monaco, monospace',
      marginTop: '1em',
      maxWidth: '100%',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    {children}
  </SyntaxHighlighter>
);

const Heading = props => (
  <h3
    css={{
      fontSize: '0.9rem',
      fontWeight: 'normal',
      lineHeight: 1.4,
      margin: '2em 0 0',
    }}
    {...props}
  />
);

const Required = props => (
  <span
    css={{
      color: colors.redText,
    }}
    {...props}
  />
);

const code = {
  borderRadius: 3,
  display: 'inline-block',
  margin: 0,
  padding: '0.2em 0.4em',
};

const Type = props => (
  <span
    css={{
      ...code,
      background: colors.grayBg,
      color: colors.grayText,
    }}
    {...props}
  />
);
const Name = props => (
  <span
    css={{
      ...code,
      background: colors.blueBg,
      color: colors.blueText,
      marginRight: '0.8em',
    }}
    {...props}
  />
);

const Default = props => (
  <code
    css={{
      ...code,
      color: colors.grayText,
    }}
    {...props}
  />
);

const PrettyProp = (props: Props) => {
  const {
    defaultValue,
    description,
    isRequired,
    name,
    type,
    typeDefinition,
  } = props;
  const simple = typeof description === 'string';
  const descriptionNode = simple ? <p>{description}</p> : description;

  return (
    <div>
      <Heading>
        <code>
          <Name>{name}</Name>
          <Type>{type}</Type>
          {defaultValue ? <Default> = {defaultValue}</Default> : null}
          {isRequired ? <Required> required</Required> : null}
        </code>
      </Heading>
      {descriptionNode}
      {typeDefinition ? (
        <TypeDefinition>{typeDefinition}</TypeDefinition>
      ) : null}
    </div>
  );
};

export default PrettyProp;
