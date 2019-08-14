import React, { FC, Dispatch, Fragment, SetStateAction, useContext } from 'react';
import Location from '@material-ui/icons/LocationOnOutlined';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { TransitionCustom } from '@/components/Book/BookingForm';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Grid,
  Typography,
  Button,
  Hidden,
  Divider
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { formatMoney } from '@/utils/mixins';
import { useTranslation } from 'react-i18next';

interface IDialogBookingDetails {
  stateOpen: number;
  setStateOpen: Dispatch<SetStateAction<number>>;
  dataBooking: BookingIndexRes;
}

const DialogBookingDetails: FC<IDialogBookingDetails> = (props) => {
  const { t } = useTranslation();
  const { setStateOpen } = props;
  const { width } = useContext(GlobalContext);

  const handleClick = (id: number) => {
    setStateOpen(id);
  };

  const room = props.dataBooking.room.data;

  return (
    <Dialog
      key={props.dataBooking.id}
      TransitionComponent={TransitionCustom}
      keepMounted
      scroll="body"
      fullScreen={width === 'xs' || width === 'sm'}
      maxWidth="md"
      open={props.stateOpen === props.dataBooking.id}
      onClose={() => handleClick(0)}>
      <Grid className="dialogBookingDetails">
        <DialogTitle classes={{ root: 'dialogTitle' }}>
          <IconButton aria-label="Close" onClick={() => handleClick(0)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent classes={{ root: 'dialogContent' }}>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12}>
              <Typography className={'titleMargin'}>
                <span className={'titleDetails'}>{t('profile:bookingProfile:roomInfo')}</span>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5} md={4} lg={4}>
                  <img
                    alt="image room"
                    src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${room.media.data[0].image}`}
                    className={'imageRoom'}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7}
                  lg={6}
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="flex-start">
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">{room.details.data[0].name}</Typography>
                    </Grid>
                    <Grid item className={'rowMargin'}>
                      <Rating
                        value={room.avg_rating}
                        color="#FFC412"
                        readOnly
                        size="small"></Rating>

                      <span className={'spanViews'}>{room!.total_review} views</span>
                    </Grid>
                    <Grid item className={'rowMargin'}>
                      <span className={'txtAddress'}>
                        <Location className={'iconLocation'} />
                        {room.details.data[0].address}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item className={'rowMargin'}>
                      {props.dataBooking.status_txt === '' ? (
                        ''
                      ) : (
                        <Button variant="outlined" size="small" className={'btStatus'}>
                          {props.dataBooking.status_txt}
                        </Button>
                      )}
                      {props.dataBooking.coupon_txt === '' ? (
                        ''
                      ) : (
                        <Button variant="outlined" size="small" className={'btStatus'}>
                          {props.dataBooking.coupon_txt}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={'titleMargin'}>
                <span className={'titleDetails'}>{t('profile:bookingProfile:customInfo')}</span>
              </Typography>
              <Grid container>
                <Grid item xs={12} sm>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:guestBook')}{' '}
                    </span>
                    <span>{props.dataBooking.name}</span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:guestPhone')}{' '}
                    </span>
                    <span>{props.dataBooking.phone}</span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:guestEmail')}{' '}
                    </span>
                    <span>{props.dataBooking.email}</span>
                  </Typography>
                  <Hidden smUp implementation="css">
                    <Divider />
                  </Hidden>
                </Grid>
                <Grid item xs={12} sm>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:guestReceived')}{' '}
                    </span>
                    <span>{props.dataBooking.name_received}</span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:checkinGuestPhone')}{' '}
                    </span>
                    <span>{props.dataBooking.phone_received}</span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:guestEmailReceived')}{' '}
                    </span>
                    <span>{props.dataBooking.email_received}</span>
                  </Typography>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>{t('profile:bookingProfile:note')}{' '}</span>
                    <span>{props.dataBooking.note}</span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={'titleMargin'}>
                <span className={'titleDetails'}>{t('profile:bookingProfile:billInfo')}</span>
              </Typography>
              <Grid container>
                <Grid item xs={12} sm>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:checkinDate')}{' '}
                    </span>
                    <span>{moment(props.dataBooking.checkin).format('DD-MM-YYYY, HH:mm A')}</span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:checkoutDate')}{' '}
                    </span>
                    <span>{moment(props.dataBooking.checkout).format('DD-MM-YYYY, HH:mm A')}</span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:paymentMethod')}{' '}
                    </span>
                    <span>{props.dataBooking.payment_method_txt}</span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:paymentStatus')}{' '}
                    </span>
                    <span>{props.dataBooking.payment_status_txt}</span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:guestNumber')}{' '}
                    </span>
                    <span>{props.dataBooking.number_of_guests}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>{t('profile:bookingProfile:price')} </span>
                    <span>{formatMoney(props.dataBooking.price_original)} </span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:serviceFee')}{' '}
                    </span>
                    <span>{formatMoney(props.dataBooking.service_fee)} </span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:reducedPrice')}{' '}
                    </span>
                    <span>{formatMoney(props.dataBooking.price_discount)} </span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:surcharge')}{' '}
                    </span>
                    <span>{formatMoney(props.dataBooking.additional_fee)} </span>
                  </Typography>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:codeDiscount')}{' '}
                    </span>
                    <span>{formatMoney(props.dataBooking.coupon_discount)} </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={'rowMargin'}>
                    <span className={'contentDetails'}>
                      {t('profile:bookingProfile:statusBooking')}{' '}
                    </span>
                    <span style={{ fontWeight: 700 }}>{props.dataBooking.total_txt}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider className={'rowMargin'} />
                  <Typography variant="h5" align="right">
                    {t('profile:bookingProfile:totalMoney')}{' '}
                    {formatMoney(props.dataBooking.total_fee)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </Dialog>
  );
};

export default DialogBookingDetails;
