import React, { useReducer, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { Grid, Hidden, Paper, Button } from '@material-ui/core';
import NavHeader from '@/components/Toolbar/NavHeader';
import NextHead from '@/components/NextHead';
import GridContainer from '@/components/Layout/Grid/Container';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import DateRangeSearch from '@/components/Home/DateRangeSearch';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import {
  RoomIndexContext,
  RoomIndexReducer,
  RoomIndexStateInit,
  getRooms
} from '@/store/Context/Room/RoomListContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import FilterActions from '@/components/Rooms/FilterActions';
import ListRoom from '@/components/ListRoom';
import RoomCardListing from '@/components/Rooms/RoomCardListing';
import VisitedRooms from '@/components/Rooms/VisitedRooms';

const Rooms: NextPage = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const { dispatch: dispatchGlobal, router } = useContext(GlobalContext);
  const { rooms } = state;

  useEffect(() => {
    getRooms(router)
      .then((data) => {
        console.log(data);
        const roomData = data.data;
        const pagination = data.meta;
        dispatch({
          type: 'setRooms',
          rooms: roomData,
          meta: pagination
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleOverlay = () => {
    dispatchGlobal({ type: 'setOverlay', payload: true });
  };
  const renderRoom = (room) => <RoomCardListing room={room} />;

  return (
    <RoomIndexContext.Provider value={{ state, dispatch }}>
      <NextHead
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/rooms"></NextHead>
      <NavHeader></NavHeader>

      <GridContainer
        onClick={handleOverlay}
        xs={11}
        md={10}
        classNameItem="searchRooms__overley"
        className="searchRooms">
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <SearchAutoSuggestion />
          </Grid>
          <Grid item xs={12} md={5}>
            <DateRangeSearch />
          </Grid>
          <Grid item xs={12} md={2}>
            <ButtonGlobal padding="0px" width="100%">
              {t('home:searchComponent:search')}
            </ButtonGlobal>
          </Grid>
        </Grid>
      </GridContainer>
      <FilterActions></FilterActions>
      <GridContainer xs={11} md={10} xl={9}>
        <Grid
          container
          justify="center"
          alignContent="center"
          spacing={4}
          style={{ marginTop: '48px' }}>
          <Hidden smDown>
            <Grid item sm={4}>
              <Paper
                elevation={0}
                style={{ backgroundImage: `url('./static/images/map-vector.svg')` }}
                // onClick={onMapClick}`
                classes={{
                  root: 'mapPaper'
                }}>
                <ButtonGlobal className="watchMapButton">Xem Bản Đồ</ButtonGlobal>
                {/* <img src="./static/images/map-vector.jpg" alt="map-vector" /> */}
                {/* <Button variant="text" fullWidth style={{ fontWeight: 700 }}>
                  Xem bản đồ
                </Button> */}
              </Paper>

              <VisitedRooms visitedRoom={rooms} />
            </Grid>
          </Hidden>

          <Grid item lg={8} md={8} sm={12} xs={12} style={{ marginTop: '-64px' }}>
            {rooms && (
              <ListRoom
                customClass="listRoomContainerWithoutSlickCustom"
                roomData={rooms}
                usingSlider={false}
                title={''}
                spacing={1}
                render={renderRoom}
              />
            )}
          </Grid>
        </Grid>
      </GridContainer>
    </RoomIndexContext.Provider>
  );
};

export default Rooms;
