// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core';

type Props = { count: number, repo: string };

const StarButton = ({ count, repo }: Props) => (
  <div css={{ alignItems: 'center', display: 'inline-flex', minWidth: 128 }}>
    <a
      aria-label="Star react-select on GitHub"
      css={{
        alignItems: 'center',
        display: 'flex',
        borderRadius: 2,
        color: '#253858',
        backgroundColor: 'white',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 'bold',
        padding: '6px 10px',
        position: 'relative',
        textDecoration: 'none',

        ':hover': {
          boxShadow: '0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.2)',
          color: '#091e42',
        },
        ':active': {
          background: '#DFE1E5',
          boxShadow: '0 1px 0 rgba(0, 0, 0, 0.2)',
          color: '#091e42',
          bottom: -1,
        },
      }}
      style={{
        backgroundImage: 'linear-gradient(180deg, #fff 33%, #DFE1E5 100%)',
      }}
      href={repo}
      target="_blank"
    >
      <svg
        version="1.1"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
      <span css={{ paddingLeft: 4 }}>Star</span>
    </a>
    <a
      css={{
        backgroundColor: 'white',
        borderRadius: 2,
        color: '#253858',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '-0.01em',
        marginLeft: 6,
        opacity: count > 0 ? 1 : 0,
        padding: '6px 7px',
        position: 'relative',
        textDecoration: 'none',
        transition: 'opacity 200ms',

        '&:before': {
          border: '4px solid transparent',
          borderRightColor: 'white',
          content: '" "',
          height: 0,
          left: -8,
          top: '50%',
          marginTop: -4,
          position: 'absolute',
          width: 0,
        },
      }}
      href={`${repo}/stargazers`}
      target="_blank"
    >
      <span>{count && count.toLocaleString()}</span>
    </a>
  </div>
);

export default StarButton;
