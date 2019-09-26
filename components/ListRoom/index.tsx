import createStyles from '@material-ui/core/styles/createStyles';
import React, { Fragment, useMemo, ReactNode } from 'react';
import { Theme, Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';
import _ from 'lodash';
import { makeStyles } from '@material-ui/styles';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import { GridSpacing } from '@material-ui/core/Grid';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import Swiper from 'react-id-swiper';
import { SwiperOptions } from 'swiper';

interface Iprops<T> extends Partial<SwiperOptions> {
  roomData: T[];
  title?: string;
  usingSlider?: boolean;
  render?: (room: T) => ReactNode;
  spacing?: GridSpacing;
  customClass?: string;
  usingInMap?: boolean;
  hoverAction?(id: number): void;
}

const useStyles = makeStyles<Theme, any>((theme: Theme) =>
  createStyles({
    root: {
      // marginTop: theme.spacing(8)
    },
    title: {
      marginBottom: theme.spacing(3),
      fontWeight: 900,
      marginTop: theme.spacing(8)
    }
  })
);

const ListRoom = <T extends any>(props: Iprops<T>) => {
  const {
    roomData,
    title,
    usingSlider,
    render,
    spacing,
    usingInMap,
    hoverAction,
    customClass = 'listRoomContainer',
    ...propsSwiper
  } = props;
  const classes = useStyles({});

  const setting = {
    slidesPerView: 5,
    lazy: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    renderPrevButton: () => <PrevArrow className="swiper-button-prev"></PrevArrow>,
    renderNextButton: () => <NextArrow className="swiper-button-next"></NextArrow>,
    breakpoints: {
      1920: {},
      1128: {
        slidesPerView: 4
      },
      960: {
        slidesPerView: 2.3,
        freeMode: true
      },
      600: {
        slidesPerView: 1.5,
        freeMode: true
      }
    }
  };

  const renderRooms = useMemo(
    () =>
      _.map(roomData, (room, index) => (
        <Grid item key={index}>
          {render(room)}
        </Grid>
      )),
    [roomData]
  );

  const renderMapRooms = useMemo(
    () =>
      _.map(roomData, (room, index) => (
        <Grid
          item
          id={`room-${room.id}`}
          key={room.id}
          onMouseEnter={() => hoverAction(room.id)}
          onMouseLeave={() => hoverAction(0)}>
          {render(room)}
        </Grid>
      )),
    [roomData]
  );

  return (
    <Fragment>
      <Grid
        container
        spacing={spacing ? spacing : 0}
        className={classNames(classes.root, customClass)}>
        {title != '' && (
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
        )}
        {roomData ? (
          usingSlider ? (
            <Swiper {...setting} {...propsSwiper}>{renderRooms}</Swiper>
          ) : (
            <Fragment>{usingInMap ? renderMapRooms : renderRooms}</Fragment>
          )
        ) : (
          ''
        )}
      </Grid>
    </Fragment>
  );
};

export default ListRoom;
