/** @jsx jsx */
import { jsx } from '@emotion/react'; // eslint-disable-line no-unused-vars
import { CSSObject } from '@emotion/serialize';
import { ReactNode, useState } from 'react';
import CodeSandboxer, { GitInfo } from 'react-codesandboxer';
import { CodeBlock } from './markdown/renderer';
import pkg from '../packages/react-select/package.json';
import { defaultTheme } from 'react-select';
import Svg, { SvgProps } from './Svg';

const { colors } = defaultTheme;

const gitInfo: GitInfo = {
  account: 'JedWatson',
  repository: 'react-select',
  branch: 'master',
  host: 'github',
};

const sourceUrl = `https://github.com/${gitInfo.account}/react-select/tree/${gitInfo.branch}`;

interface Props {
  children?: ReactNode;
  readonly label: string;
  readonly raw: { readonly default: string };
  readonly urlPath: string;
  readonly isEditable?: boolean;
}

export default ({
  children,
  label,
  raw,
  urlPath,
  isEditable = true,
}: Props) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div>
      <ExampleHeading>
        <h4>{label}</h4>
        <Actions>
          {raw ? (
            <ButtonAction
              onClick={() => setShowCode((prev) => !prev)}
              title="View Source"
            >
              <SourceIcon />
            </ButtonAction>
          ) : (
            <AAction
              href={`${sourceUrl}/${urlPath}`}
              target="_blank"
              title="View Source"
            >
              <SourceIcon />
            </AAction>
          )}
          {isEditable ? (
            <CodeSandboxer
              example={raw.default}
              examplePath={urlPath}
              pkgJSON={pkg}
              gitInfo={gitInfo}
              dependencies={{
                [pkg.name]: pkg.version,
              }}
            >
              {({ isLoading }) => (
                <ButtonAction title="Edit in CodeSandbox">
                  {isLoading ? <Spinner /> : <NewWindowIcon />}
                </ButtonAction>
              )}
            </CodeSandboxer>
          ) : null}
        </Actions>
      </ExampleHeading>
      {showCode && raw ? (
        <CodeBlock literal={raw.default} codeinfo={['jsx']} />
      ) : null}
      {children}
    </div>
  );
};

const ExampleHeading = (props: any) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
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

const SourceIcon = (props: Omit<SvgProps, 'ref' | 'size'>) => (
  <Svg size={16} {...props}>
    <title>Source Code Icon</title>
    <path d="M5.719 14.75c-0.236 0-0.474-0.083-0.664-0.252l-5.060-4.498 5.341-4.748c0.412-0.365 1.044-0.33 1.411 0.083s0.33 1.045-0.083 1.412l-3.659 3.253 3.378 3.002c0.413 0.367 0.45 0.999 0.083 1.412-0.197 0.223-0.472 0.336-0.747 0.336zM14.664 14.748l5.341-4.748-5.060-4.498c-0.413-0.367-1.045-0.33-1.411 0.083s-0.33 1.045 0.083 1.412l3.378 3.003-3.659 3.252c-0.413 0.367-0.45 0.999-0.083 1.412 0.197 0.223 0.472 0.336 0.747 0.336 0.236 0 0.474-0.083 0.664-0.252zM9.986 16.165l2-12c0.091-0.545-0.277-1.060-0.822-1.151-0.547-0.092-1.061 0.277-1.15 0.822l-2 12c-0.091 0.545 0.277 1.060 0.822 1.151 0.056 0.009 0.11 0.013 0.165 0.013 0.48 0 0.904-0.347 0.985-0.835z" />
  </Svg>
);
const NewWindowIcon = (props: Omit<SvgProps, 'ref' | 'size'>) => (
  <Svg size={16} {...props}>
    <title>New Window Icon</title>
    <path d="M18.174 1.826c-1.102-1.102-2.082-0.777-2.082-0.777l-8.639 8.632-1.453 4.319 4.317-1.454 8.634-8.638c0 0 0.324-0.98-0.777-2.082zM10.605 11.605l-0.471 0.47-1.473 0.5c-0.104-0.24-0.234-0.477-0.498-0.74s-0.5-0.394-0.74-0.498l0.5-1.473 0.471-0.47c0 0 0.776-0.089 1.537 0.673 0.762 0.761 0.674 1.538 0.674 1.538zM16 17h-13v-13h5l2-2h-7c-1.1 0-2 0.9-2 2v13c0 1.1 0.9 2 2 2h13c1.1 0 2-0.9 2-2v-7l-2 2v5z" />
  </Svg>
);

const actionCSS: CSSObject = {
  alignItems: 'center',
  background: 0,
  border: 0,
  borderRadius: 3,
  boxSizing: 'border-box',
  color: colors.neutral40,
  cursor: 'pointer',
  display: 'flex',
  fontSize: 'inherit',
  height: 24,
  marginLeft: 2,
  justifyContent: 'center',
  position: 'relative',
  transition: 'background-color 150ms, box-shadow 150ms, color 150ms',
  width: 30,

  ':hover': {
    backgroundColor: colors.neutral5,
    outline: 0,
  },
  ':active': {
    backgroundColor: colors.neutral10,
    bottom: -1,
  },
};

interface ActionProps {
  readonly css?: CSSObject;
}
const ButtonAction = ({
  css,
  ...props
}: ActionProps & Omit<JSX.IntrinsicElements['button'], 'css'>) => {
  return (
    <button
      css={{
        ...actionCSS,
        ...css,
      }}
      {...props}
    />
  );
};
const AAction = ({
  css,
  ...props
}: ActionProps & Omit<JSX.IntrinsicElements['a'], 'css'>) => {
  return (
    <a
      css={{
        ...actionCSS,
        ...css,
      }}
      {...props}
    />
  );
};

const Actions = (props: JSX.IntrinsicElements['div']) => (
  <div
    css={{
      flex: '1 1',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      opacity: 0.8,
      transition: 'opacity 140ms',
      transitionDelay: '140ms',

      '&:hover': {
        opacity: 1,
      },
      '&:focus-within': {
        opacity: 1,
      },
    }}
    {...props}
  />
);

// ==============================
// Spinner
// ==============================

const Spinner = () => {
  const offset = 187;
  const duration = '1.4s';
  const size = 16;

  return (
    <div css={{ height: size, width: size }}>
      <style>{`
      @keyframes rotator {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(270deg); }
      }

      @keyframes dash {
       0% { stroke-dashoffset: ${offset}; }
       50% {
         stroke-dashoffset: ${offset / 4};
         transform:rotate(135deg);
       }
       100% {
         stroke-dashoffset: ${offset};
         transform:rotate(450deg);
       }
      }`}</style>
      <svg
        css={{ animation: `rotator ${duration} linear infinite` }}
        width={size}
        height={size}
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          css={{
            strokeDasharray: offset,
            strokeDashoffset: 0,
            transformOrigin: 'center',
            animation: `dash ${duration} ease-in-out infinite`,
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </div>
  );
};
