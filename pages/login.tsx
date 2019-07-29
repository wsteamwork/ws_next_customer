import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { axios } from '@/utils/axiosInstance';
import { LoginRes } from '@/types/Requests/Account/AccountResponses';
import { withCookies, Cookies, useCookies } from 'react-cookie';

interface Iprops {
  cookies: Cookies;
}

const Login: NextPage<Iprops> = (props) => {
  const { cookies } = props;

  const login = () => {
    axios.post('login', { username: 'test@westay.vn', password: '123456' }).then((res) => {
      const data: LoginRes = res.data;
      let cookieTime = 1800;

      cookies.set('_token', data.access_token, {
        path: '/',
        maxAge: cookieTime
      });
    });
  };
  return <button onClick={login}>Login</button>;
};

export default withCookies(Login);
