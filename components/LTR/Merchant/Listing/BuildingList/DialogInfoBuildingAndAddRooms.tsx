import React, { Fragment, FC, useContext, useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, DialogTitle, Typography, IconButton, DialogContent, Box, Dialog } from '@material-ui/core';
import { TransitionCustom } from '@/components/Book/BookingForm';
import CloseIcon from '@material-ui/icons/Close';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { axios_merchant } from '@/utils/axiosInstance';

interface IProps {
  classes?: any,
  open: number,
  handleClose: () => void
  buildingID: number,
  name: string,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      padding: '16px 24px',
      borderRadius: 16,
      minWidth: 500
    },
    boxTitle: {
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    boxContent: {
      minHeight: 64,
      padding: 0,
      overflowY: 'unset'
    },
    boxAction: {
      justifyContent: 'space-around',
      marginTop: 16
    }
  })
);

const DialogInfoBuildingAndAddRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, buildingID } = props;
  const { width }                     = useContext(GlobalContext);
  const [roomList, setRoomList]       = useState<LTRoomIndexRes[]>([]);

  const getRoomList = async () => {
    try {
      const res = await axios_merchant.get(`long-term-rooms?building_id=${buildingID}`);
      return res.data;
    } catch (error) {
    }
  };

  useEffect(() => {
    getRoomList()
      .then((res) => {
        setRoomList(res.data);
      });
  }, []);
  console.log(roomList);
  return (
    <Fragment>
      <Dialog aria-labelledby = 'dialog-info-and-add-to-building'
              scroll = 'body'
              maxWidth = {'md'}
              TransitionComponent = {TransitionCustom}
              fullScreen = {width === 'xs'}
              onClose = {handleClose}
              open = {open === buildingID}
              classes = {{ paper: classes.root }}
      >
        <DialogTitle disableTypography className = {classes.boxTitle}>
          <Typography variant = 'h6'>Thông tin tòa nhà</Typography>
          <IconButton aria-label = 'close' onClick = {handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className = {classes.boxContent}>
          <Box>

          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DialogInfoBuildingAndAddRooms;
