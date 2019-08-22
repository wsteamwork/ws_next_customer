import React, { Fragment, useReducer, useContext } from 'react';
import { NextPage } from 'next';
import NavHeader from '@/components/Toolbar/NavHeader';
import { RoomDetailsContext, RoomDetailsReducer, RoomDetailsStateInit } from '@/store/Context/Room/RoomDetailContext';
import GridContainer from '@/components/Layout/Grid/Container';
import { Hidden, Grid } from '@material-ui/core';
import BoxSearch from '@/components/Room/BoxSearch';
import BoxImage from '@/components/Room/BoxImage';
import BoxRoomDetail from '@/components/Room/BoxRoomDetail';
import BoxBooking from '@/components/Room/BoxBooking';
import BoxRecommend from '@/components/Room/BoxRecommend';
import NavBottomBook from '@/components/Room/NavBottomBook';
import Footer from '@/components/Layout/FooterComponent';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getDataRoom } from '@/store/Redux/Reducers/Room/roomReducer';
import { GlobalContext } from '@/store/Context/GlobalContext';

const PreviewRoom: NextPage = () => {
  const [state, dispatch] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const {router} = useContext(GlobalContext);
  const isPreviewPage = router.pathname.includes('preview-room');

  return (
    <Fragment>
      <NavHeader/>

      <RoomDetailsContext.Provider value={{ state, dispatch }}>
        <GridContainer xs={11} lg={10} xl={9} classNameItem="roomPage">

          <Hidden mdDown implementation="css">
            <div className="roomPage__disabledBoxSearch">
              <BoxSearch isPreview={isPreviewPage}/>
            </div>
          </Hidden>

          <BoxImage isPreview={isPreviewPage} />

          <Grid container>
            <Grid item xs={12} lg={8} xl={9}>
              <BoxRoomDetail/>
            </Grid>

            <Grid item sm={12} md={11} lg={4} xl={3} className="roomPage__disabledBoxBooking roomPage__boxBooking">
              <BoxBooking/>
            </Grid>

            <Grid item xs={12}>
              <BoxRecommend />
            </Grid>
          </Grid>
          <Grid container className="roomPage__disabledBoxBookingMoblie roomPage__boxBookingMoblie">
            <NavBottomBook />
          </Grid>
        </GridContainer>
      </RoomDetailsContext.Provider>

      <Footer/>
    </Fragment>
  );
};
//
PreviewRoom.getInitialProps = async ({ store, router }: NextContextPage) => {
  try {
    const data = await getDataRoom(store.dispatch, router);
  } catch (error) {

  }
  return {};
};

export default PreviewRoom;
