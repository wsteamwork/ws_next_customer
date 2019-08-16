import React, { useReducer, Fragment } from 'react';
import { NextPage } from 'next';
import NavHeader from '@/components/Toolbar/NavHeader';
import NextHead from '@/components/NextHead';
import GridContainer from '@/components/Layout/Grid/Container';
import FilterActions from '@/components/Rooms/FilterActions';
import {
  RoomFilterContext,
  RoomFilterStateInit,
  RoomFilterReducer
} from '@/store/Context/Room/RoomFilterContext';
import {
  RoomIndexReducer,
  RoomIndexContext,
  RoomIndexStateInit
} from '@/store/Context/Room/RoomListContext';
import SearchComponent from '@/components/Home/SearchComponent';
import MapAndListing from '@/components/Rooms/MapAndListing';
import { Hidden } from '@material-ui/core';
import BottomNav from '@/components/Rooms/BottomNav/index';
const Rooms: NextPage = () => {
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { isMapOpen } = state;

  return (
    <Fragment>
      <NextHead
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        ogImage="/static/images/Bg_home.4023648f.jpg"
        url="https://westay.vn/rooms"></NextHead>

      <NavHeader></NavHeader>
      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider
          value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
          <div className="roomListing">
            {!isMapOpen && (
              <GridContainer
                xs={11}
                md={10}
                classNameItem="searchRooms__overlay"
                className="searchRooms">
                <SearchComponent />
              </GridContainer>
            )}
            <Hidden smDown>
              <FilterActions></FilterActions>
            </Hidden>

            {/* <RoomListing /> */}

            <MapAndListing></MapAndListing>
            <Hidden mdUp>
              <BottomNav/>
            </Hidden>
          </div>
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

export default Rooms;
