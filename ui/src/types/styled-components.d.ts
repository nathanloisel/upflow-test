import Theme from '../styling/theme';

type ThemeInterface = Theme;
declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
