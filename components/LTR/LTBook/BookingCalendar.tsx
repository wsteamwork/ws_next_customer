import ButtonGlobal from '@/components/ButtonGlobal';
import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { ReducersList } from '@/store/Redux/Reducers';
import { LTBookingAction, LTBookingReducerState } from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';
import { DateRange } from '@/store/Redux/Reducers/Search/searchFilter';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { formatMoney } from '@/utils/mixins';
import { Button, Dialog, Divider, Grid, Hidden, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import Router from 'next/router';
import React, { Dispatch, FC, Fragment, useEffect, useState } from 'react';
import { Cookies, withCookies } from 'react-cookie';
import { FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import { useDispatch, useSelector } from 'react-redux';
import DateRangeVerticalLT from './DateRangeVerticalLT';

interface Iprops {
  handleCloseBookingDialog: () => void;
  cookies: Cookies;
}

const BookingCalendar: FC<Iprops> = (props) => {
  const { handleCloseBookingDialog, cookies } = props;
  const { movein, moveout, numberOfGuests, LTBookingPriceCalculate } = useSelector<
    ReducersList,
    LTBookingReducerState
  >((state) => state.ltBooking);
  const isLogin = !!cookies.get('_token');

  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const [date, setDate] = useState<DateRange>({
    startDate: moment(),
    endDate: null
  });
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>('startDate');
  const [guest, setGuest] = useState<number>(numberOfGuests);
  const [disableBooking, setDisableBooking] = useState<boolean>(true);
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const [openMobilePriceDetail, setOpenMobilePriceDetail] = useState<boolean>(false);
  useEffect(() => {
    dispatch({
      type: 'setNumberOfGuests',
      payload: guest
    });
  }, [guest]);



  const handleOpenMobilePriceDetail = () => {
    setOpenMobilePriceDetail(true);
  };

  const handleCloseMobilePriceDetail = () => {
    setOpenMobilePriceDetail(false);
  };

  const handleSubmit = () => {
    if (isLogin) {
      const query = {
        move_in: movein,
        move_out: moveout,
        number_of_guests: numberOfGuests,
        long_term_room_id: Router.query.id
      };

      Router.push({
        pathname: '/long-term-booking',
        query
      });
    } else {
      Router.push({
        pathname: '/auth/signin'
      });
    }
  };

  const onClearDates = () => {
    setDate({ startDate: null, endDate: null });
  };
  return (
    <Fragment>
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
      <Grid className="booking-calendar">
        <Grid className="booking-calendar__box-title">
          {/* absolute */}
          <Grid className="box-title__wrapper">
            <Typography className="box-title__title">
              {focusedInput === 'startDate' && !!date.endDate
                ? `${moment(movein).format('MMM Do')} - ${moment(moveout).format('MMM Do')}`
                : focusedInput === 'endDate'
                ? 'Check Out'
                : 'Check In'}
            </Typography>
            {focusedInput === 'endDate'
              ? 'Chọn ở tối thiểu 1 tháng - 30 ngày'
              : focusedInput === 'startDate' && !!date.endDate
              ? `${moment(moveout).diff(moment(movein), 'days')} ngày `
              : 'Chọn ngày chuyển tới trong vòng 2 tháng kể từ ngày hôm nay'}

            <Grid className="box-button-clear-dates">
              <button onClick={onClearDates} className="button-clear-dates">
                Chọn lại ngày
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="booking-calendar__box-main">
          <Grid container className="box-main__wrapper">
            <Grid item xs={12} lg={7} className="calendar-picker">
              <DateRangeVerticalLT
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                date={date}
                setDate={setDate}
                setDisableBooking={setDisableBooking}
              />
            </Grid>

            <Grid item xs={12} lg={5} className="box-price">
              <QuantityButtons
                number={guest}
                setNumber={setGuest}
                title={'Khách'}></QuantityButtons>
              <Hidden lgUp>
                <Grid className="mobile-box-price">
                  <Grid className="mobile-price-show">
                    {!!date.startDate && !!date.endDate && LTBookingPriceCalculate ? (
                      <Fragment>
                        <Typography>
                          <b>${formatMoney(LTBookingPriceCalculate.price_with_fee)}đ</b> cho{' '}
                          {LTBookingPriceCalculate.range_stay} ngày
                        </Typography>
                        <Button onClick={handleOpenMobilePriceDetail}>Giá chi tiết</Button>

                        <Dialog
                          fullScreen
                          open={openMobilePriceDetail}
                          onClose={handleCloseMobilePriceDetail}
                          // TransitionComponent={Transition}
                        >
                          <Grid
                            style={{
                              zIndex: 102,
                              position: 'absolute',
                              top: 0,
                              width: 100,
                              padding: '0 20px'
                            }}>
                            <IconButton
                              edge="start"
                              color="inherit"
                              onClick={handleCloseMobilePriceDetail}
                              aria-label="close">
                              <CloseIcon />
                            </IconButton>
                          </Grid>
                          {!!date.startDate && !!date.endDate && LTBookingPriceCalculate ? (
                            <Grid className="mobile-box-price-detail">
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
                              <Divider style={{ margin: ' 28px 0 16px' }} />
                            </Grid>
                          ) : (
                            ''
                          )}
                        </Dialog>
                      </Fragment>
                    ) : ltroom ? (
                      <Fragment>
                        <b>{formatMoney(ltroom.prices.prices[0].price)}đ</b>{' '}
                        {ltroom.prices.prices[0].term}
                      </Fragment>
                    ) : (
                      ''
                    )}
                  </Grid>
                  <ButtonGlobal style={{color: '#fff'}} background="linear-gradient(to right, #667eea, #764ba2);" onClick={handleSubmit} disabled={!disableBooking}>
                    {isLogin ? 'Đặt phòng' : 'Đăng nhập để book phòng'}
                  </ButtonGlobal>
                </Grid> 
              </Hidden>
              <Hidden mdDown>
                {!!date.startDate && !!date.endDate && LTBookingPriceCalculate ? (
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
                <ButtonGlobal style={{ color: '#fff' }} background={!disableBooking ? 'linear-gradient(to right, #667eea, #764ba2);' : 'linear-gradient(to right, rgb(163, 171, 208), rgb(172, 125, 220));'} onClick={handleSubmit} disabled={!disableBooking}>
                  {isLogin ? 'Đặt phòng' : 'Đăng nhập để tiếp tục'}
                </ButtonGlobal>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withCookies(BookingCalendar);
