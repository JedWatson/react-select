import styled from 'styled-components';
import { borderRadius, colors, themed } from '@atlaskit/theme';

const Type = styled.span`
  background-color: ${themed({ light: colors.P50, dark: colors.P500 })};
  border-radius: ${borderRadius}px;
  color: ${themed({ light: colors.P500, dark: colors.P50 })};
  display: inline-block;
  margin: 2px 0;
  padding: 0 0.2em;
`;

// $FlowFixMe
export const TypeMeta = styled(Type)`
  background-color: ${themed({ light: colors.N20, dark: colors.DN50 })};
  color: ${colors.subtleText};
`;

// $FlowFixMe
export const StringType = styled(Type)`
  background-color: ${themed({ light: colors.G50, dark: colors.G500 })};
  color: ${themed({ light: colors.G500, dark: colors.G100 })};
`;

export default Type;
