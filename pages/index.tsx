import React, { useEffect, useReducer, memo, useContext } from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import { Grid } from '@material-ui/core';
import ChooseGuestRoom from '@/components/Home/ChooseGuestRoom';
import ButtonGlobal from '@/components/ButtonGlobal';
import FooterComponent from '@/components/Layout/FooterComponent';
import HostBecome from '@/components/Shared/HostBecome';
import GridContainer from '@/components/Layout/Grid/Container';
import NavHeader from '@/components/Toolbar/NavHeader';
import RoomCard from '@/components/RoomCard';
import {
  RoomHomepageContext,
  getRoomHot, RoomHomepageStateInit, RoomHomepageReducer, getRoomsHomepage
} from '@/store/Context/Room/RoomHomepageContext';
import DateRangeSearch from '@/components/Home/DateRangeSearch';
import CheckboxList from '@/components/Home/CheckboxList';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useTranslation } from 'react-i18next';
import ListRoom from '@/components/ListRoom';
import MetroGridImage from '@/components/Layout/MetroGridImage';
import BlogContainer from '@/components/Layout/BlogContainer';
import SliderTypeApartment from '@/components/Slider/HomePage/SliderTypeApartment';
import InputGlobal from '@/components/InputGlobal';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomHomepageReducer, RoomHomepageStateInit);

  const { dispatch: dispatchGlobal } = useContext(GlobalContext);
  const { roomsHot,roomsCity,apartments } = state;


  useEffect(() => {
    getRoomsHomepage(dispatch)
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
          src="./static/images/background.svg"
          alt="Background home"
          className="searchHome__image"
        />
        <Grid onClick={handleOverlay}>
          <GridContainer xs={11} md={9} classNameItem="searchHome__searchCenter">
            <Grid className="searchHome__title">
              <h3>{t('home:searchComponent:enjoy')}</h3>
            </Grid>

            <Grid container spacing={1} className="searchHome__content">
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
                <ButtonGlobal width="100%">{t('home:searchComponent:search')}</ButtonGlobal>
              </Grid>
            </Grid>

            <Grid className="searchHome__checkbox">
              <CheckboxList></CheckboxList>
            </Grid>
          </GridContainer>
          <GridContainer xs={12} md={10} classNameItem="searchHome__opa"></GridContainer>
        </Grid>
      </GridContainer>

      <GridContainer xs={12} sm={10}>
        <SliderTypeApartment/>
        <MetroGridImage />
        
        <ListRoom roomData={roomsHot} />
      </GridContainer>
      <InputGlobal label="Tên"></InputGlobal>

      <HostBecome/>

      <FooterComponent/>
      {/* </Fragment> */}
    </RoomHomepageContext.Provider >
  );
};

export default memo(Home);
