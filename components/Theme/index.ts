import mainColor from '@/styles/constants/colors';
import fontWeight from '@/styles/constants/fontWeight';
import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { TypographyOptions, FontStyleOptions } from '@material-ui/core/styles/createTypography';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
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
      // disableRipple: true // No more ripple, on the whole application 💣!
    }
  },
  typography: {
    body1: {
      fontSize: 14
    },
    h1: {
      color: mainColor.titleText
    },
    subtitle1: {
      color: mainColor.blurText
    },
    fontWeightRegular: fontWeight.medium,
    // fontFamily: 'Quicksand, sans-serif'
    fontFamily:
      'Circular, -apple-system, BlinkMacSystemFont, Montserrat Alternates, "Quicksand", sans-serif !important'
  },
  palette: {
    text: {
      primary: mainColor.titleText,
      secondary: mainColor.subTitleText,
      disabled: mainColor.blurText
    },
    primary: {
      main: mainColor.primary
    },
    secondary: {
      main: mainColor.backgroundWhite
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
