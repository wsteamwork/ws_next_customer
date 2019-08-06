import React, { useReducer, useContext, useEffect, Fragment } from 'react';
import { NextPage } from 'next';
import { Grid, Hidden, Paper, Button } from '@material-ui/core';
import NavHeader from '@/components/Toolbar/NavHeader';
import NextHead from '@/components/NextHead';
import GridContainer from '@/components/Layout/Grid/Container';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import DateRangeSearch from '@/components/Home/DateRangeSearch';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '@/store/Context/GlobalContext';
import FilterActions from '@/components/Rooms/FilterActions';
import ListRoom from '@/components/ListRoom';
import RoomCardListing from '@/components/Rooms/RoomCardListing';
import VisitedRooms from '@/components/Rooms/VisitedRooms';
import SearchComponent from '@/components/SearchComponent';
import RoomListing from '@/components/Rooms/RoomListing';
import { RoomFilterContext, RoomFilterStateInit, RoomFilterReducer } from '@/store/Context/Room/RoomFilterContext';
import { RoomIndexReducer, getRooms, RoomIndexContext, RoomIndexStateInit } from '@/store/Context/Room/RoomListContext';

const Rooms: NextPage = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
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

  return (
    <Fragment>
      <NextHead
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/rooms"></NextHead>
      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider
          value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
          <NavHeader></NavHeader>

          <GridContainer
            onClick={handleOverlay}
            xs={11}
            md={10}
            classNameItem="searchRooms__overlay"
            className="searchRooms">
            <SearchComponent></SearchComponent>
          </GridContainer>
          <FilterActions></FilterActions>
          <RoomListing />
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

export default Rooms;
