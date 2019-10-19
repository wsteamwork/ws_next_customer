import React, { Fragment, FC, useContext, useEffect, useMemo, useReducer } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Hidden, Grid } from '@material-ui/core';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { getDataRoom } from '@/store/Redux/Reducers/Room/roomReducer';
import { NextPage } from 'next';
import { RoomDetailsReducer, RoomDetailsStateInit, RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useSelector } from 'react-redux';
import { useVisitedRoom } from '@/utils/shared/useVisitedRoom';
import NavHeader from '@/components/Toolbar/NavHeader';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import Footer from '@/components/Layout/FooterComponent';
import NextHead from '@/components/NextHead';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import GridContainer from '@/components/Layout/Grid/Container';
import { getDataLTRoom } from '@/store/Redux/Reducers/LTR/LTRoom/ltroomReducer';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import BoxLTRoomDetail from '@/components/LTR/LTRoom/BoxLTRoomDetail';
import BoxImageLT from '@/components/LTR/LTRoom/BoxImageLT';
import BoxBookingLT from '@/components/LTR/LTRoom/BoxBookingLT';
import BoxBottomBooking from '@/components/LTR/LTRoom/BoxBottomBooking';

const LongtermRoom: NextPage = () => {
  const { router } = useContext(GlobalContext);
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const error = useSelector<ReducersList, boolean>((state) => state.ltroomPage.error);
  const [] = useVisitedRoom();

  // useEffect(() => {
  //   if (error || !ltroom.status) router.push('/not-found-resource');
  //
  // }, [error]);
  //
  // if (error || !ltroom.status) {
  //   return (
  //     <div>
  //       <NavHeader />
  //       <ContentPlaceHolder />
  //       <Footer />
  //     </div>
  //   )
  // }

  return (
    <Fragment>
      {/*{!!ltroom && (*/}
      {/*  <NextHead*/}
      {/*    ogSitename="Westay - Đặt phòng homestay trực tuyến"*/}
      {/*    title={`${ltroom.details.data[0].name} | Westay - Đặt phòng homestay trực tuyến`}*/}
      {/*    description={`${ltroom.accommodation_type_txt} ${*/}
      {/*      ltroom.accommodation_type == 3 ? 'nghỉ dưỡng' : 'tiện nghi'*/}
      {/*      } ngay tại ${ltroom.district.data.name}, ${*/}
      {/*      ltroom.city.data.name*/}
      {/*      }. Đặt phòng ngay với Westay để có trải nghiệm độc đáo và tuyệt vời nhất.`}*/}
      {/*    url={`https://westay.vn/ltroom/${ltroom.id}`}*/}
      {/*    ogImage={`${IMAGE_STORAGE_LG}${ltroom.avatar.images[0].name}`}*/}
      {/*  />*/}
      {/*)}*/}

      <NavHeader />
      {useMemo(
        () => (
          <Fragment>
            {ltroom ? (
              <GridContainer xs={11} lg={10} xl={9} classNameItem="roomPage">
                <BoxImageLT roomName={ltroom.about_room.name} livingrooms={ltroom.livingrooms} bathrooms={ltroom.bathrooms} bedrooms={ltroom.bedrooms} cover_photo={ltroom.cover_photo}/>
                <Grid container>
                  <Grid item xs={12} lg={8} xl={9}>
                    <BoxLTRoomDetail room={ltroom}/>
                  </Grid>

                  <Grid item sm={12} md={11} lg={4} xl={3} className="roomPage__boxBooking">
                    <BoxBookingLT priceBasic={ltroom.prices.prices[0].price}
                                  term={ltroom.prices.prices[0].term}
                                  id={ltroom.merchant.data.id}
                                  avatar={ltroom.merchant.data.avatar}
                                  avatar_url={ltroom.merchant.data.avatar_url}
                                  name={ltroom.merchant.data.name}
                                  number_room={ltroom.merchant.data.number_room}/>
                  </Grid>

                  {/*<Grid item xs={12}>*/}
                  {/*  <BoxRecommend />*/}
                  {/*</Grid>*/}
                </Grid>
                <Grid container className="roomPage__boxBookingMoblie">
                  <BoxBottomBooking priceBasic={ltroom.prices.prices[0].price} term={ltroom.prices.prices[0].term}/>
                </Grid>

              </GridContainer>
            ) : ''}
          </Fragment>
        ),
        [ltroom]
      )}
      <Footer />
    </Fragment>
  );
};

LongtermRoom.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const data = await getDataLTRoom(store.dispatch, query, initLanguage);
  return {};
};

export default LongtermRoom;
