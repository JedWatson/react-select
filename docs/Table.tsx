/** @jsx jsx */
import { FunctionComponent } from 'react';
import { jsx } from '@emotion/react';

export const Table: FunctionComponent = ({ children }) => (
  <table
    css={{
      width: '100%',
      marginTop: '30px',
      borderCollapse: 'collapse',
    }}
  >
    {children}
  </table>
);

export const Header: FunctionComponent = ({ children }) => (
  <td
    css={{
      fontWeight: 'bold',
      padding: '4px 8px 4px 0',
      borderBottom: '3px solid #eee',
    }}
  >
    {children}
  </td>
);

export const Cell: FunctionComponent = ({ children }) => (
  <td
    css={{
      fontSize: '90%',
      padding: '4px 8px 4px 0',
      borderBottom: '1px solid #eee',
      verticalAlign: 'top',
    }}
  >
    {children}
  </td>
);
