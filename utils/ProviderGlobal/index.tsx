import React, { FC, Suspense } from 'react';
import { compose } from 'recompose';
import withWidth from '@material-ui/core/withWidth';
import { CookiesProvider } from 'react-cookie';
import { withRouter } from 'next/router';
import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/translations/index';

interface IProps extends IGlobalContext {}

const ProviderGlobal: FC<IProps> = (props) => {
  const { width, router, children } = props;

  return (
    <Suspense fallback={null}>
      <CookiesProvider>
        <I18nextProvider i18n={i18n}>
          <GlobalContext.Provider value={{ width, router }}>{children}</GlobalContext.Provider>
        </I18nextProvider>
      </CookiesProvider>
    </Suspense>
  );
};

export default compose<IProps, any>(
  withWidth(),
  withRouter
)(ProviderGlobal);
