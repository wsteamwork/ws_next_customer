import React, { useReducer, useContext, useEffect, Fragment } from 'react';
import { NextPage } from 'next';
import NavHeader from '@/components/Toolbar/NavHeader';
import NextHead from '@/components/NextHead';
import GridContainer from '@/components/Layout/Grid/Container';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '@/store/Context/GlobalContext';
import FilterActions from '@/components/Rooms/FilterActions';
import RoomListing from '@/components/Rooms/RoomListing';
import { RoomFilterContext, RoomFilterStateInit, RoomFilterReducer } from '@/store/Context/Room/RoomFilterContext';
import { RoomIndexReducer, getRooms, RoomIndexContext, RoomIndexStateInit } from '@/store/Context/Room/RoomListContext';
import SearchComponent from '@/components/Home/SearchComponent';

const Rooms: NextPage = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { dispatch: dispatchGlobal, router } = useContext(GlobalContext);
  const { rooms } = state;

  useEffect(() => {
    getRooms(router)
      .then((data) => {
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
            <SearchComponent />
          </GridContainer>
          <FilterActions></FilterActions>
          <RoomListing />
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

export default Rooms;
