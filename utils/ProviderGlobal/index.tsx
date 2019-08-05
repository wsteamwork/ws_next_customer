import React, { FC, useReducer, memo } from 'react';
import { compose } from 'recompose';
import { CookiesProvider } from 'react-cookie';
import { withRouter } from 'next/router';
import {
  GlobalContext,
  IGlobalContext,
  GlobalReducer,
  GlobalStateInit
} from '@/store/Context/GlobalContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/translations/index';
import { MuiThemeProvider, useMediaQuery } from '@material-ui/core';
import theme from '@/components/Theme';
import classNames from 'classnames';

function useWidth() {
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

interface IProps extends Partial<IGlobalContext> { }

const ProviderGlobal: FC<IProps> = (props) => {
  const { router, children } = props;
  const width = useWidth();

  const [state, dispatch] = useReducer(GlobalReducer, GlobalStateInit);
  const { overlay } = state;

  const handleOverlay = () => {
    dispatch({ type: 'setOverlay', payload: false });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CookiesProvider>
        <I18nextProvider i18n={i18n}>
          <GlobalContext.Provider value={{ width, router, state, dispatch }}>
            <div className={classNames({ overlay: overlay })} onClick={handleOverlay}></div>
            {children}
          </GlobalContext.Provider>
        </I18nextProvider>
      </CookiesProvider>
    </MuiThemeProvider>
  );
};

export default compose<IProps, any>(
  withRouter,
  memo
)(ProviderGlobal);
