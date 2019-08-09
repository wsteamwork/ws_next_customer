import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { useSelector } from 'react-redux';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: '20rem',
      cursor: 'pointer',
      overflow: 'hidden',
      boxShadow: 'none'
    },
    iconHeartBlue: {
      color: '#08C299',
      marginRight: 3
    },
    iconHeartWhite: {
      color: '#ddd',
      marginRight: 3
    },
    rowMargin: {
      marginBottom: 6
    }
  })
);

interface IProps { }

const RatingDetail: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  const arrRating = [
    {
      name: 'Sạch sẽ',
      rating: room.avg_cleanliness
    },
    {
      name: 'Chất lượng',
      rating: room.avg_quality
    },
    {
      name: 'Dịch vụ',
      rating: room.avg_service
    },
    {
      name: 'Đáng giá',
      rating: room.avg_valuable
    },
    {
      name: 'Tổng quan',
      rating: room.avg_rating
    }
  ];
  const arrMenuItem = (x: number): any[] => {
    let i = 1;
    let arr = [];
    let z = Math.round(x);
    while (i <= 5) {
      if (i <= z) {
        arr.push(
          <FontAwesomeIcon
            key={i}
            className={classes.iconHeartBlue}
            icon={faHeart}></FontAwesomeIcon>
        );
      } else {
        arr.push(
          <FontAwesomeIcon
            key={i}
            className={classes.iconHeartWhite}
            icon={faHeart}></FontAwesomeIcon>
        );
      }
      i++;
    }
    return arr;
  };
  return (
    <Paper className={classes.paper}>
      {_.map(arrRating, (item, index) => (
        <Grid container key={index} className={classes.rowMargin}>
          <Grid item xs={4}>
            <Typography>{item.name}</Typography>
          </Grid>
          <Grid item xs={8}>
            {arrMenuItem(item.rating)}
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
};

export default RatingDetail;
