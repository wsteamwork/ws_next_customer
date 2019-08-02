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
  FC,
  useMemo,
  ReactNode,
  ReactElement
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

type Iprops<T> = {
  classes?: any;
  roomData: T[];
  title?: string;
  usingSlider?: boolean;
  render?: (room: T) => ReactNode;
};

const useStyles = makeStyles<Theme, any>((theme: Theme) =>
  createStyles({
    root: {
      display: 'block',
      marginTop: theme.spacing(7)
    },
    title: {
      marginBottom: theme.spacing(3),
      fontWeight: 900
    }
  })
);

const ListRoom = <T extends any>(props: Iprops<T>) => {
  const { roomData, title, usingSlider, render } = props;
  const classes = useStyles({});

  const setting: Settings = {
    dots: false,
    infinite: false,
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
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4
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
          slidesToShow: 1,
          touchThreshold: 1000,
          arrows: false,
          centerMode: true,
          initialSlide: 1,
          centerPadding: '40px'
        }
      }
    ]
  };

  const renderRooms = useMemo(
    () => _.map(roomData, (room, index) => <div key={index}>{render(room)}</div>),
    [roomData]
  );

  return (
    <Fragment>
      <Grid container className={classNames(classes.root, 'listRoomContainer')}>
        {title != '' && (
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
        )}
        {roomData ? (
          usingSlider ? (
            <Slider {...setting}>{renderRooms}</Slider>
          ) : (
            <Fragment>{renderRooms}</Fragment>
          )
        ) : (
          ''
        )}
      </Grid>
    </Fragment>
  );
};

export default ListRoom;
