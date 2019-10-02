import HostInfo from '@/components/HostInfo/index';
import EmptyRoomCalendar from '@/components/Room/BoxRoomDetail/EmptyRoomCalendar';
import TablePrices from '@/components/Room/BoxRoomDetail/TablePrices';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Grid, Paper, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';
import BoxMap from '../BoxMap/index';
import RoomAmenities from './RoomAmenities/index';
import RoomBasic from './RoomBasic/index';
import RoomDescription from './RoomDescription/index';
import RoomReview from './RoomReview/index';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      boxShadow: 'none',
      // marginBottom: theme.spacing(10),
      padding: '0 32px 0 8px',
      [theme.breakpoints.down('md')]: {
        padding: '0 8px'
      }
    },
    hostInfo: {
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(3)
      }
    },
    rowMargin: {
      marginTop: theme.spacing(4)
    }
  })
);

interface IProps {
  room: RoomIndexRes,
}

const BoxRoomDetail: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room } = props;

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item md={12} lg={12}>
            <Grid container spacing={1} justify='center'>
              <Grid item xs={11} sm={8} md={9} lg={8} xl={9}>
                <RoomBasic room={room} />
              </Grid>
              <Grid className={classes.hostInfo} item xs={12} sm={4} md={3} lg={4} xl={3}>
                <HostInfo room={room} />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={9}>
                <div className={classes.rowMargin}>
                  <RoomDescription room={room} />
                </div>
                <div className={classes.rowMargin}>
                  <RoomAmenities room={room} />
                </div>
                <div className={classes.rowMargin}>
                  <TablePrices room={room} />
                </div>
                <div className={classes.rowMargin}>
                  <EmptyRoomCalendar />
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={1} justify='center'>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={classes.rowMargin}>
                  <RoomReview room={room} showComment />
                </div>
                <div className={classes.rowMargin}>
                  <BoxMap room={room} />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default BoxRoomDetail;
