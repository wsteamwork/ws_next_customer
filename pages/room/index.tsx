import React, { useReducer, Fragment, useMemo, useEffect, useContext } from 'react';
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
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getDataRoom } from '@/store/Redux/Reducers/Room/roomReducer';
import { useSelector } from 'react-redux';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import BoxRoomDetail from '@/components/Room/BoxRoomDetail/index';
import BoxImage from '@/components/Room/BoxImage';
import BoxSearch from '@/components/Room/BoxSearch';
import Footer from '@/components/Layout/FooterComponent';
import { GlobalContext } from '@/store/Context/GlobalContext';

const Room: NextPage = () => {
  const [state, dispatch] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const { router } = useContext(GlobalContext);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const error = useSelector<ReducersList, boolean>((state) => state.roomPage.error);

  useEffect(() => {
    !!error && router.push('/error');
  }, [error]);

  return (
    <Fragment>
      {!!room && (
        <NextHead
          title={room.details.data[0].name}
          description={room.details.data[0].description}
          url={`${IMAGE_STORAGE_LG}${room.media.data[0]}`}
          ogImage={`${IMAGE_STORAGE_LG}${room.media.data[0]}`}></NextHead>
      )}

      <NavHeader></NavHeader>
      {useMemo(
        () => (
          <RoomDetailsContext.Provider value={{ state, dispatch }}>
            <GridContainer xs={11} lg={10} xl={9} classNameItem="roomPage">
              <BoxSearch />
              <BoxImage />
              <Grid container spacing={1}>
                <Grid item xs={12} lg={9}>
                  <BoxRoomDetail></BoxRoomDetail>
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
        ),
        [state]
      )}
      <Footer></Footer>
    </Fragment>
  );
};

Room.getInitialProps = async ({ store, router }: NextContextPage) => {
  const data = await getDataRoom(store.dispatch, router);
  return {};
};

export default Room;
