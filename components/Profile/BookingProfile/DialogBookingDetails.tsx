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
import CardBooking from '../CardBooking';

interface IDialogBookingDetails {
  stateOpen: number;
  setStateOpen: Dispatch<SetStateAction<number>>;
  dataBooking: BookingIndexRes;
}

const DialogBookingDetails: FC<IDialogBookingDetails> = (props) => {
  const { t } = useTranslation();
  const { setStateOpen, dataBooking } = props;
  const { width } = useContext(GlobalContext);

  const handleClick = (id: number) => {
    setStateOpen(id);
  };

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
          <CardBooking dataBooking={dataBooking}></CardBooking>
        </DialogContent>
      </Grid>
    </Dialog>
  );
};

export default DialogBookingDetails;
