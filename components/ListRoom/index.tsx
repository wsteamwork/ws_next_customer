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
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import _ from 'lodash';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { makeStyles } from '@material-ui/styles';
import { ThemeCustom } from '../Theme';
import RoomCard from '../RoomCard';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

interface Iprops {
  classes?: any;
  roomData: RoomIndexRes[];
}

const useStyles = makeStyles<ThemeCustom, Iprops>((theme: ThemeCustom) =>
  createStyles({
    root: {
      display: 'block'
    }
  })
);

const ListRoom: FC<Iprops> = (props) => {
  const { roomData } = props;
  const classes = useStyles(props);
  const setting: Settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    speed: 700,
    lazyLoad: 'ondemand',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    touchThreshold: 100,
    responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 5,
            
          }
        },
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 3,
            autoplay: true,
            arrows: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            // autoplay: true,
            // autoplaySpeed: 5000,
            touchThreshold: 100,
            arrows: false,
            centerMode: true,
            centerPadding: "50px"
          }
        }
      ]
  };
  return (
    <Fragment>
      <Grid container className="listRoomContainer">
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
