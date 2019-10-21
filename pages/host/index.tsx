import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getDataRoom } from '@/store/Redux/Reducers/Room/roomReducer';
import { getCookieFromReq } from '@/utils/mixins';
import { NextPage } from 'next';
import React, { Fragment, useState, useEffect } from 'react';
import ButtonGlobal from '@/components/ButtonGlobal';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  List,
  ListItemText,
  ListItem,
  Divider,
  Typography,
  Slide,
  Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import RenderDay from '@/components/Room/BoxBooking/DateRangeSingle/RenderDay';
import moment, { Moment } from 'moment';
import BookingCalendar from '@/components/Book/BookingCalendar';

const Host: NextPage = () => {
  const [openBookingDialog, setOpenBookingDialog] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Moment>(null);
  const [endDate, setEndDate] = useState<Moment>(null);
  useEffect(() => {
    console.log(startDate, endDate);
  }, [startDate, endDate]);

  const handleOpenBookingDialog = () => {
    setOpenBookingDialog(true);
  };

  const handleCloseBookingDialog = () => {
    setOpenBookingDialog(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  // const _renderDayContents = (day: Moment) => <RenderDay day={day} priceByDay={priceByDay} />;
  return (
    <Fragment>
      {/*<NextHead*/}
      {/*  ogSitename={`Westay - Đặt phòng homestay trực tuyến`}*/}
      {/*  title={`Westay - Đặt phòng homestay trực tuyến`}*/}
      {/*  description={`Westay - Đặt phòng homestay trực tuyến`}*/}
      {/*  url={`/host`}*/}
      {/*  ogImage={profile.avatar_url}/>*/}
      <NavHeader_Merchant />
      <ButtonGlobal
        variant="contained"
        name="confirm-information"
        size="large"
        color="primary"
        onClick={handleOpenBookingDialog}>
        Book Now
      </ButtonGlobal>

      <Dialog
        fullScreen
        open={openBookingDialog}
        onClose={handleCloseBookingDialog}
        // TransitionComponent={Transition}
      >
        <Grid
          style={{
            zIndex: 102,
            position: 'absolute',
            top: 0,
            width: 100,
            padding: '0 40px'
          }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseBookingDialog}
            aria-label="close">
            <CloseIcon />
          </IconButton>
        </Grid>

        <BookingCalendar />
      </Dialog>
    </Fragment>
  );
};

Host.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const data = await getDataRoom(store.dispatch, query, initLanguage);
  return {};
};

export default Host;
