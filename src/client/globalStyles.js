import { injectGlobal } from 'styled-components';

export const applyGlobalStyles = () => injectGlobal`
  body {
    color: #555;
  }
`;
