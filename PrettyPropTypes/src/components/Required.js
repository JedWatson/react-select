import styled from 'styled-components';
import { colors, themed } from '@atlaskit/theme';

const Required = styled.span`
  color: ${themed({ light: colors.R500, dark: colors.R300 })};
`;

export default Required;
