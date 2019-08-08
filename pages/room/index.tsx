import React, { useReducer } from 'react';
import { NextPage } from 'next';
import GridContainer from '@/components/Layout/Grid/Container';
import BoxBooking from '@/components/Room/BoxBooking';
import {
  RoomDetailsReducer,
  RoomDetailsStateInit,
  RoomDetailsContext
} from '@/store/Context/Room/RoomDetailContext';
import NavHeader from '@/components/Toolbar/NavHeader';
import { Grid } from '@material-ui/core';
import NavBottomBook from '@/components/Room/NavBottomBook';
import NextHead from '@/components/NextHead';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import EmptyRoomCalenda from '@/components/Room/EmptyRoomCalenda';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getDataRoom } from '@/store/Redux/Reducers/Room/roomReducer';
import { useSelector } from 'react-redux';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';

const Room: NextPage = () => {
  const [state, dispatch] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  return (
    <RoomDetailsContext.Provider value={{ state, dispatch }}>
      {!!room && (
        <NextHead
          title={room.details.data[0].name}
          description={room.details.data[0].description}
          url={`${IMAGE_STORAGE_LG}${room.media.data[0]}`}
          ogImage={`${IMAGE_STORAGE_LG}${room.media.data[0]}`}></NextHead>
      )}

      <NavHeader></NavHeader>
      {/* <GridContainer xs={11} md={10}>
        <SearchComponent></SearchComponent>
      </GridContainer> */}

      <GridContainer lg={10} classNameItem="roomPage">
        <Grid container spacing={1}>
          <Grid item xs={12} lg={9}>
            <EmptyRoomCalenda></EmptyRoomCalenda>
          </Grid>

          <Grid item sm={12} md={11} lg={3} className="roomPage__boxBooking">
            <BoxBooking></BoxBooking>
          </Grid>
        </Grid>
        <Grid container className="roomPage__boxBookingMoblie">
          <NavBottomBook />
        </Grid>
      </GridContainer>
    </RoomDetailsContext.Provider>
  );
};

Room.getInitialProps = async ({ store, router }: NextContextPage) => {
  try {
    const data = await getDataRoom(store.dispatch, router);
  } catch (error) {
    router.push('/error');
  }

  return {};
};

export default Room;
