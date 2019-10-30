import HostInfo from '@/components/HostInfo';
import BoxMap from '@/components/Room/BoxMap';
import RoomReview from '@/components/Room/BoxRoomDetail/RoomReview';
import TablePrices from '@/components/Room/BoxRoomDetail/TablePrices';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Grid, Paper, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';
import EmptyRoomCalendar from './EmptyRoomCalendar';
import RoomAmenities from './RoomAmenities/index';
import RoomBasic from './RoomBasic/index';
import RoomDescription from './RoomDescription/index';

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
                <RoomBasic name={room.details.data[0].name}
                  id={room.id} bathroom={room.bathroom}
                  max_additional_guest={room.max_additional_guest}
                  max_guest={room.max_guest}
                  number_bed={room.number_bed}
                  number_room={room.number_room}
                  totalComforts={room.comforts.data.length}
                  avg_rating={room.avg_rating}
                  avg_rating_txt={room.avg_rating_txt} />
              </Grid>
              <Grid className={classes.hostInfo} item xs={12} sm={4} md={3} lg={4} xl={3}>
                <HostInfo number_room={room.merchant.data.number_room}
                  id={room.merchant.data.id}
                  name={room.merchant.data.name}
                  avatar={room.merchant.data.avatar}
                  avatar_url={room.merchant.data.avatar_url} />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={9}>
                <div className={classes.rowMargin}>
                  <RoomDescription description={room.details.data[0].description} note={room.details.data[0].note} space={room.details.data[0].space} />
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
                  <BoxMap city={room.city.data.name} district={room.district.data.name} latitude={room.latitude} longitude={room.longitude} />
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
