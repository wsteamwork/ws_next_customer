import React, { Fragment, FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  Grid,
  Hidden,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent, Modal
} from '@material-ui/core';
import moment from 'moment';
import DateRangeOutline from "@material-ui/icons/DateRangeOutlined";
import  Router  from 'next/router';
import { RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import { TransitionCustom } from '@/components/Rooms/BottomNav';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import DateRangeSearch from '@/components/Home/DateRangeSearch';
import ChooseGuestRoom from '@/components/Home/ChooseGuestRoom';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import GridContainer from '@/components/Layout/Grid/Container';
import CloseIcon from "@material-ui/icons/Close";
import SearchComponent from '@/components/Home/SearchComponent';
import ActionChoose from '@/components/Home/ChooseGuestRoom/ActionChoose';
import classNames from 'classnames';
import CustomPopper from '@/components/CustomPopper';


interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxChangeDate: {
      padding: 10,
    },
    flexBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    margin15: {
      marginTop: 15,
      [theme!.breakpoints!.down!("sm")]: {
        marginTop: 8
      }
    },
    dialogTitle: {
      display: "flex",
      justifyContent: "space-between",
      // [theme!.breakpoints!.only!("xs")]: {
      //   textAlign: "center",
      //   position: "absolute",
      //   zIndex: 9999,
      //   top: -3,
      //   left: 9
      // }
    },
    closeButtonRoot: {
      [theme!.breakpoints!.only!("xs")]: {
        position: "absolute"
      }
    },
    closeButton: {
      [theme!.breakpoints!.only!("xs")]: {},
      position: "absolute",
      top: '1%',
      right: '1%'
    },
    dialogContent: {
      [theme!.breakpoints!.only!("xs")]: {
        padding: 0
      }
    },
    boxModal:{
      position:'absolute',
      top:'50%',
      left:'50%',
      transform:'translate(-50%,-50%)',
    },
    modalSearch:{
      padding:16,
      backgroundColor:'#fff',
    }
  })
);

const SearchMobile: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [open, setOpen] = useState<boolean>(false);
  const {t} = useTranslation();
  const param:RoomUrlParams = Router.query;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item sm={12} xs={12} className={classes.margin15}>

      <Paper
        className={classes.boxChangeDate}
        onClick={() => setOpen(true)}
      >
        <Grid container spacing={2}>
          <Grid item xs={2} className={classes.flexBox}>
            <DateRangeOutline
              color="primary"
              style={{ verticalAlign: "middle", fontSize: 30 }}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography
              variant="subtitle2"
              style={{ fontSize: "0.725rem", fontWeight: 700 }}
            >
              {moment(param.check_in).format("DD/MM/YYYY")} -{" "}
              {moment(param.check_out).format("DD/MM/YYYY")}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              style={{ fontSize: "0.725rem", fontWeight: 700 }}
            >
              {param.number_of_guests} khách, {param.number_of_rooms}{" "}phòng
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.flexBox}>
            <Button
              variant="text"
              color="primary"
              style={{
                fontSize: "0.64rem",
                verticalAlign: "-webkit-baseline-middle"
              }}
            >
              Thay đổi
            </Button>
          </Grid>
        </Grid>
      </Paper>

        {/*<Dialog*/}
        {/*  fullScreen*/}
        {/*  TransitionComponent={TransitionCustom}*/}
        {/*  scroll="paper"*/}
        {/*  open={open}*/}
        {/*  onClose={() => setOpen(false)}*/}
        {/*>*/}
        {/*  <DialogTitle disableTypography className={classes.dialogTitle}>*/}
        {/*    <Typography variant="h6">*/}
        {/*      Tìm kiếm*/}
        {/*    </Typography>*/}
        {/*    /!*<MapFilter />*!/*/}

        {/*    <IconButton*/}
        {/*      className={classes.closeButton}*/}
        {/*      onClick={()=>setOpen(false)}*/}
        {/*      classes={{*/}
        {/*        root: classes.closeButtonRoot,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <CloseIcon />*/}
        {/*    </IconButton>*/}
        {/*  </DialogTitle>*/}

        {/*  <DialogContent className={classes.dialogContent}>*/}
        {/*    <GridContainer xs={11}>*/}
        {/*      <SearchComponent showGuestRoom={true} className={classes.test}/>*/}
        {/*    </GridContainer>*/}
        {/*  </DialogContent>*/}
        {/*</Dialog>*/}

      {/*<CustomPopper*/}
      {/*  arrow*/}
      {/*  placement="bottom"*/}
      {/*  duration={200}*/}
      {/*  trigger="click"*/}
      {/*  isVisible={open}*/}
      {/*  theme="light-border"*/}
      {/*  // onHide={handleClose}*/}
      {/*  interactive*/}
      {/*  enabled*/}
      {/*  isEnabled*/}
      {/*  content={*/}
      {/*    <SearchComponent showGuestRoom={true} className={classes.test}/>*/}
      {/*  }>*/}
      {/*  */}
      {/*</CustomPopper>*/}

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <GridContainer xs={11} sm={10} className={classes.boxModal}>
          <GridContainer xs={12} spacing={1} style={{backgroundColor:'#fff'}}>
            <Typography id="modal-title" variant='h5' align='center' style={{padding:8}}>
              Tìm kiếm
            </Typography>
          </GridContainer>
          <SearchComponent showGuestRoom={true} className={classes.modalSearch}/>
        </GridContainer>
      </Modal>
    </Grid>
  );
};

export default SearchMobile;
