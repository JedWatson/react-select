// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core';

const TwitterButton = () => (
  <div css={{ alignItems: 'center', display: 'inline-flex' }}>
    <a
      aria-label="Follow @JedWatson on Twitter"
      css={{
        alignItems: 'center',
        display: 'flex',
        borderRadius: 2,
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 'bold',
        padding: '5px 12px 5px 8px',
        marginLeft: '16px',
        position: 'relative',
        textDecoration: 'none',

        ':hover': {
          border: '1px solid rgba(255, 255, 255, 0.4)',
          background: 'rgba(255, 255, 255, 0.15)',
        },
      }}
      href="https://twitter.com/JedWatson"
      target="_blank"
    >
      <svg
        version="1.1"
        width="16"
        height="16"
        viewBox="0 0 2000 1625.36"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="m 1999.9999,192.4 c -73.58,32.64 -152.67,54.69 -235.66,64.61 84.7,-50.78 149.77,-131.19 180.41,-227.01 -79.29,47.03 -167.1,81.17 -260.57,99.57 C 1609.3399,49.82 1502.6999,0 1384.6799,0 c -226.6,0 -410.328,183.71 -410.328,410.31 0,32.16 3.628,63.48 10.625,93.51 -341.016,-17.11 -643.368,-180.47 -845.739,-428.72 -35.324,60.6 -55.5583,131.09 -55.5583,206.29 0,142.36 72.4373,267.95 182.5433,341.53 -67.262,-2.13 -130.535,-20.59 -185.8519,-51.32 -0.039,1.71 -0.039,3.42 -0.039,5.16 0,198.803 141.441,364.635 329.145,402.342 -34.426,9.375 -70.676,14.395 -108.098,14.395 -26.441,0 -52.145,-2.578 -77.203,-7.364 52.215,163.008 203.75,281.649 383.304,284.946 -140.429,110.062 -317.351,175.66 -509.5972,175.66 -33.1211,0 -65.7851,-1.949 -97.8828,-5.738 181.586,116.4176 397.27,184.359 628.988,184.359 754.732,0 1167.462,-625.238 1167.462,-1167.47 0,-17.79 -0.41,-35.48 -1.2,-53.08 80.1799,-57.86 149.7399,-130.12 204.7499,-212.41" />
      </svg>
      <span css={{ paddingLeft: 8 }}>Follow</span>
    </a>
  </div>
);

export default TwitterButton;
