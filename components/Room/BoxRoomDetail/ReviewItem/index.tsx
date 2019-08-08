import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import ReadMoreAndLess from 'react-read-more-less';
import { RoomReviewIndexResponse } from '@/types/Requests/Rooms/RoomReviewIndexResponse';
import { deepOrange } from '@material-ui/core/colors';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: (props) => props.maxWidth || 'auto',
      cursor: 'pointer',
      overflow: 'hidden',
      boxShadow: 'none',
      [theme.breakpoints.down('xs')]: {
        maxWidth: 'none !important',
        border: '1px solid #fff !important',
        borderRadius: '0 !important'
      }
    },
    content: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: '0.8rem'
    },
    userName: {
      fontWeight: 'bold',
      fontSize: '1.0rem'
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start'
    },
    avatar: {
      marginLeft: 0,
      width: 50,
      height: 50
    },
    iconHeartBlue: {
      color: '#08C299',
      marginRight: 3
    },
    iconHeartWhite: {
      color: '#ddd',
      marginRight: 3
    },
    review: {
      marginTop: '0.7rem'
    }
  })
);

interface IProps {
  maxWidth?: string | number;
  review: RoomReviewIndexResponse;
}

const ReviewItem: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { review } = props;
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
      <Grid container>
        <Grid item xs={2}>
          {review.user.data.avatar_url !== '' ? (
            <Avatar
              alt="Avatar"
              src={review.user.data.avatar_url !== '' ? review.user.data.avatar_url : './static/images/default_avatar.png'}
              className={classes.avatar}
            />
          ) : (
            <Avatar className={classes.avatar}>N</Avatar>
          )}
        </Grid>
        <Grid container item xs={10}>
          <Grid item xs className={classes.content}>
            <Typography className={classes.userName}>
              {review.user.data
                ? review.user.data.name
                  ? review.user.data.name
                  : 'Ẩn danh'
                : 'Ẩn danh'}
            </Typography>
            <Grid container className={classes.price}>
              <Grid item>{arrMenuItem(review.avg_rating)}</Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.review}>
          <Grid item xs={12}>
            <Typography variant="body1" className={'readmore'}>
              <ReadMoreAndLess charLimit={88} readMoreText="Read more" readLessText="">
                {review.comment ? review.comment: 'Chưa nhận xét về căn hộ'}
              </ReadMoreAndLess>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReviewItem;
