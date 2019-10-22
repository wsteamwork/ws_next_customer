import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';

import React, { Dispatch, FC, Fragment, useEffect, useState, useContext } from 'react';
import ButtonGlobal from '@/components/ButtonGlobal';

import 'react-dates/initialize';

import CloseIcon from '@material-ui/icons/Close';
import RenderDay from '@/components/Room/BoxBooking/DateRangeSingle/RenderDay';
import moment, { Moment } from 'moment';
import { Grid, Typography, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import DateRangeVertical from './DateRangeVertical';
import { BookingContext } from '@/store/Context/Booking/BookingContext';
import Router from 'next/router';
import {
  LTBookingReducerState,
  LTBookingAction
} from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';
import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { formatMoney } from '@/utils/mixins';
import { DateRange } from '@/store/Redux/Reducers/Search/searchFilter';

const BookingCalendar: FC = () => {
  const { movein, moveout, numberOfGuests, LTBookingPriceCalculate } = useSelector<
    ReducersList,
    LTBookingReducerState
  >((state) => state.ltBooking);

  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const [date, setDate] = useState<DateRange>({
    startDate: moment(),
    endDate: null
  });
  const [guest, setGuest] = useState<number>(numberOfGuests);
  const [disableBooking, setDisableBooking] = useState<boolean>(true);

  useEffect(() => {
    dispatch({
      type: 'setNumberOfGuests',
      payload: guest
    });
  }, [guest]);

  // const startDate = useSelector<ReducersList, string>(
  //   (state) => state.roomPage.priceByDay
  // );

  const handleSubmit = () => {
    const query = {
      move_in: movein,
      move_out: moveout,
      number_of_guests: 1,
      long_term_room_id: Router.query.id
    };

    Router.push({
      pathname: '/long-term-book',
      query
    });
  };
  return (
    <Grid className="booking-calendar">
      <Grid className="booking-calendar__box-title">
        {/* absolute */}
        <Grid className="box-title__wrapper">
          <Typography className="box-title__title">Check In</Typography>
          {movein} - {moveout}
        </Grid>
      </Grid>
      <Grid className="booking-calendar__box-main">
        <Grid container className="box-main__wrapper">
          <Grid item sm={7} className="calendar-picker">
            <DateRangeVertical
              date={date}
              setDate={setDate}
              setDisableBooking={setDisableBooking}
            />
          </Grid>

          <Grid item sm={5} className="box-price">
            <QuantityButtons number={guest} setNumber={setGuest} title={'Khách'}></QuantityButtons>
            {!!date.startDate && !!date.endDate ? (
              <Fragment>
                <h3 className="price-title">Chi tiết giá</h3>
                <Grid className="box-price-sub">
                  <Grid className="price-subtitle">Giá gốc</Grid>
                  <Grid className="sub-price">
                    {`${formatMoney(LTBookingPriceCalculate.price_original)}đ`}
                  </Grid>
                </Grid>
                <Grid className="box-price-sub">
                  <Grid className="price-subtitle">Giá đặt cọc</Grid>
                  <Grid className="sub-price">{`${formatMoney(
                    LTBookingPriceCalculate.deposit
                  )}đ`}</Grid>
                </Grid>

                <Divider style={{ margin: ' 16px 0 28px' }} />
                <Grid className="box-price-sub">
                  <h3 className="price-title">Tổng cộng</h3>
                  <Grid className="price-title">{`${formatMoney(
                    LTBookingPriceCalculate.price_with_fee
                  )}đ`}</Grid>
                </Grid>
                <Divider style={{ margin: ' 0px 0 16px' }} />
              </Fragment>
            ) : (
              ''
            )}

            <ButtonGlobal onClick={handleSubmit} disabled={!disableBooking}>
              Book
            </ButtonGlobal>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookingCalendar;
