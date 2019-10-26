import React, { Fragment, FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Paper, Typography, Tooltip, IconButton } from '@material-ui/core';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import _ from 'lodash';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import Hidden from '@material-ui/core/Hidden';
import SvgCustom from '@/components/Custom/SvgCustom';
import { useTranslation } from 'react-i18next';
import FavoriteAnimation from '@/components/Rooms/Lotte/FavoriteAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScaleRight } from '@fortawesome/free-solid-svg-icons';
import { handleCompareList } from '@/components/Rooms/RoomCardListing';
import { IMAGE_STORAGE_MD } from '@/utils/store/global';
import { formatMoney } from '@/utils/mixins';
import Link from '@material-ui/core/Link';

interface IProps {
  classes?: any,
  room?: LTRoomIndexRes
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({})
);

const LTRoomCardListing: FC<IProps> = (props) => {
  const classes  = useStyles(props);
  const { room } = props;
  const { t }    = useTranslation();

  const imgRoom = room.cover_photo.images.length ? `${IMAGE_STORAGE_MD + room.cover_photo.images[0].name}` : "./static/images/westay-avatar.jpg";
  const price = room.prices ? `${formatMoney(room.prices.prices[0].price)} vnd/tháng` : 'Giá liên hệ';

  return (
    <Grid item xs={3}>
      <Paper elevation = {0} className = 'ltRoomCardListing'>
        <Grid container className = 'roomCardListing__wrapper'>
          <Grid item xs = {12} className = 'boxImg'>
            <img src = {imgRoom} className = 'imgSize' alt={room.about_room.name}/>
          </Grid>
          <Grid item xs = {12} className = 'boxCard'>
            <Grid className = 'cardWrapper'>
              <Grid container className = 'cardContainer'>
                <Link href={`/long-term-room/${room.id}`} target="_blank" className="boxLink">
                  <Grid className = 'boxTitle'>
                    <Grid>
                      <Typography variant = 'subtitle2' className = 'roomName'>
                        <Tooltip
                          classes = {{ tooltip: 'tooltip' }}
                          title = {'Đặt phòng nhanh'}
                          placement = 'top'>
                          <QuickBookIcon color = 'primary' className = 'svgQuick' />
                        </Tooltip>
                        {room.about_room.name}
                      </Typography>
                    </Grid>
                    <Grid className = 'roomSubtitle'>
                      <span className = 'roomType'>{room.accommodation_type_txt}</span>
                      <Hidden xsDown>
                        <span className = 'dotAmenties'>.</span>
                      </Hidden>
                      <span className = 'address'>
                        {room.district.data.name}
                      </span>
                    </Grid>
                    <Grid className = 'collectionAmenities'>
                      {room.bedrooms.number_bedroom} {t('rooms:rooms')}
                      <span className = 'dotAmenties'>.</span>
                      {room.bathrooms.number_bathroom} {t('rooms:bathrooms')}
                      <span className = 'dotAmenties'>.</span>
                      {room.total_area ? room.total_area : '?'} {t('rooms:totalArea')}
                    </Grid>
                    <Grid className = 'boxPrice'>
                      <Typography variant = 'subtitle1' className = 'priceBasic'>
                        {price}
                      </Typography>
                    </Grid>
                    <Grid className = 'boxSave'>
                      <FavoriteAnimation />
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </Grid>
  );
};

export default LTRoomCardListing;
