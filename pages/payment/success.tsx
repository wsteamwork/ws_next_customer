import React from 'react';
import { Grid } from '@material-ui/core';
import NavHeader from '@/components/Toolbar/NavHeader';
import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import Link from 'next/link';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

const Success: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Grid className="paymentSuccess">
      <NavHeader></NavHeader>
      <GridContainer xs={11} className={'content'}>
        <Grid container spacing={0} className={'content'}>
          <h1 className={'textContent'}>{t('payment:success:paymentSuccess')}</h1>
          <p className={'textContent'}>{t('payment:success:thankYou')}</p>
          <Link href="/">
            <a className="textContent">{t('payment:success:backHome')}</a>
          </Link>
        </Grid>
      </GridContainer>
      <Footer></Footer>
    </Grid>
  );
};

export default Success;
