import React, { FC, useReducer, useEffect } from 'react';
import { compose } from 'recompose';
import withWidth from '@material-ui/core/withWidth';
import { CookiesProvider, withCookies } from 'react-cookie';
import { withRouter } from 'next/router';
import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
import Cookies from 'universal-cookie';
import {
  ProfileContext,
  ProfileAction,
  ProfileReducer,
  ProfileState,
  ProfileStateInit,
  getDataProfile
} from '@/store/Context/Profile/ProfileContext';

interface IProps extends IGlobalContext {}

const cookieRefresher = () => {
  const cookies = new Cookies();
  let checkExpireToken = cookies.get('token_expires');

  if (!checkExpireToken && cookies.get('_token')) {
    cookies.set('_token', cookies.get('_token'), {
      maxAge: 1800,
      path: '/'
    });
  }
};

const ProviderGlobal: FC<IProps> = (props) => {
  const { width, router, children } = props;
  cookieRefresher();
  return (
    <CookiesProvider>
      <GlobalContext.Provider value={{ width, router }}>{children}</GlobalContext.Provider>
    </CookiesProvider>
  );
};

export default compose<IProps, any>(
  withWidth(),
  withRouter,
  withCookies
)(ProviderGlobal);
