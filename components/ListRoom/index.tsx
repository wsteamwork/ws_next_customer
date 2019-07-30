import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, {
  ComponentType,
  Fragment,
  useContext,
  useEffect,
  useState,
  lazy,
  Suspense,
  FC
} from 'react';
import { compose } from 'recompose';

import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Theme, Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';
import _ from 'lodash';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { makeStyles } from '@material-ui/styles';
// import { Theme } from '@material-ui/core';
import RoomCard from '../RoomCard';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

interface Iprops {
  classes?: any;
  roomData: RoomIndexRes[];
}

const useStyles = makeStyles<Iprops>((theme: any) =>
  createStyles({
    root: {
      display: 'block',
      marginTop:theme.spacing(7)
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
          // variableWidth: true,
          slidesToShow: 1,
          // autoplay: true,
          // autoplaySpeed: 5000,
          touchThreshold: 1000,
          arrows: false,
          centerMode: true,
          initialSlide: 1,
          centerPadding: "40px"
        }
      }
    ]
  };
  return (
    <Fragment>
      <Grid container className={classNames(classes.root, "listRoomContainer")}>
        <Typography variant='h5' className={classes.title}>
          Phòng nổi bật
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
