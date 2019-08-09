import React, { FC, Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ReviewItem from '../ReviewItem/index';
import RatingDetail from '../RatingDetail/index';
import Slider, { Settings } from 'react-slick';
import _ from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReducersList } from '@/store/Redux/Reducers';
import { useSelector } from 'react-redux';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';

import NextArrowSlider from './NextArrowSlider';
import PrevArrowSlider from './PrevArrowSlider';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 900,
      margin: '1rem 0 1rem 0'
    }
  })
);

interface IProps { }

const RoomReview: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  const setting: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1.5,
    speed: 800,
    arrows: true,
    lazyLoad: 'ondemand',
    touchThreshold: 1000000,
    mobileFirst: true,
    centerPadding: '20%',
    swipeToSlide: true,
    className: 'slides',
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          arrows: true,
          lazyLoad: false,
          centerMode: true,
          // initialSlide: 0,
          // centerPadding: '24%',
          slidesToScroll: 2
        }
      },
      // {
      //   breakpoint: 768,
      //   settings: {
      //     slidesToShow: 1
      //   }
      // },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: '12%',
          arrows: true,
          lazyLoad: false,
          centerMode: true,
          initialSlide: 0,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.name}>
            {t('rooms:review')}({room.total_review})
          </Typography>
        </Grid>
        {room.total_review !== 0 ? (

          <Grid container item xs>
            <Grid item xs={3} sm={3} md={4} lg={4}>
              <RatingDetail />
            </Grid>
            <Grid item xs={9} sm={9} md={7} lg={7}>
              {/* {room.reviews.data.length > 1 ? (
                <Slider {...setting}>
                  {_.map(
                    room.reviews.data,
                    (obj, i) => obj.status === 1 && <ReviewItem key={i} review={obj} />
                  )}
                </Slider>
              ) : (
                  <ReviewItem review={room.reviews.data[0]} />
                )} */}
            </Grid>
          </Grid>
        ) : (
            <Grid container>
              <Grid item xs={12}>
                <Typography>
                  Hiện tại chưa có đánh giá nào vê căn hộ. Vui lòng đặt phòng và là người đầu tiên cho chúng tôi biết cảm nhận của
                  bạn.
              </Typography>
              </Grid>
            </Grid>
          )}
      </Grid>
    </Fragment>
  );
};

export default RoomReview;
