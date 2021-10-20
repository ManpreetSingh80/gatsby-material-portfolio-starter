import { red } from '@material-ui/core/colors';

// A custom theme for this app
const theme = {
    palette: {
      type: 'light',
      primary: {
        main: '#6002ee',
      },
      secondary: {
        main: '#0097a7',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
    },
    typography: {
      fontFamily: ['"Roboto"', '"Lato"', 'serif'].join(','),
      h1: {
        fontWeight: 400,
        lineHeight: '48px',
        fontSize: '40px',
      },
      p: {
        fontSize: '18px',
        lineHeight: 1.58
      }
    }
};
  
export default theme;