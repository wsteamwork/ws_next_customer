import React, { FC, Fragment, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { IRoomDetailsContext, RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import ReviewItem from '../ReviewItem/index';
import RatingDetail from '../RatingDetail/index';
import Slider, { Settings } from 'react-slick';
import _ from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 900,
      margin: '1rem 0 1rem 0'
    },
  })
);

interface IProps { }

const RoomReview: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { room } = state;
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
        breakpoint: 1366,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1.9,
          arrows: true,
          lazyLoad: false,
          centerMode: true,
          initialSlide: 0,
          centerPadding: '24%',
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
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
            {t('rooms:review')}
          </Typography>
        </Grid>
        <Grid container item xs>
          <Grid item xs={3}>
            <RatingDetail />
          </Grid>
          <Grid item xs={9}>
            <div>
              <Slider {...setting}>
                {_.map(room.reviews.data, (obj, i) =>
                  obj.status === 1 ? (
                    <div>
                      <ReviewItem review={obj} />
                    </div>
                  ) : (
                      ''
                    )
                )}
              </Slider>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RoomReview;
