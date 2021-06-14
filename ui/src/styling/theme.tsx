import React from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';
import GlobalStyle from './global';

const theme = {
  colors: {

  },
  fontSizes: {

  }
}

interface ThemeProviderProps {}
export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  return (
      <StyledComponentThemeProvider theme={theme}>
          <GlobalStyle />
          {props.children}
      </StyledComponentThemeProvider>
  );
};


export default theme;