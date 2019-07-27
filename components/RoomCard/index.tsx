import React, { FC, Fragment } from 'react';
import { compose } from 'recompose';
import { ThemeCustom } from '../Theme';
import { createStyles, withStyles } from '@material-ui/styles';
import { Grid, Link, Typography } from '@material-ui/core';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import numeral from 'numeral';

interface Iprops {
  classes?: any;
  room: RoomIndexRes;
}

const styles: any = (theme: ThemeCustom) => createStyles({});

const RoomCard: FC<Iprops> = (props) => {
  const { classes, room } = props;

  return (
    <Fragment>
      <Grid className="roomCard">
        <Grid className="roomCard__wrapper">
          <Grid className="roomCard__mediaContainer">
            <Grid className="roomCard__backContainer">
              <Grid className="roomCard__frontContainer">
                <Link>
                  <Grid className="roomCard__mediaWrapper">
                    <img
                      src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/sm/${room.media.data[0].image}`}
                      className="roomCard__media"
                      alt={``}
                    />
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="roomCard__infoContainer">
            <Link className="roomCard__infoLink">
              <Grid className="roomCard__infoWrapper">
                <Grid className="">
                  <Typography>{room.room_type_txt}</Typography>
                </Grid>
                <Grid className="">
                {room.details.data[0].name}</Grid>
                <Grid className="">{numeral(room.price_day).format('0,0')}đ</Grid>
                <Grid className=""></Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default compose<Iprops, any>(withStyles(styles))(RoomCard);
