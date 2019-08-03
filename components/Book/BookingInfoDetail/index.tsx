import { formatMoney } from '@/utils/mixins';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { Fragment, useContext, FC } from 'react';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { BookingDetailContext } from '@/store/Context/Booking/BookingDetailContext';
import SettingRoom from './SettingRoom';

const BookingInfoDetail: FC = (props) => {
  const dataCalculate = useSelector<ReducersList, BookingPriceCalculatorRes>(
    (state) => state.booking.dataCalculate
  );
  const { state } = useContext(BookingDetailContext);
  const { room } = state;

  return (
    <Grid className="bookingInfoDetail">
      <Grid container spacing={2} className={'gridInfo'}>
        <Grid item xs={12}>
          <Paper className={'paperCustomOuter'}>
            <Paper className={'paperCustom'} square>
              {!!dataCalculate && (
                <Grid>
                  <Grid container spacing={2} className="timeCheck">
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLowTitle'}>
                        Ngày nhận phòng
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        {moment.unix(dataCalculate.checkin).format(DEFAULT_DATE_TIME_FORMAT)}
                      </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLowTitle'}>
                        Ngày trả phòng
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        {moment.unix(dataCalculate.checkout).format(DEFAULT_DATE_TIME_FORMAT)}
                      </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLowTitle'}>
                        Số khách
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        {dataCalculate.number_of_guests} người
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} className={'timeCheck spaceTop'}>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLowTitle'}>
                        Giá
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        {`${formatMoney(dataCalculate.price_original)}đ`}
                      </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLowTitle'}>
                        Phí dịch vụ
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        {`${formatMoney(
                          dataCalculate.service_fee +
                            dataCalculate.charge_additional_guest +
                            dataCalculate.charge_additional_hour
                        )}đ`}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} className={'spaceTop timeCheck'}>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLowTitle'}>
                        <Typography variant="h6">Tổng cộng:</Typography>
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        <Typography variant="h6">{`${formatMoney(
                          dataCalculate.total_fee
                        )}đ`}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              <Grid className="spaceTop timeCheck">
                <Typography className="spaceTop" variant="subtitle2">
                  {!!room && !!room.settings && `${room.settings.booking_cancel_text}`}{' '}
                  <SettingRoom></SettingRoom>
                </Typography>
              </Grid>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookingInfoDetail;
