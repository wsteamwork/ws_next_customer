import createStyles from '@material-ui/core/styles/createStyles';
import React, {
  Fragment,
  FC
} from 'react';

import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Theme, Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';
import _ from 'lodash';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { makeStyles } from '@material-ui/styles';
import RoomCard from '../RoomCard';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import { useTranslation } from 'react-i18next';

interface Iprops {
  classes?: any;
  roomData: RoomIndexRes[];
}

const useStyles = makeStyles<Iprops>((theme: any) =>
  createStyles({
    root: {
      display: 'block',
      marginTop:theme.spacing(8)
    },
    title:{
      marginBottom:theme.spacing(3),
      fontWeight:900,
    }
  })
);

const ListRoom: FC<Iprops> = (props) => {
  const { roomData } = props;
  const classes = useStyles(props);
  const {t} = useTranslation();
  const setting: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    speed: 800,
    lazyLoad: 'ondemand',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    touchThreshold: 10,
    mobileFirst: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          autoplay: true,
          centerMode: false,
          arrows: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          touchThreshold: 5000,
          slidesToShow: 1.2,
          centerPadding: "12%",
          arrows: false,
          lazyLoad: false,
          centerMode: true,
          initialSlide: 0,
          slidesToScroll: 1,
        }
      }
    ]
  };
  return (
    <Fragment>
      <Grid container className={classNames(classes.root, "listRoomContainer")}>
        <Typography variant='h5' className={classes.title}>
          {t('home:topHomestay')}
        </Typography>
        {roomData ? (
          <Slider {...setting}>
            {_.map(roomData, (room, index) => (
              <div key={index}>
                <RoomCard isHomepage={true} room={room} />
              </div>
            ))}
          </Slider>
        ) : (
            ''
          )}
      </Grid>
    </Fragment>
  );
};

export default ListRoom;
