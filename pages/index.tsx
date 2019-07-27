import React, { useContext, useEffect, useReducer, Fragment } from 'react';
import { NextPage, NextPageContext } from 'next';
import NextHead from '@/components/NextHead';
import Link from 'next/link';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { useCookies } from 'react-cookie';
import NavHeader from '@/components/Toolbar/NavHeader';
import GridContainer from '@/components/Layout/GridContainer';
import CardIntro from '@/components/Cards/CardIntro';
import { Grid } from '@material-ui/core';

const Home: NextPage = () => {
  const { t, i18n }: UseTranslationResponse = useTranslation();
  const [cookies, setCookie, removeCookie]  = useCookies(['initLanguage']);

  const handleChangeVN = () => {
    i18n.changeLanguage('vi');
    setCookie('initLanguage', 'vi');
  };

  const handleChangeEN = () => {
    i18n.changeLanguage('en');
    setCookie('initLanguage', 'en');
  };

  return (
    <Fragment>
      <NextHead
        title = 'Nextjs Demo'
        description = 'Welcome to Nextjs'
        url = 'https://nextjs.org/' />

      <NavHeader />

    </Fragment>
  );
};

export default Home;
