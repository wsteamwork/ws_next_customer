import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { formatMoney, formatPrice } from '@/utils/mixins';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { Grid, Paper, Theme, Tooltip, Typography, Divider } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';

interface IProps {
  classes?: any,
  room?: LTRoomIndexRes,
  usingInMap?: boolean;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    apartmentContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '1.2rem',
      paddingBottom: '1.2rem'
    },
    apartmentName: {
      overflow: 'hidden',
      overflowWrap: 'break-word',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      fontWeight: 700,
      color: 'tomato',
      fontSize: '1.2rem',
      justifyContent: 'center',
      alignItems: 'center',
      right: 0,
      // display: 'flex',
      // paddingTop: '1.2rem !important',
      // paddingBottom: '1.1rem !important'
    }
  })
);

const LTRoomCardListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room, usingInMap } = props;
  const { t } = useTranslation();
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const imgRoom = room.avatar.images && room.avatar.images.length ? `${IMAGE_STORAGE_SM + room.avatar.images[0].name}` : "./static/images/westay-avatar.jpg";
  const price = room.price_display ? `${width === 'sm' || width === 'xs' ? formatPrice(room.price_display) : t('rooms:currency') + formatMoney(room.price_display)}` : `${t('rooms:contactForPrice')}}`;
  // const price = room.price_display ? `${(room.price_display / 1000000)} ${t('rooms:currency')}/${t('rooms:month')}` : `${t('rooms:contactForPrice')}}`;

  return (
    <Paper elevation={0} className='ltRoomCardListing'>
      <Grid container className='roomCardListing__wrapper'>
        <Grid item xs={12} className='boxImg'>
          <LazyLoad>
            <img src={imgRoom} className={usingInMap ? 'imgSizeInMap' : 'imgSize'} alt={room.about_room.name} />
          </LazyLoad>
        </Grid>
        <Grid item xs={12} className='boxCard'>
          <Grid className='cardWrapper'>
            <Grid container className='cardContainer'>
              <Link href={`/long-term-room/${room.id}`} target="_blank" className="boxLink">
                <Grid container className='boxTitle'>
                  <Grid item xs={9} container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant='subtitle2' className='roomName'>
                        {room.instant_book ? (
                          <Tooltip
                            classes={{ tooltip: 'tooltip' }}
                            title={room.instant_book_txt}
                            placement='top'>
                            <QuickBookIcon className='svgQuick' />
                          </Tooltip>
                        ) : ''}
                        {room.about_room.name}
                      </Typography>
                    </Grid>
                    <Grid item className='roomSubtitle'>
                      <span className='roomType'>{room.accommodation_type_txt}</span>
                      <span className='dotAmenties'>.</span>&nbsp;
                      <span className='address'>
                        {room.district}, {room.city}
                      </span>
                    </Grid>
                    <Grid item xs={12} className='collectionAmenities'>
                      {room.bedrooms.number_bedroom} {t('rooms:rooms')}
                      <span className='dotAmenties'>.</span>
                      {room.bathrooms.number_bathroom} {t('rooms:bathrooms')}
                      {room.total_area && room.total_area > 0 ? (
                        <Fragment>

                          <span className='dotAmenties'>.</span>
                          <span>{room.total_area ? room.total_area : '?'} m<sup>2</sup></span>
                        </Fragment>
                      ) : ''
                      }
                    </Grid>
                    {room.number_of_listing && <Grid item xs={12} className='collectionAmenities'>
                      {room.number_of_listing} {t('rooms:showNumberRoomSameBuilding')}
                    </Grid>}
                  </Grid>
                  <Grid item xs={3} className="boxPriceContainer">
                    <Grid container>
                      <Grid item xs={12} className='boxPrice'>
                        <Typography variant='subtitle1' className='priceBasic'>
                          {price}
                        </Typography>
                        /{t('rooms:month')}
                      </Grid>
                      {/* <Grid item xs={12} className='boxPrice'>
                        <Typography variant='subtitle1' className='priceBasic'>
                          {price}
                        </Typography>
                        /{t('rooms:month')}
                      </Grid> */}
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={12} className={classes.apartmentContainer}>
                    <Divider />
                    {room.apartment_building && <Grid item xs={12} className={classes.apartmentName}>
                      {room.apartment_building}
                    </Grid>}
                  </Grid> */}
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LTRoomCardListing;
