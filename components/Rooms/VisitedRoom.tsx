import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { formatPrice } from '@/utils/mixins';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: (props) => props.maxWidth || '26rem',
      border: (props) => props.border || '1px soild #ddd',
      borderRadius: (props) => props.borderRadius || '4px',
      cursor: 'pointer',
      overflow: 'hidden',
      marginBottom: (props) => props.marginBottom || theme.spacing(2)
    },
    content: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: '0.5rem 0.5rem 0 0.5rem'
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%'
    },
    roomName: {
      fontWeight: 'bold',
      fontSize: (props) => props.fontSize || '1rem'
    },
    textContent: {
      fontSize: (props) => props.fontSize  || '1rem'
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    priceHour: {
      paddingLeft: '1rem'
    }
  })
);

interface IProps {
  maxWidth?: string | number;
  fontSize?: string | number;
  border?: string;
  borderRadius?: string | number;
  marginBottom?: string | number;
  room: RoomIndexRes;
};

const VisitedRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room } = props;
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={4}>
          <img
            className={classes.img}
            alt={room.media.data[0].image}
            src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/sm/${room.media.data[0].image}`}
          />
        </Grid>
        <Grid item xs={8}>
          <Grid item xs className={classes.content}>
            <Typography className={classes.roomName}>{room.details.data[0].name}</Typography>
            <Grid className={classes.price}>
              {room.rent_type !== 1 ? (
                <Typography variant="subtitle1" className={classes.priceDay}>
                {formatPrice(room.price_day)} /đêm
                </Typography>
              ):('')}
              {room.rent_type !== 2 ? (
                <Typography variant="subtitle1" className={classes.priceHour}>
                  {formatPrice(room.price_hour)} /4giờ
                </Typography>
              ):('')}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VisitedRoom;
