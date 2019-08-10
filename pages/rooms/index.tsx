import React, { useReducer, useContext, useEffect, Fragment } from 'react';
import { NextPage } from 'next';
import NavHeader from '@/components/Toolbar/NavHeader';
import NextHead from '@/components/NextHead';
import GridContainer from '@/components/Layout/Grid/Container';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '@/store/Context/GlobalContext';
import FilterActions from '@/components/Rooms/FilterActions';
import RoomListing from '@/components/Rooms/RoomListing';
import {
  RoomFilterContext,
  RoomFilterStateInit,
  RoomFilterReducer
} from '@/store/Context/Room/RoomFilterContext';
import {
  RoomIndexReducer,
  getRooms,
  RoomIndexContext,
  RoomIndexStateInit
} from '@/store/Context/Room/RoomListContext';
import SearchComponent from '@/components/Home/SearchComponent';
import MapAndListing from '@/components/Rooms/MapAndListing';

const Rooms: NextPage = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { state: stateGlobal, dispatch: dispatchGlobal, router } = useContext(GlobalContext);
  const { rooms, isMapOpen } = state;

  useEffect(() => {
  }, [stateGlobal]);

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

  return (
    <Fragment>
      <NextHead
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/rooms"></NextHead>

      <NavHeader></NavHeader>
      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider
          value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
          <div className="roomListing">
            <div>
              {!isMapOpen && (
                <GridContainer
                  xs={11}
                  md={10}
                  classNameItem="searchRooms__overlay"
                  className="searchRooms">
                  <SearchComponent />
                </GridContainer>
              )}
              <FilterActions></FilterActions>
              {/* <RoomListing /> */}
            </div>
            <MapAndListing></MapAndListing>
          </div>
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

export default Rooms;
