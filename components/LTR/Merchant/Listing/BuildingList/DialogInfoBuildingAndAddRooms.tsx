import React, { Fragment, FC, useContext, useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Box,
  Dialog,
  useTheme,
  ButtonBase, InputBase, Popper
} from '@material-ui/core';
import { TransitionCustom } from '@/components/Book/BookingForm';
import CloseIcon from '@material-ui/icons/Close';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { axios_merchant } from '@/utils/axiosInstance';
import Autocomplete from '@material-ui/lab/';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pendingValue, setPendingValue] = React.useState<LTRoomIndexRes[]>([]);
  const theme = useTheme();

  const getRoomList = async () => {
    try {
      const res = await axios_merchant.get(`long-term-rooms?building_id=${buildingID}`);
      return res.data;
    } catch (error) {
    }
  };

  useEffect(() => {
    if (open === buildingID) {
      getRoomList()
        .then((res) => {
          setRoomList(res.data);
        });
    }
  }, [buildingID,open]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(roomList);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSearch = () => {
    setRoomList(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const openEl = Boolean(anchorEl);
  const id = openEl ? 'github-label' : undefined;

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
          <div className={classes.root}>
            <ButtonBase
              disableRipple
              className={classes.button}
              aria-describedby={id}
              onClick={handleClick}
            >
              <span>Labels</span>
            </ButtonBase>
            {roomList.map((o,i) => (
              <div
                key={i}
                className={classes.tag}

              >
                {o.about_room.name}
              </div>
            ))}
          </div>

          {/*<Popper*/}
          {/*  id={id}*/}
          {/*  open={open}*/}
          {/*  anchorEl={anchorEl}*/}
          {/*  placement="bottom-start"*/}
          {/*  className={classes.popper}*/}
          {/*>*/}
          {/*  <div className={classes.header}>Apply labels to this pull request</div>*/}
          {/*  <Autocomplete*/}
          {/*    open*/}
          {/*    onClose={handleClose}*/}
          {/*    multiple*/}
          {/*    classes={{*/}
          {/*      paper: classes.paper,*/}
          {/*      option: classes.option,*/}
          {/*      popperDisablePortal: classes.popperDisablePortal,*/}
          {/*    }}*/}
          {/*    value={pendingValue}*/}
          {/*    onChange={(event, newValue) => {*/}
          {/*      setPendingValue(newValue);*/}
          {/*    }}*/}
          {/*    disableCloseOnSelect*/}
          {/*    disablePortal*/}
          {/*    renderTags={() => null}*/}
          {/*    noOptionsText="No labels"*/}
          {/*    renderOption={(option: LabelType, { selected }) => (*/}
          {/*      <React.Fragment>*/}
          {/*        <DoneIcon*/}
          {/*          className={classes.iconSelected}*/}
          {/*          style={{ visibility: selected ? 'visible' : 'hidden' }}*/}
          {/*        />*/}
          {/*        <span className={classes.color} style={{ backgroundColor: option.color }} />*/}
          {/*        <div className={classes.text}>*/}
          {/*          {option.name}*/}
          {/*          <br />*/}
          {/*          {option.description}*/}
          {/*        </div>*/}
          {/*        <CloseIcon*/}
          {/*          className={classes.close}*/}
          {/*          style={{ visibility: selected ? 'visible' : 'hidden' }}*/}
          {/*        />*/}
          {/*      </React.Fragment>*/}
          {/*    )}*/}
          {/*    options={[...labels].sort((a, b) => {*/}
          {/*      // Display the selected labels first.*/}
          {/*      let ai = value.indexOf(a);*/}
          {/*      ai = ai === -1 ? value.length + labels.indexOf(a) : ai;*/}
          {/*      let bi = value.indexOf(b);*/}
          {/*      bi = bi === -1 ? value.length + labels.indexOf(b) : bi;*/}
          {/*      return ai - bi;*/}
          {/*    })}*/}
          {/*    getOptionLabel={(option: LabelType) => option.name}*/}
          {/*    renderInput={params => (*/}
          {/*      <InputBase*/}
          {/*        ref={params.InputProps.ref}*/}
          {/*        inputProps={params.inputProps}*/}
          {/*        autoFocus*/}
          {/*        className={classes.inputBase}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</Popper>*/}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DialogInfoBuildingAndAddRooms;
