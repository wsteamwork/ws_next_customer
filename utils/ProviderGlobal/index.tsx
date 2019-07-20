import React, { FC } from 'react';
import { compose } from 'recompose';
import withWidth from '@material-ui/core/withWidth';
import { CookiesProvider } from 'react-cookie';
import { withRouter } from 'next/router';
import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';

interface IProps extends IGlobalContext {}

const ProviderGlobal: FC<IProps> = (props) => {
  const { width, router, children } = props;

  return (
    <CookiesProvider>
      <GlobalContext.Provider value={{ width, router }}>{children}</GlobalContext.Provider>
    </CookiesProvider>
  );
};

export default compose<IProps, any>(
  withWidth(),
  withRouter
)(ProviderGlobal);
