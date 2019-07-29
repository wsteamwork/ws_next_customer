import React, { FC, Suspense, useReducer, memo } from 'react';
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
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/Redux';
import { PersistGate } from 'redux-persist/integration/react';
import classNames from 'classnames';

interface IProps extends Partial<IGlobalContext> {}

const ProviderGlobal: FC<IProps> = (props) => {
  const { width, router, children } = props;
  const [state, dispatch] = useReducer(GlobalReducer, GlobalStateInit);
  const { overlay } = state;

  const handleOverlay = () => {
    dispatch({ type: 'setOverlay', payload: false });
  };

  return (
    <Suspense fallback={null}>
      <MuiThemeProvider theme={theme}>
        <CookiesProvider>
          <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <PersistGate persistor={persistor} loading={null}>
                <GlobalContext.Provider value={{ width, router, state, dispatch }}>
                  <div className={classNames({ overlay: overlay })} onClick={handleOverlay}></div>
                  {children}
                </GlobalContext.Provider>
              </PersistGate>
            </Provider>
          </I18nextProvider>
        </CookiesProvider>
      </MuiThemeProvider>
    </Suspense>
  );
};

export default compose<IProps, any>(
  withWidth(),
  withRouter,
  memo
)(ProviderGlobal);
