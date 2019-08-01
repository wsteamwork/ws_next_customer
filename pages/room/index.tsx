import React, { useReducer, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import GridContainer from '@/components/Layout/Grid/Container';
import BoxBooking from '@/components/Room/BoxBooking';
import {
  RoomDetailsReducer,
  RoomDetailsStateInit,
  RoomDetailsContext,
  getDataRoom
} from '@/store/Context/Room/RoomDetailContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import NavHeader from '@/components/Toolbar/NavHeader';
import SearchComponent from '@/components/SearchComponent';

const Room: NextPage = () => {
  const [state, dispatch] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const { router } = useContext(GlobalContext);

  useEffect(() => {
    getDataRoom(dispatch, router);
  }, []);

  return (
    <RoomDetailsContext.Provider value={{ state, dispatch }}>
      <NavHeader></NavHeader>
      {/* <GridContainer xs={11} md={10}>
        <SearchComponent></SearchComponent>
      </GridContainer> */}

      <GridContainer lg={10}>
        <BoxBooking></BoxBooking>
      </GridContainer>
    </RoomDetailsContext.Provider>
  );
};

export default Room;
