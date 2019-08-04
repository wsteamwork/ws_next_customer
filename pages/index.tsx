import React, { useEffect, useReducer, useContext, useMemo, Fragment } from 'react';
import { NextPage, NextPageContext } from 'next';
import NextHead from '@/components/NextHead';
import { Grid } from '@material-ui/core';
import FooterComponent from '@/components/Layout/FooterComponent';
import HostBecome from '@/components/Shared/HostBecome';
import GridContainer from '@/components/Layout/Grid/Container';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useTranslation } from 'react-i18next';
import ListRoom from '@/components/ListRoom';
import MetroGridImage from '@/components/Layout/MetroGridImage';
import BlogContainer from '@/components/Layout/BlogContainer';
import SliderTypeApartment from '@/components/Slider/HomePage/SliderTypeApartment';
import SearchComponent from '@/components/SearchComponent';
import CheckboxList from '@/components/Home/CheckboxList';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { useSelector } from 'react-redux';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { getRoomsHomepage } from '@/store/Redux/Reducers/Home/roomHomepage';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const { dispatch: dispatchGlobal } = useContext(GlobalContext);
  const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.roomHomepage.roomsHot
  );

  const handleOverlay = () => {
    dispatchGlobal({ type: 'setOverlay', payload: true });
  };

  return (
    <Fragment>
      <NextHead
        title="Nextjs Demo"
        description="Welcome to Nextjs"
        ogImage="/static/favicon.ico"
        url="https://nextjs.org/"
      />
      <NavHeader />

      <GridContainer xs={12} classNameItem="searchHome">
        <img
          src="./static/images/background.svg"
          alt="Westay - HomeStay cho người Việt"
          className="searchHome__image"
        />
        <Grid onClick={handleOverlay}>
          <GridContainer xs={11} md={9} classNameItem="searchHome__searchCenter">
            <Grid className="searchHome__title">
              <h3>{t('home:searchComponent:enjoy')}</h3>
            </Grid>

            <SearchComponent className="searchHome__content"></SearchComponent>

            <Grid className="searchHome__checkbox">
              <CheckboxList />
            </Grid>
          </GridContainer>
          <GridContainer xs={12} md={10} classNameItem="searchHome__opa"></GridContainer>
        </Grid>
      </GridContainer>

      <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
        <SliderTypeApartment />
        <MetroGridImage />

        <ListRoom roomData={roomsHot} />
      </GridContainer>
      <HostBecome />

      <GridContainer xs={11} sm={10}>
        <BlogContainer />
      </GridContainer>

      <FooterComponent />
    </Fragment>
  );
};

Home.getInitialProps = async (ctx: NextContextPage) => {
  try {
    const res = await getRoomsHomepage();
    ctx.store.dispatch({ type: 'setRoomCity', rooms: res.roomsCity });
    ctx.store.dispatch({ type: 'setApartment', rooms: res.apartments });
    ctx.store.dispatch({ type: 'setRoomHot', rooms: res.roomsHot });
  } catch (error) {
    console.log(error.respose);
  }

  return {};
};

export default Home;
