import React from 'react';
import '@storybook/addon-console';

import ThemeProvider from './theme-provider';

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  )
];