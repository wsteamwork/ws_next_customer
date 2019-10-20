import BoxAmenities from '@/components/LTR/LTRoom/BoxAmenities';
import BoxListImageRoom from '@/components/LTR/LTRoom/BoxListImageRoom';
import BoxTablePrices from '@/components/LTR/LTRoom/BoxTablePrices';
import BoxMap from '@/components/Room/BoxMap';
import RoomBasic from '@/components/Room/BoxRoomDetail/RoomBasic';
import RoomDescription from '@/components/Room/BoxRoomDetail/RoomDescription';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { Grid, Paper, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';

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
    },
  })
);

interface IProps {
  room: LTRoomIndexRes,
}

const BoxLTRoomDetail: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room } = props;

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item md={12} lg={12}>
            <Grid container spacing={1}>
              <Grid item xs={11}>
                <RoomBasic showBed={false}
                  name={room.about_room.name}
                  id={room.id}
                  bathroom={room.bathrooms.number_bathroom}
                  max_additional_guest={room.guests.max_additional_guest}
                  max_guest={room.guests.recommendation}
                  number_room={room.bedrooms.number_bedroom}
                  totalComforts={room.total_comforts}
                  avg_rating={room.rating.avg_avg_rating}
                  avg_rating_txt={room.rating.avg_avg_rating_txt} />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <div className={classes.rowMargin}>
                  <RoomDescription description={room.about_room.description} space={room.about_room.space} note={room.about_room.note} />
                </div>
                <div className={classes.rowMargin}>
                  <BoxListImageRoom livingrooms={room.livingrooms} outdoors={room.outdoors} furnitures={room.furnitures} cover_photo={room.cover_photo}
                    kitchens={room.kitchens} bedrooms={room.bedrooms} bathrooms={room.bathrooms} roomName={room.about_room.name} />
                </div>
                <div className={classes.rowMargin}>
                  <BoxAmenities facilities={room.comforts.facilities}
                    bedrooms={room.comforts.bedrooms}
                    bathrooms={room.comforts.bathrooms}
                    outdoors={room.comforts.outdoors}
                    others={room.comforts.others}
                    entertainment={room.comforts.entertainment}
                    livingrooms={room.comforts.livingrooms}
                    common={room.comforts.common}
                    kitchens={room.comforts.kitchens}
                  />
                </div>
                <div className={classes.rowMargin}>
                  <BoxTablePrices prices={room.prices.prices}
                    included_fee={room.prices.included_fee}
                    included_services={room.included_services}
                    not_included_services={room.not_included_services}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={1} justify='center'>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {/*<div className={classes.rowMargin}>*/}
                {/*  Review*/}
                {/*</div>*/}
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

export default BoxLTRoomDetail;
