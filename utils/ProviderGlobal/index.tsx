import React, { FC, Suspense, useReducer } from 'react';
import { compose } from 'recompose';
import withWidth from '@material-ui/core/withWidth';
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
import { MuiThemeProvider } from '@material-ui/core';
import theme from '@/components/Theme';

interface IProps extends Partial<IGlobalContext> {}

const ProviderGlobal: FC<IProps> = (props) => {
  const { width, router, children } = props;
  const [state, dispatch] = useReducer(GlobalReducer, GlobalStateInit);

  return (
    <Suspense fallback={null}>
      <MuiThemeProvider theme={theme}>
        <CookiesProvider>
          <I18nextProvider i18n={i18n}>
            <GlobalContext.Provider value={{ width, router, state, dispatch }}>
              {children}
            </GlobalContext.Provider>
          </I18nextProvider>
        </CookiesProvider>
      </MuiThemeProvider>
    </Suspense>
  );
};

export default compose<IProps, any>(
  withWidth(),
  withRouter
)(ProviderGlobal);
