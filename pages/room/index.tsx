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
import { Grid, Hidden } from '@material-ui/core';
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
import BoxRecommend from '@/components/Room/BoxRecommend';
import { useVisitedRoom } from '@/utils/shared/useVisitedRoom';
import { getCookieFromReq } from '@/utils/mixins';
// import SearchMobile from '@/components/Rooms/SearchMobile';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';

const Room: NextPage = () => {
  const [state, dispatch] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const { router } = useContext(GlobalContext);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const error = useSelector<ReducersList, boolean>((state) => state.roomPage.error);
  const [] = useVisitedRoom();

  useEffect(() => {
    if (error || !room.status) router.push('/not-found-resource');

  }, [error]);

  if (error || !room.status) {
    return (
      <div>
        <NavHeader />
        <ContentPlaceHolder />
        <Footer />
      </div>
    )
  }

  return (
    <Fragment>
      {!!room && (
        <NextHead
          ogSitename="Westay - Đặt phòng homestay trực tuyến"
          title={`${room.details.data[0].name} | Westay - Đặt phòng homestay trực tuyến`}
          description={`${room.room_type_txt} ${
            room.room_type == 3 ? 'nghỉ dưỡng' : 'tiện nghi'
            } ngay tại ${room.district.data.name}, ${
            room.city.data.name
            }. Đặt phòng ngay với Westay để có trải nghiệm độc đáo và tuyệt vời nhất.`}
          url={`https://westay.vn/room/${room.id}`}
          ogImage={`${IMAGE_STORAGE_LG}${room.media.data[0].image}`}
        />
      )}

      <NavHeader />
      {useMemo(
        () => (
          <RoomDetailsContext.Provider value={{ state, dispatch }}>
            {room ? (
              <GridContainer xs={11} lg={10} xl={9} classNameItem="roomPage">
                {/*<Hidden mdUp implementation="css">*/}
                {/*   <SearchMobile /> */}
                {/*</Hidden>*/}

                <Hidden mdDown implementation="css">
                  <BoxSearch />
                </Hidden>

                <BoxImage />
                <Grid container>
                  <Grid item xs={12} lg={8} xl={9}>
                    <BoxRoomDetail room={room} />
                  </Grid>

                  <Grid item sm={12} md={11} lg={4} xl={3} className="roomPage__boxBooking">
                    <BoxBooking />
                  </Grid>

                  <Grid item xs={12}>
                    <BoxRecommend />
                  </Grid>
                </Grid>
                <Grid container className="roomPage__boxBookingMoblie">
                  <NavBottomBook />
                </Grid>

              </GridContainer>
            ) : ''}
          </RoomDetailsContext.Provider>
        ),
        [state]
      )}
      <Footer />
    </Fragment>
  );
};

Room.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const data = await getDataRoom(store.dispatch, query, initLanguage);
  return {};
};

export default Room;
