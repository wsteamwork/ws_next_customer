import React, { FC, Fragment } from 'react';
import { compose } from 'recompose';
import { createStyles, withStyles } from '@material-ui/styles';
import { Grid, Link, Typography, Theme, Tooltip } from '@material-ui/core';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import numeral from 'numeral';
import StarIcon from '@material-ui/icons/StarRounded';
import { UseTranslationResponse, useTranslation } from 'react-i18next';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
interface Iprops {
  classes?: any;
  room: RoomIndexRes;
  isHomepage: boolean | false;
}

const styles: any = (theme: Theme) => createStyles({});

const RoomCard: FC<Iprops> = (props) => {
  const { classes, room, isHomepage } = props;
  const { t }: UseTranslationResponse = useTranslation();

  return (
    <Fragment>
      <Grid className="roomCard">
        <Grid className="roomCard__wrapper">
          <Grid className="mediaContainer">
            <Grid className="backContainer">
              <Grid className="frontContainer">
                <Link href={`/room/${room.id}`} target="_blank">
                  <Grid className="mediaWrapper">
                    <img
                      src={`${IMAGE_STORAGE_LG + room.media.data[0].image}`}
                      className="media"
                      alt={``}
                    />
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="infoContainer">
            <Link href={`/room/${room.id}`} target="_blank" className="infoLink">
              <Grid className="info">
                <Typography variant="subtitle1" className="roomCard__type">
                  {room.room_type_txt} &#8226; {room.city.data.name}
                </Typography>
                <Typography className="roomCard__name" variant="h1">
                  {room.instant_book === 1 && (
                    <div className="iconWrapper">
                      <Tooltip
                        classes={{ tooltip: 'tooltip' }}
                        title={'Đặt phòng nhanh'}
                        placement="top">
                        <QuickBookIcon className="instantBookIcon" />
                      </Tooltip>
                    </div>
                  )}
                  <span>{room.details.data[0].name}</span>
                </Typography>

                <Grid className="price">
                  {numeral(room.price_day).format('0,0')}đ/ngày
                  {isHomepage ? (
                    ''
                  ) : (
                      <Typography className="hourPrice">
                        {room.price_hour && `${numeral(room.price_hour).format('0,0')}đ/4 giờ`}
                      </Typography>
                    )}
                </Grid>

                {room.total_review > 3 ? (
                  <Grid className="review">
                    <StarIcon className="starIcon" />
                    <Typography className="rating text">{`${room.avg_rating}`}</Typography>
                    <Typography variant="subtitle1" className="totalReview text">{` (${
                      room.total_review
                      } ${t('home:review')})`}</Typography>
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
