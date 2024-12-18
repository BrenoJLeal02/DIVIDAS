// theme/theme.ts
import { extendTheme } from '@chakra-ui/react';

const initialTheme = extendTheme({
  colors: {
    primary: '#3182CE',
    secondary: '#2D3748',
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Georgia, serif',
  },
});

export default initialTheme;
