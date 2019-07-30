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

const Room: NextPage = () => {
  const [state, dispatch] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const { router } = useContext(GlobalContext);

  useEffect(() => {
    getDataRoom(dispatch, router);
  }, []);

  return (
    <RoomDetailsContext.Provider value={{ state, dispatch }}>
      <GridContainer lg={10}>
        <BoxBooking></BoxBooking>
      </GridContainer>
    </RoomDetailsContext.Provider>
  );
};

export default Room;
