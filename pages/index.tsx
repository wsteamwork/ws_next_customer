import React, { useEffect, useReducer, memo, useContext } from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import { Grid } from '@material-ui/core';
import FooterComponent from '@/components/Layout/FooterComponent';
import HostBecome from '@/components/Shared/HostBecome';
import GridContainer from '@/components/Layout/Grid/Container';
import NavHeader from '@/components/Toolbar/NavHeader';
import {
  RoomHomepageContext,
  getRoomHot,
  RoomHomepageStateInit,
  RoomHomepageReducer,
  getRoomsHomepage
} from '@/store/Context/Room/RoomHomepageContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useTranslation } from 'react-i18next';
import ListRoom from '@/components/ListRoom';
import MetroGridImage from '@/components/Layout/MetroGridImage';
import BlogContainer from '@/components/Layout/BlogContainer';
import SliderTypeApartment from '@/components/Slider/HomePage/SliderTypeApartment';
import SearchComponent from '@/components/SearchComponent';
import CheckboxList from '@/components/Home/CheckboxList';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomHomepageReducer, RoomHomepageStateInit);

  const { dispatch: dispatchGlobal } = useContext(GlobalContext);
  const { roomsHot } = state;


  useEffect(() => {
    getRoomsHomepage(dispatch);
  }, []);

  const handleOverlay = () => {
    dispatchGlobal({ type: 'setOverlay', payload: true });
  };

  return (
    <RoomHomepageContext.Provider value={{ state, dispatch }}>
      {/* <Fragment> */}
      <NextHead title="Nextjs Demo" description="Welcome to Nextjs" url="https://nextjs.org/" />
      <NavHeader />

      <GridContainer xs={12} classNameItem="searchHome">
        <img
          src={`${IMAGE_STORAGE_LG}background.jpg`}
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

      <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
        <BlogContainer />
      </GridContainer>

      <FooterComponent />
      {/* </Fragment> */}
    </RoomHomepageContext.Provider>
  );
};

export default memo(Home);
