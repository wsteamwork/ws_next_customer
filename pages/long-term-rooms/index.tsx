import React, { Fragment, FC, useReducer } from 'react';
import { NextPage } from 'next';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import { RoomIndexReducer, RoomIndexStateInit, RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { RoomFilterContext, RoomFilterReducer, RoomFilterStateInit } from '@/store/Context/Room/RoomFilterContext';

const LongtermRooms: NextPage = () => {
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { isMapOpen } = state;

  return (
    <Fragment>
      <NextHead
        ogSitename="Westay - Thuê phòng trực tuyến"
        title="Thuê phòng dài hạn, thuê trọ - Westay - Westay.vn - Westay.vn"
        description="Thuê phòng dài hạn, thuê trọ - Westay - Westay.vn - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/long-term-rooms"/>

      <NavHeader isSticky={isMapOpen}/>
      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>

        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

LongtermRooms.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  return {};
};

export default LongtermRooms;
