import React, { FC, Fragment } from 'react';
import { compose } from 'recompose';
import { ThemeCustom } from '../Theme';
import { createStyles, withStyles } from '@material-ui/styles';
import { Grid, Link, Typography, Tooltip } from '@material-ui/core';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import numeral from 'numeral';
import StarIcon from '@material-ui/icons/StarRounded';
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
          <Grid className="mediaContainer">
            <Grid className="backContainer">
              <Grid className="frontContainer">
                <Link>
                  <Grid className="mediaWrapper">
                    <img
                      src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/sm/${room.media.data[0].image}`}
                      className="media"
                      alt={``}
                    />
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="infoContainer">
            <Link className="infoLink">
              <Grid className="info">
                <Grid className="roomType-city">
                  <Typography variant="subtitle1">
                    {room.room_type_txt} * {room.city.data.name}
                  </Typography>
                </Grid>
                <Typography variant="h1" className="name">
                  {room.details.data[0].name}
                </Typography>
                <Grid className="price">
                  {numeral(room.price_day).format('0,0')}đ/ngày
                  <Typography className="hourPrice">{room.price_hour && `${numeral(room.price_hour).format('0,0')}đ/4 giờ`}</Typography>
                </Grid>

                {room.total_review > 3 ? (
                  <Grid className="review">
                    <StarIcon className="starIcon" />
                    <Typography className="rating text">{`${room.avg_rating}`}</Typography>
                    <Typography
                      variant="subtitle1"
                      className="totalReview text">{`(${room.total_review})`}</Typography>
                  </Grid>
                ) : (
                  ''
                )}
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default compose<Iprops, any>(withStyles(styles))(RoomCard);
