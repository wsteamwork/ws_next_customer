import React, { Fragment } from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import SearchAutoSuggestion from '@/components/SearchAutoSuggestion';
import { Grid } from '@material-ui/core';
import DateRangeSearch from '@/components/DateRangeSearch';
import ChooseGuestRoom from '@/components/ChooseGuestRoom';
import ButtonGlobal from '@/components/ButtonGlobal';
import Footer from '@/components/Layout/Footer';
import HostBecome from '@/components/Shared/HostBecome';
import GridContainer from '@/components/Layout/Grid/Container';
import CustomPopper from '@/components/CustomPopper';
import NavHeader from '@/components/Toolbar/NavHeader';

const Home: NextPage = () => {
  return (
    <Fragment>
      <NextHead
        title='Nextjs Demo'
        description='Welcome to Nextjs'
        url='https://nextjs.org/'
      />

      <NavHeader />
      <Grid container spacing={2} style={{ height: '65px' }}>
        <Grid item xs={12} md={4}>
          <SearchAutoSuggestion />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateRangeSearch />
        </Grid>
        <Grid item xs={12} md={2}>
          <ChooseGuestRoom />
        </Grid>
        <Grid item xs={12} md={2}>
          <ButtonGlobal width="100%">Tìm kiếm</ButtonGlobal>
        </Grid>
      </Grid>

      <Grid style={{ marginTop: '100px' }}>
        <GridContainer xs={12} sm={12} md={10}>
          <CustomPopper
            placement="bottom"
            trigger="click"
            animation="scale"
            appendTo="parent"
            theme="light-border"
            aria={null}
            arrow={true}
            inertia={true}
            interactive={true}
            content={
              <div style={{ background: 'white' }}>
                <strong>Hello</strong>
              </div>
            }>
            <span>Tippy</span>
          </CustomPopper>

          <HostBecome></HostBecome>
        </GridContainer>
        <Footer></Footer>
      </Grid>

    </Fragment>
  );
};

export default Home;
