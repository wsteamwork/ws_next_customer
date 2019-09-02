import createStyles from '@material-ui/core/styles/createStyles';
import React, { Fragment, useMemo, ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Theme, Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';
import _ from 'lodash';
import { makeStyles } from '@material-ui/styles';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
// import { useTranslation } from 'react-i18next';
import { GridSpacing } from '@material-ui/core/Grid';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';

interface Iprops<T> extends Partial<Settings> {
  roomData: T[];
  title?: string;
  usingSlider?: boolean;

  render?: (room: T) => ReactNode;
  spacing?: GridSpacing;
  customClass?: string;

  usingInMap?: boolean;
  hoverAction?(id: number): void;
  hoverId?: number;
  focusRoomLocation?(room: RoomIndexRes): void;
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
    hoverId,
    focusRoomLocation,
    customClass = 'listRoomContainer',
    ...propsSlick
  } = props;
  const classes = useStyles({});

  const setting: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    speed: 800,
    lazyLoad: 'progressive',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    touchThreshold: 1000000,
    centerPadding: '20%',
    swipeToSlide: true,
    // useCSS: false,
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
          slidesToShow: 1.9,
          arrows: false,
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
          arrows: false,
          centerMode: true,
          initialSlide: 0,
          slidesToScroll: 1
        }
      }
    ]
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
            <Slider {...setting} {...propsSlick}>
              {renderRooms}
            </Slider>
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
