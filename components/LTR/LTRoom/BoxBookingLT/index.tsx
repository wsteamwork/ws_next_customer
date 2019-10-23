import ButtonGlobal from '@/components/ButtonGlobal';
import HostInfo from '@/components/HostInfo';
import { formatMoney } from '@/utils/mixins';
import { Divider, Theme, Typography, Dialog, Grid, IconButton } from '@material-ui/core';
import { OfflineBoltRounded } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BookingCalendar from '@/components/LTR/LTBook/BookingCalendar';
import CloseIcon from '@material-ui/icons/Close';
interface IProps {
  classes?: any;
  priceBasic: number;
  id: number;
  avatar: string;
  avatar_url: string;
  name: string;
  term: string;
  number_room: number;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxContainer: {
      padding: 16,
      boxShadow: '0 3px 35px 0 rgba(132,135,138,.14)',
      position: 'sticky',
      top: '15%'
    },
    rowMargin: {
      margin: '16px 0'
    }
  })
);

const BoxBookingLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { id, avatar, avatar_url, name, number_room, priceBasic, term } = props;
  const [openBookingDialog, setOpenBookingDialog] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleOpenBookingDialog = () => {
    setOpenBookingDialog(true);
  };

  const handleCloseBookingDialog = () => {
    setOpenBookingDialog(false);
  };

  

  return (
    <div className={classes.boxContainer}>
      <Typography variant="h6">{formatMoney(priceBasic)} Vnd</Typography>
      <Typography variant="subtitle2">{term}</Typography>

      <div className={classes.rowMargin}>
        <ButtonGlobal padding="0px" width="100%" onClick={handleOpenBookingDialog}>
          <p className="flex_center" style={{ color: '#ffffff' }}>
            <OfflineBoltRounded />
            &nbsp;&nbsp;{t('room:boxBooking:bookNow')}
          </p>
        </ButtonGlobal>
      </div>

      <Dialog
        fullScreen
        open={openBookingDialog}
        onClose={handleCloseBookingDialog}
        // TransitionComponent={Transition}
      >
        <BookingCalendar handleCloseBookingDialog={handleCloseBookingDialog} />
      </Dialog>

      <Divider className={classes.rowMargin} />

      <HostInfo
        id={id}
        avatar={avatar}
        avatar_url={avatar_url}
        name={name}
        number_room={number_room}
        maxWidth="100%"
        border="none"
      />
    </div>
  );
};

export default BoxBookingLT;
