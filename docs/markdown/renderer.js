// @jsx glam

import glam from 'glam';
import React from 'react';
import md from 'react-markings';

import store from './store';

// ==============================
// Syntax Highlighter
// ==============================

import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import { coy, tomorrow } from 'react-syntax-highlighter/styles/prism';

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

const customTomorrow = {
  ...tomorrow,
  'code[class*="language-"]': {
    ...tomorrow['code[class*="language-"]'],
    fontFamily: null, // inherit from css
  },
  'pre[class*="language-"]': {
    ...tomorrow['pre[class*="language-"]'],
    fontFamily: null, // inherit from css
  },
};

registerLanguage('jsx', jsx);

// ==============================
// Helpers
// ==============================

function slugify(str: string): string {
  return str.replace(/\W/g, '-').toLowerCase();
}

const Anchor = props => (
  <a
    css={{
      color: 'inherit',
      textDecoration: 'none',
    }}
    {...props}
  />
);

// ==============================
// Renderers
// ==============================

function getLabel(children) {
  let str = '';

  if (Array.isArray(children)) {
    children.forEach(c => {
      if (Array.isArray(c)) {
        getLabel(c);
      } else if (c.props) {
        str = c.props.children;
      } else {
        str = c;
      }
    });
  } else if (children.props) {
    getLabel(children.props.children);
  } else {
    str = children;
  }

  return str;
}

const Heading = props => {
  const { children, level, nodeKey } = props;

  const Tag = `h${level}`;
  const label = getLabel(children);
  const slug = slugify(label);
  const linkify = level <= 3;

  if (linkify) {
    store.add(nodeKey, { key: nodeKey, label, level, path: `#${slug}` });
  }

  return linkify ? (
    <Tag
      id={slug}
      css={{ marginTop: 0, '&:not(:first-child)': { paddingTop: '1.8em' } }}
    >
      <Anchor href={`#${slug}`}>{children}</Anchor>
    </Tag>
  ) : (
    <Tag css={{ marginTop: 0, paddingTop: '2em' }}>{children}</Tag>
  );
};

// eslint-disable-next-line no-unused-vars
const Code = ({ children, inline, literal, nodeKey }) => (
  <code
    css={{
      backgroundColor: 'rgba(38, 132, 255, 0.08)',
      color: '#172B4D',
      fontSize: '85%',
      fontStyle: 'normal',
      padding: '1px 5px 2px',
      borderRadius: 4,
    }}
  >
    {literal}
  </code>
);

export const CodeBlock = ({ codeinfo, literal, nodeKey, ...props }) => {
  const language = codeinfo[0];

  // JS is light, others are dark themed
  const style = language === 'js' ? customCoy : customTomorrow;

  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      customStyle={{
        borderRadius: 4,
        fontSize: 13,
        marginBottom: '1em',
        marginTop: '1em',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
      {...props}
    >
      {literal}
    </SyntaxHighlighter>
  );
};
CodeBlock.defaultProps = { language: 'jsx' };

const Blockquote = ({ nodeKey, ...props }) => (
  <blockquote
    css={{
      color: '#7A869A',
      fontSize: '0.9em',
      fontStyle: 'italic',
      marginLeft: 0,
    }}
    {...props}
  />
);

// ==============================
// Exports
// ==============================

export default md.customize({
  renderers: { Blockquote, Code, Heading, CodeBlock },
});
