import ButtonGlobal from '@/components/ButtonGlobal';
import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { ReducersList } from '@/store/Redux/Reducers';
import { LTBookingAction, LTBookingReducerState } from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';
import { DateRange } from '@/store/Redux/Reducers/Search/searchFilter';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { formatMoney } from '@/utils/mixins';
import { Dialog, Divider, Grid, Hidden, IconButton, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import Router from 'next/router';
import React, { Dispatch, FC, Fragment, useEffect, useState } from 'react';
import { Cookies, withCookies } from 'react-cookie';
import { FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
        pathname: '/auth'
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
          position: 'fixed',
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
                  ? t('book:calendarLT:moveOut')
                  : t('book:calendarLT:moveIn')}
            </Typography>
            {focusedInput === 'endDate'
              ? t('book:calendarLT:moveInValid')
              : focusedInput === 'startDate' && !!date.endDate
                ? `${moment(moveout).diff(moment(movein), 'days')} ${t('book:calendarLT:days')} `
                : t('book:calendarLT:moveInRange')
            }

            <Grid className="box-button-clear-dates">
              <Button onClick={onClearDates} variant="outlined" className="button-clear-dates">
                {t('book:calendarLT:resetDate')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="booking-calendar__box-main">
          <Grid container className="box-main__wrapper">
            <Grid item xs={12} lg={7} xl={6} className="calendar-picker">
              <DateRangeVerticalLT
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                date={date}
                setDate={setDate}
                setDisableBooking={setDisableBooking}
              />
            </Grid>

            <Grid item xs={12} lg={5} xl={6} className="box-price">
              <QuantityButtons
                number={guest}
                setNumber={setGuest}
                title={t('book:calendarLT:guests')}></QuantityButtons>
              <Hidden lgUp>
                <Grid container spacing={2} className="mobile-box-price">
                  <Grid item xs className="mobile-price-show">
                    {!!date.startDate && !!date.endDate && LTBookingPriceCalculate ? (
                      <Fragment>
                        <Typography className="price">
                          {t('longtermroom:currency')}{formatMoney(LTBookingPriceCalculate.price_with_fee)}/{LTBookingPriceCalculate.range_stay} {t('book:calendarLT:days')}
                        </Typography>
                        <a onClick={handleOpenMobilePriceDetail}>{t('book:calendarLT:detailPrices')}</a>
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
                              <h3 className="price-title">{t('book:calendarLT:priceSpecification')}</h3>
                              <Grid className="box-price-sub">
                                <Grid className="price-subtitle">{t('book:calendarLT:originalPrice')}</Grid>
                                <Grid className="sub-price">
                                  {t('longtermroom:currency')}{`${formatMoney(LTBookingPriceCalculate.price_original)}`}
                                </Grid>
                              </Grid>
                              <Grid className="box-price-sub">
                                <Grid className="price-subtitle">{t('book:calendarLT:depositFee')}</Grid>
                                <Grid className="sub-price">{t('longtermroom:currency')}{`${formatMoney(
                                  LTBookingPriceCalculate.deposit
                                )}`}</Grid>
                              </Grid>

                              <Divider style={{ margin: ' 16px 0 28px' }} />
                              <Grid className="box-price-sub">
                                <h3 className="price-title">{t('book:calendarLT:totalPrice')}</h3>
                                <Grid className="price-title">{t('longtermroom:currency')}{`${formatMoney(
                                  LTBookingPriceCalculate.price_with_fee
                                )}`}</Grid>
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
                        {/* <div>
                            <Typography className={'price'}>
                              {numeral(priceBasic).format('0,0')} {t('longtermroom:currency')}
                            </Typography>
                            <Typography variant="subtitle2">{t('longtermroom:priceBasic')}</Typography>
                          </div> */}
                        <Typography className="price">
                          {t('longtermroom:currency')}{formatMoney(ltroom.prices.prices[0].price)}
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: '0.75rem' }}>{ltroom.prices.prices[0].term}</Typography>
                      </Fragment>
                    ) : (
                          ''
                        )}
                  </Grid>
                  <Grid item xs={isLogin ? 4 : 5} sm={3}>
                    <ButtonGlobal
                      background="linear-gradient(to right, #667eea, #764ba2);"
                      padding="0px"
                      width="100%"
                      onClick={handleSubmit}
                      disabled={!disableBooking}
                      style={{ color: '#fff' }}
                      className="btBook">
                      {!isLogin ? `${t('book:loginToContinue')}` : `${t('book:createBooking')}`}
                    </ButtonGlobal>
                  </Grid>
                </Grid>
              </Hidden>
              <Hidden mdDown>
                {!!date.startDate && !!date.endDate && LTBookingPriceCalculate ? (
                  <Fragment>
                    <h3 className="price-title">{t('book:calendarLT:priceSpecification')}</h3>
                    <Grid item xs={11}>
                      <Grid className="box-price-sub">
                        <Grid className="price-subtitle">{t('book:calendarLT:originalPrice')}</Grid>
                        <Grid className="sub-price">
                          {t('longtermroom:currency')}{`${formatMoney(LTBookingPriceCalculate.price_original)}`}
                        </Grid>
                      </Grid>
                      <Grid className="box-price-sub">
                        <Grid className="price-subtitle">{t('book:calendarLT:depositFee')}</Grid>
                        <Grid className="sub-price">{t('longtermroom:currency')}{`${formatMoney(
                          LTBookingPriceCalculate.deposit
                        )}`}
                        </Grid>
                      </Grid>

                      <Divider style={{ margin: ' 16px 0 28px' }} />
                      <Grid className="box-price-sub">
                        <h3 className="price-title">{t('book:calendarLT:totalPrice')}</h3>
                        <Grid className="price-title">{t('longtermroom:currency')}{`${formatMoney(
                          LTBookingPriceCalculate.price_with_fee
                        )}`}
                        </Grid>
                      </Grid>
                      <Divider style={{ margin: ' 0px 0 16px' }} />
                    </Grid>
                  </Fragment>
                ) : (
                    ''
                  )}
                <ButtonGlobal style={{ cursor: 'pointer', color: '#fff' }} background={!disableBooking ? 'linear-gradient(to right, #667eea, #764ba2);' : 'linear-gradient(to right, rgb(163, 171, 208), rgb(172, 125, 220));'} onClick={handleSubmit}>
                  {isLogin ? t('book:calendarLT:createBooking') : t('book:calendarLT:loginToContinue')}
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
