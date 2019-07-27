import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import mainColor from '@/styles/constants/colors';

const options: ThemeOptions = {
  spacing: 8,
  props: {
    MuiButtonBase: {
      // disableRipple: true // No more ripple, on the whole application 💣!
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif'
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
    }
  }
};

const theme = createMuiTheme(options);

export default theme;
