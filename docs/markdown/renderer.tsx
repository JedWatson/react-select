/** @jsx emotionJSX */
import md, {
  CodeProps,
  CommonProps,
  HeadingProps,
  LinkProps,
} from 'react-markings';
import { jsx as emotionJSX } from '@emotion/react'; // eslint-disable-line no-unused-vars
import { Link as RRLink } from 'react-router-dom';

import Svg, { SvgProps } from '../Svg';
import store from './store';

// ==============================
// Syntax Highlighter
// ==============================

import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import { coy } from 'react-syntax-highlighter/styles/prism';
import { ReactElement } from 'react';

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

registerLanguage('jsx', jsx);

// ==============================
// Helpers
// ==============================

function slugify(str: string): string {
  return str.replace(/\W/g, '-').toLowerCase();
}

// ==============================
// Renderers
// ==============================

function isReactElement(child: ReactElement | string): child is ReactElement {
  return (child as ReactElement).props;
}

function getLabel(children: (ReactElement | string)[] | ReactElement | string) {
  let str = '';

  if (Array.isArray(children)) {
    children.forEach(c => {
      if (Array.isArray(c)) {
        getLabel(c);
      } else if (isReactElement(c)) {
        str = c.props.children;
      } else {
        str = c;
      }
    });
  } else if (isReactElement(children)) {
    getLabel(children.props.children);
  } else {
    str = children;
  }

  return str;
}

const Chain = (props: Omit<SvgProps, 'ref' | 'size'>) => (
  <Svg
    size={16}
    css={{
      color: '#4C9AFF',
      paddingRight: 10,
      opacity: 0,
      position: 'absolute',
      top: '50%',
      transform: 'translate(-100%, -50%)',
      transition: 'opacity 200ms',
    }}
    {...props}
  >
    <title>Link to</title>
    <path d="M7.859 14.691l-0.81 0.805c-0.701 0.695-1.843 0.695-2.545 0-0.336-0.334-0.521-0.779-0.521-1.252s0.186-0.916 0.521-1.252l2.98-2.955c0.617-0.613 1.779-1.515 2.626-0.675 0.389 0.386 1.016 0.384 1.403-0.005 0.385-0.389 0.383-1.017-0.006-1.402-1.438-1.428-3.566-1.164-5.419 0.675l-2.98 2.956c-0.715 0.709-1.108 1.654-1.108 2.658 0 1.006 0.394 1.949 1.108 2.658 0.736 0.73 1.702 1.096 2.669 1.096s1.934-0.365 2.669-1.096l0.811-0.805c0.389-0.385 0.391-1.012 0.005-1.4s-1.014-0.39-1.403-0.006zM16.891 3.207c-1.547-1.534-3.709-1.617-5.139-0.197l-1.009 1.002c-0.389 0.386-0.392 1.013-0.006 1.401 0.386 0.389 1.013 0.391 1.402 0.005l1.010-1.001c0.74-0.736 1.711-0.431 2.346 0.197 0.336 0.335 0.522 0.779 0.522 1.252s-0.186 0.917-0.522 1.251l-3.18 3.154c-1.454 1.441-2.136 0.766-2.427 0.477-0.389-0.386-1.016-0.383-1.401 0.005s-0.384 1.017 0.005 1.401c0.668 0.662 1.43 0.99 2.228 0.99 0.977 0 2.010-0.492 2.993-1.467l3.18-3.153c0.712-0.71 1.107-1.654 1.107-2.658s-0.395-1.949-1.109-2.659z" />
  </Svg>
);

const Heading = (props: HeadingProps) => {
  const { children, level, nodeKey } = props;

  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const label = getLabel(children);
  const slug = slugify(label);
  const linkify = [1, 2].includes(level);

  if (linkify) {
    store.add(nodeKey, { key: nodeKey, label, level, path: `#${slug}` });
  }
  const css = {
    marginTop: 0,
    '&:not(:first-of-type)': { marginTop: 30 },
  };

  return linkify ? (
    <Tag id={slug} css={css}>
      <RRLink
        to={`#${slug}`}
        css={{
          color: 'inherit',
          position: 'relative',
          textDecoration: 'none',
          '&:hover > svg': { opacity: 1, transitionDelay: '300ms' },
        }}
      >
        <Chain />
        {children}
      </RRLink>
    </Tag>
  ) : (
    <Tag css={css}>{children}</Tag>
  );
};

export const Code = ({ literal }: CodeProps) => (
  <code
    css={{
      backgroundColor: 'rgba(38, 132, 255, 0.08)',
      color: '#172B4D',
      fontSize: '90%',
      fontStyle: 'normal',
      padding: '1px 5px 2px',
      borderRadius: 4,
    }}
  >
    {literal}
  </code>
);

interface CodeBlockProps {
  codeinfo?: string[];
  literal: string | null;
  nodeKey?: string;
}

export const CodeBlock = ({
  codeinfo,
  literal,
  nodeKey,
  ...props
}: CodeBlockProps) => {
  const language = codeinfo![0];

  return (
    <SyntaxHighlighter
      language={language}
      style={customCoy}
      customStyle={{
        backgroundColor: 'none',
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
CodeBlock.defaultProps = { codeinfo: [], language: 'jsx' };

const Blockquote = ({ nodeKey, ...props }: CommonProps) => (
  <blockquote
    css={{
      color: '#7A869A',
      fontStyle: 'italic',
      marginLeft: 0,
      paddingLeft: 16,
      borderLeft: '4px solid #eee',
    }}
    {...props}
  />
);

const Link = ({ nodeKey, href, ...props }: LinkProps) =>
  href[0] === '/' ? (
    <RRLink to={href} {...props} />
  ) : (
    <a href={href} {...props} />
  );

// ==============================
// Exports
// ==============================

export default md.customize({
  renderers: { Blockquote, Code, Heading, CodeBlock, Link },
});
