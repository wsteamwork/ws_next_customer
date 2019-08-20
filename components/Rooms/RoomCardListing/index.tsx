import React, { FC, Fragment, useContext } from 'react';
import { compose } from 'recompose';
import { createStyles, withStyles } from '@material-ui/styles';
import { Grid, Typography, Theme, Tooltip } from '@material-ui/core';
import numeral from 'numeral';
import { UseTranslationResponse, useTranslation } from 'react-i18next';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import Slider, { Settings } from 'react-slick';
import classNames from 'classnames';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper/Paper';
import { formatMoney } from '@/utils/mixins';
import Button from '@material-ui/core/Button/Button';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';
import Hidden from '@material-ui/core/Hidden/Hidden';
import LazyLoad from 'react-lazyload';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import '@/styles/PageProfile/StylePageProfile.scss';
import StarIcon from '@material-ui/icons/StarRounded';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import Link from '@material-ui/core/Link';
import { windowExist } from '@/store/Redux';
import { IGlobalContext, GlobalContext } from '@/store/Context/GlobalContext';
import SvgCustom from '@/components/Custom/SvgCustom';
import FavoriteAnimation from '@/components/Rooms/Lotte/FavoriteAnimation.jsx';

interface Iprops {
  classes?: any;
  room?: RoomIndexRes;
}

const RoomCardListing: FC<Iprops> = (props) => {
  const { room } = props;
  const { t }: UseTranslationResponse = useTranslation();
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const settings: Settings = {
    speed: 300,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand'
  };
  const typoVariant: ThemeStyle = width === 'sm' || width === 'xs' ? 'subtitle2' : 'h6';
  const totalComfort = room.comforts.data.length - 4;

  return (
    <Paper elevation={0} className="roomCardListing">
      <Grid container className="roomCardListing__wrapper" spacing={0}>
        <Grid item xs={12} sm={4} md={4} lg={4} className="boxImg">
          <LazyLoad offset={windowExist ? window.innerHeight : 0}>
            <Slider {...settings}>
              {room.media.data.length > 0 ? (
                _.map(room.media.data, (o) => (
                  <img
                    key={o.image}
                    src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${o.image}`}
                    className="imgSize"
                    alt={`Westay - Homestay cho người việt`}
                  />
                ))
              ) : (
                <img src="./static/images/background.svg" className="imgSize" />
              )}
            </Slider>
          </LazyLoad>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} className="boxCard">
          <Grid className="cardWrapper">
            <Grid container className="cardContainer">
              <Link href={`/room/${room.id}`} target="_blank" className="boxLink">
                <Grid className="boxTitle">
                  <Grid>
                    <Typography variant="subtitle2" className="roomName">
                      {room.instant_book === 1 && (
                        <Tooltip
                          classes={{ tooltip: 'tooltip' }}
                          title={'Đặt phòng nhanh'}
                          placement="top">
                          <QuickBookIcon color="primary" style={{ marginRight: 5 }} />
                        </Tooltip>
                      )}
                      {room.details.data[0].name}
                    </Typography>
                  </Grid>
                  <Grid className="roomSubtitle">
                    <span className="roomType">{room.room_type_txt}</span>
                    <Hidden xsDown>
                      <span className="dotAmenties">.</span>
                    </Hidden>

                    <span className="address">
                      {room.district.data.name}, {room.city.data.name}
                    </span>
                  </Grid>
                  <Grid className="collectionAmenities">
                    {room!.max_guest} khách
                    <span className="dotAmenties">.</span>
                    {room!.number_room} phòng
                    <span className="dotAmenties">.</span>
                    {room!.number_bed} giường
                    {room!.bathroom > 0 ? (
                      <Fragment>
                        <span className="dotAmenties">.</span>
                        {room!.bathroom} phòng tắm
                      </Fragment>
                    ) : (
                      ''
                    )}
                  </Grid>
                  <Grid>
                    <ul className="ul">
                      {_.filter(room.comforts.data, (o, i) => {
                        return (
                          o.id === 20 || // air conditioner
                          o.id === 9 || //wifi
                          o.id === 27 || //swimming
                          o.id === 10 //television
                        );
                      })
                        .sort((a, b) => a.id - b.id)
                        .map((o, i) => (
                          <Tooltip
                            key={i}
                            title={o.details.data[0].name}
                            placement="bottom"
                            classes={{ tooltip: 'tooltip' }}>
                            <li key={o.id} className="list">
                              <SvgCustom icon={o.icon} />
                            </li>
                          </Tooltip>
                        ))}
                      {totalComfort > 0 ? (
                        <Tooltip
                          enterTouchDelay={300}
                          classes={{ tooltip: 'tooltip' }}
                          title={`${totalComfort} tiện nghi phòng khác`}
                          placement="bottom">
                          <li>
                            <SvgCustom borderClass="borderBlue" text={`+${totalComfort}`} />
                          </li>
                        </Tooltip>
                      ) : (
                        ''
                      )}
                    </ul>
                  </Grid>
                </Grid>
                {room!.total_review > 3 ? (
                  <Grid className="boxRating">
                    <Tooltip
                      classes={{ tooltip: 'tooltip' }}
                      title={room.avg_rating_txt}
                      placement="top">
                      <StarIcon className="starIcon" />
                    </Tooltip>
                    <Tooltip
                      classes={{ tooltip: 'tooltip' }}
                      title={room.avg_rating_txt}
                      placement="top">
                      <span className="avgRating">{room.avg_rating}</span>
                    </Tooltip>
                    <span className="totalReview">{room.total_review}</span>
                    {/* <span className='totalRev'iewText}>{`${
                          room.avg_rating_txt
                          }`}</span> */}
                  </Grid>
                ) : (
                  ''
                )}

                <Grid className="boxPrice">
                  {room.is_discount === 1 ? (
                    <Grid className="discountPriceBadge">
                      <Grid className="discountBox">Giảm giá</Grid>
                    </Grid>
                  ) : (
                    ''
                  )}
                  <Grid className="priceContainer">
                    {room.price_day > 0 ? (
                      <Grid className="dayPrice">
                        {room.is_discount === 1 ? (
                          <span className="discountPriceText">
                            {numeral(room.price_day).format('0,0')}
                            ₫/ngày
                          </span>
                        ) : (
                          ''
                        )}
                        <Typography className="priceText" variant={typoVariant}>
                          {numeral(
                            room.is_discount === 1 ? room.price_day_discount : room.price_day
                          ).format('0,0')}
                          ₫/ngày
                        </Typography>
                      </Grid>
                    ) : (
                      ''
                    )}

                    {(room.is_discount === 0 && room.price_hour > 0) ||
                    (room.is_discount === 1 && room.price_hour_discount > 0) ? (
                      <Grid className="hourPrice">
                        {room.is_discount === 1 ? (
                          <span className="discountPriceText">
                            {numeral(room.price_hour).format('0,0')}
                            ₫/4 giờ
                          </span>
                        ) : (
                          ''
                        )}
                        <Typography className="priceText" variant={typoVariant}>
                          {numeral(
                            room.is_discount === 1 ? room.price_hour_discount : room.price_hour
                          ).format('0,0')}
                          ₫/4 giờ
                        </Typography>
                      </Grid>
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
              </Link>
              <Grid className="boxSave">
                <FavoriteAnimation />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoomCardListing;
