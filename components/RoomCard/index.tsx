import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { cleanAccents, formatPrice } from '@/utils/mixins';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Link, Theme, Tooltip, Typography } from '@material-ui/core';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import { createStyles, makeStyles } from '@material-ui/styles';
import numeral from 'numeral';
import React, { FC, Fragment } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import Cookies from 'universal-cookie';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: '1.2rem !important',
      paddingRight: 5
    }
  })
);

interface Iprops {
  room: RoomIndexRes;
  isHomepage: boolean;
  showIcon?: boolean;
  showBedRoom?: boolean;
  showAddress?: boolean;
  isFormatPrice?: boolean;
}

const RoomCard: FC<Iprops> = (props) => {
  const { room, isHomepage, showIcon, showBedRoom, showAddress, isFormatPrice } = props;
  const { t }: UseTranslationResponse = useTranslation();
  const classes = useStyles(props);
  const cookies = new Cookies();
  const avatarImg = room.media.data.length ? IMAGE_STORAGE_SM + room.media.data[0].image : './static/images/westay-avatar.jpg';
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
                      src={`${avatarImg}`}
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
                  {showIcon && (
                    <FontAwesomeIcon className={classes.icon} icon={faHome}></FontAwesomeIcon>
                  )}
                  {room.room_type_txt}
                  {showAddress && <span> &#8226; {room.city.data.name}</span>}
                  {showBedRoom && <span> &#8226; {room.number_room} {t('room:rooms')}</span>}
                </Typography>
                <Typography className="roomCard__name" variant="h1">
                  {room.instant_book === 1 && (
                    <div className="iconWrapper">
                      <Tooltip
                        classes={{ tooltip: 'tooltip' }}
                        title={t('book:bookingForm:instantBook')}
                        placement="top">
                        <QuickBookIcon className="instantBookIcon" />
                      </Tooltip>
                    </div>
                  )}
                  <span>{room.details.data[0].name}</span>
                </Typography>
                {!showAddress && (
                  <Typography className="roomCard__address" variant="h1">
                    <span>{cookies.get('initLanguage') == 'en' ? cleanAccents(room.district.data.name) : room.district.data.name}</span>
                    <span>&#44;{cookies.get('initLanguage') == 'en' ? cleanAccents(room.city.data.name) : room.city.data.name}</span>
                  </Typography>
                )}

                <Grid className="price">
                  {isFormatPrice ? formatPrice(room.price_day) : numeral(room.price_day).format('0,0')}đ/{t('room:night')}
                  {!isHomepage && room.price_hour > 0 ? (
                    <Typography className="hourPrice">
                      &#10072;{' '}
                      {room.price_hour && (
                        <span>
                          {isFormatPrice ? formatPrice(room.price_hour) : numeral(room.price_hour).format('0,0')}{t('shared:hourPrice')}
                        </span>
                      )}
                    </Typography>
                  ) : (
                      ''
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

RoomCard.defaultProps = {
  isHomepage: false,
  showIcon: false,
  showBedRoom: false,
  showAddress: true,
  isFormatPrice: false
};

export default RoomCard;
