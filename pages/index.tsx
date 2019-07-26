import React from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import SearchAutoSuggestion from '@/components/SearchAutoSuggestion';
import { Grid } from '@material-ui/core';
import DateRangeSearch from '@/components/DateRangeSearch';
import ChooseGuestRoom from '@/components/ChooseGuestRoom';
import ButtonGlobal from '@/components/ButtonGlobal';
import Footer from '@/components/Layout/Footer';
import HostBecome from '@/components/Shared/HostBecome';

const Home: NextPage = () => {
  return (
    <div>
      <NextHead
        title="Nextjs Demo"
        description="Welcome to Nextjs"
        url="https://nextjs.org/"></NextHead>

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
        <HostBecome></HostBecome>

        <Footer></Footer>
      </Grid>
    </div>
  );
};

export default Home;
