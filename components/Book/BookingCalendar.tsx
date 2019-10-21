import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';

import React, { Dispatch, FC, Fragment, useEffect, useState } from 'react';
import ButtonGlobal from '@/components/ButtonGlobal';

import 'react-dates/initialize';

import CloseIcon from '@material-ui/icons/Close';
import RenderDay from '@/components/Room/BoxBooking/DateRangeSingle/RenderDay';
import moment, { Moment } from 'moment';
import { Grid, Typography } from '@material-ui/core';
import { useDateRange } from '../Room/BoxBooking/DateRangeSingle/context';
import { useSelector } from 'react-redux';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import DateRangeVertical from './DateRangeVertical';

const BookingCalendar: FC = () => {
  
  return (
    <Grid className="booking-calendar">
      <Grid className="booking-calendar__box-title">
        {/* absolute */}
        <Grid className="box-title__wrapper">
          <Typography className="box-title__title">Check In</Typography>
        </Grid>
      </Grid>
      <Grid className="booking-calendar__box-main">
        <Grid container className="box-main__wrapper">
          <Grid item sm={7} className="calendar-picker">
            <DateRangeVertical />
          </Grid>
          <Grid>
            <Grid item sm={5} className="box-price">
              <ButtonGlobal>Book</ButtonGlobal>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookingCalendar;
