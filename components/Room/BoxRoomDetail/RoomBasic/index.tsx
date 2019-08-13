import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faUserFriends,
  faBed,
  faBath,
  faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    roomName: {
      fontWeight: 900
    },
    iconHeartBlue: {
      color: '#08C299',
      marginRight: 3
    },
    iconHeartWhite: {
      color: '#ddd',
      marginRight: 3
    }
  })
);

interface IProps { }

const RoomBasic: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

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
    room && (
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.roomName}>
                {room.details.data[0].name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div>
                <span>{arrMenuItem(room.avg_rating)}</span>
                <span>
                  {room.avg_rating} &#8208; {room.avg_rating_txt}
                </span>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6} md={3} lg xl={3}>
              <Grid container>
                <Grid item xs={2} sm={2}>
                  <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon>
                </Grid>
                <Grid className={classes.nameIcon} item xs={10} sm={10}>
                  <Typography variant={'body2'}>
                    {room.max_guest + room.max_additional_guest} {t('rooms:guests')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg xl={3}>
              <Grid container>
                <Grid item xs={2} sm={2}>
                  <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
                </Grid>
                <Grid className={classes.nameIcon} item xs={10} sm={10}>
                  <Typography variant={'body2'}>
                    {room.number_bed} {t('rooms:beds')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
              <Grid container>
                <Grid item xs={2} sm={2}>
                  <FontAwesomeIcon icon={faBath}></FontAwesomeIcon>
                </Grid>
                <Grid className={classes.nameIcon} item xs={10} sm={10}>
                  <Typography variant={'body2'}>
                    {room.bathroom} {t('rooms:bathrooms')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
              <Grid container>
                <Grid item xs={2} sm={2}>
                  <FontAwesomeIcon icon={faDoorOpen}></FontAwesomeIcon>
                </Grid>
                <Grid className={classes.nameIcon} item xs={10} sm={10}>
                  <Typography variant={'body2'}>
                    {room.number_room} {t('rooms:rooms')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  );
};

export default RoomBasic;
