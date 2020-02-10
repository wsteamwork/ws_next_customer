import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import BookingCalendar from '@/components/LTR/LTBook/BookingCalendar';
import BoxBookingLT from '@/components/LTR/LTRoom/BoxBookingLT';
import BoxBottomBooking from '@/components/LTR/LTRoom/BoxBottomBooking';
import BoxImageLT from '@/components/LTR/LTRoom/BoxImageLT';
import BoxLTRoomDetail from '@/components/LTR/LTRoom/BoxLTRoomDetail';
import BoxRoomAgoda from '@/components/LTR/LTRoom/BoxRoomAgoda';
import NextHead from '@/components/NextHead';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getDataLTRoom } from '@/store/Redux/Reducers/LTR/LTRoom/ltroomReducer';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { getCookieFromReq } from '@/utils/mixins';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Dialog, Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

const LongtermRoom: NextPage = () => {
  const { router } = useContext(GlobalContext);
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const error = useSelector<ReducersList, boolean>((state) => state.ltroomPage.error);
  const dispatchLeaseType = useDispatch<Dispatch<SearchFilterAction>>();
  if (router.pathname.includes('/long-term-room')) {
    dispatchLeaseType({
      type: 'setLeaseTypeGlobal',
      leaseTypeGlobal: 1,
      leaseTypePathName: router.pathname.includes('/long-term-room') ? '/long-term-rooms' : '/rooms'
    });
  }

  const [openBookingDialog, setOpenBookingDialog] = useState<boolean>(false);
  const handleOpenBookingDialog = () => {
    setOpenBookingDialog(true);
  };

  const handleCloseBookingDialog = () => {
    setOpenBookingDialog(false);
  };

  useEffect(() => {
    if (error || !ltroom.status) router.push('/not-found-resource');

  }, [error]);

  if (error || !ltroom.status) {
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
      {!!ltroom && (
        <NextHead
          googleMapApiRequire={false}
          ogSitename="Westay - Đặt phòng dài hạn trực tuyến"
          title={`${ltroom.about_room.name} | Westay - Đặt phòng dài hạn trực tuyến`}
          description={`${ltroom.accommodation_type_txt} ${
            ltroom.accommodation_type == 3 ? 'nghỉ dưỡng' : 'tiện nghi'
            } ngay tại ${ltroom.district.data.name}, ${
            ltroom.city.data.name
            }. Đặt phòng ngay với Westay để có trải nghiệm độc đáo và tuyệt vời nhất.`}
          url={`https://westay.vn/long-term-room/${ltroom.id}`}
          ogImage={`${IMAGE_STORAGE_LG}${ltroom.avatar.images[0].name}`}
        />
      )}

      <NavHeader isDetailPage={true} />

      {useMemo(
        () => (
          <Fragment>
            {ltroom ? (

              <GridContainer xs={11} lg={9} xl={8} classNameItem="roomPage">
                <BoxImageLT
                  livingrooms={ltroom.livingrooms}
                  kitchens={ltroom.kitchens}
                  bathrooms={ltroom.bathrooms}
                  furnitures={ltroom.furnitures}
                  outdoors={ltroom.outdoors}
                  roomName={ltroom.about_room.name}
                  bedrooms={ltroom.bedrooms}
                  cover_photo={ltroom.cover_photo}
                />
                <Grid container>
                  <Grid item xs={12} lg={8} xl={8}>
                    <BoxLTRoomDetail room={ltroom} />
                  </Grid>
                  <Grid item sm={12} md={11} lg={4} xl={4} className="roomPage__boxBooking">
                    {/* <LazyLoad> */}
                    <BoxBookingLT
                      priceBasic={ltroom.price_display}
                      id={ltroom.merchant.data.id}
                      avatar={ltroom.merchant.data.avatar}
                      avatar_url={ltroom.merchant.data.avatar_url}
                      name={ltroom.merchant.data.name}
                      number_room={ltroom.merchant.data.number_room}
                      included_services={ltroom.included_services}
                      not_included_services={ltroom.not_included_services}
                      handleOpenBookingDialog={handleOpenBookingDialog}
                      roomId={ltroom.id}
                    />
                    {/* </LazyLoad> */}
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={1} justify="center">
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div style={{ marginTop: 8 }}>
                          <BoxRoomAgoda />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container className="roomPage__boxBookingMoblie">
                  <BoxBottomBooking
                    priceBasic={ltroom.price_display}
                    handleOpenBookingDialog={handleOpenBookingDialog}
                  />
                </Grid>
              </GridContainer>

            ) : ''}
          </Fragment>
        ),
        [ltroom]
      )}
      <Dialog
        fullScreen
        open={openBookingDialog}
        onClose={handleCloseBookingDialog}
      >
        <BookingCalendar handleCloseBookingDialog={handleCloseBookingDialog} />
      </Dialog>
      {/* <LazyLoad offset={100}> */}
      <Footer />
      {/* </LazyLoad> */}
    </Fragment>
  );
};

LongtermRoom.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const data = await getDataLTRoom(store.dispatch, query, initLanguage);
  return {};
};

export default LongtermRoom;
