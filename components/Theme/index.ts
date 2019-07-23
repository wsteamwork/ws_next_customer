import Red from '@material-ui/core/colors/red';
import Orange from '@material-ui/core/colors/orange';
import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { TypographyOptions, FontStyleOptions } from '@material-ui/core/styles/createTypography';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import mainColor from '@/styles/constants/colors';

interface PaletteExtra extends PaletteOptions {
  button: any;
}

export interface ThemeCustom extends ThemeOptions {
  palette?: PaletteExtra;
  typography?: TypographyOptions | FontStyleOptions;
}

const options: ThemeCustom = {
  props: {
    MuiButtonBase: {
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  },
  typography: {
    fontFamily: 'Nunito Sans, sans-serif'
  },
  palette: {
    primary: {
      main: mainColor.primary
    },
    secondary: {
      main: '#fff'
    },
    error: {
      main: mainColor.error
    },
    button: {
      nav: '64px'
    }
  }
};

const theme = createMuiTheme(options);

export default theme;
