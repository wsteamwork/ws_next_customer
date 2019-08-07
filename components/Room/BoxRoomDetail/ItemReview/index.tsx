import React, { FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { IRoomDetailsContext, RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: (props) => props.maxWidth || '18rem',
      border: (props) => props.border || '1px solid #ddd',
      borderRadius: (props) => props.borderRadius || '0.5rem',
      cursor: 'pointer',
      overflow: 'hidden',
      backgroundColor: '#f7f9ff',
      boxShadow: 'none',
      [theme.breakpoints.down('xs')]: {
        maxWidth: 'none !important',
        border: '1px solid #fff !important',
        borderRadius: '0 !important',
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: '15rem !important'
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: '18rem !important'
      }
    },
    content: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: '0.7rem 0 0.7rem 1rem',
      fontSize: '0.5rem'
    },
    userName: {
      fontWeight: 'bold',
      fontSize: (props) => props.fontSize || '1rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '0.9rem !important '
      }
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start'
    },
    link: {
      color: '#484848'
    },
    avatar: {
      margin: 10,
      width: 60,
      height: 60,
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.up('md')]: {
        width: 50,
        height: 50
      },
      [theme.breakpoints.up('lg')]: {
        width: 47,
        height: 47
      }
    },
    icon: {
      paddingRight: 3,
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.8rem !important'
      },
      [theme.breakpoints.down('xs')]: {
        paddingRight: 5
      },
    },
    certificate: {
      color: '#08C299',
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.8rem !important'
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: 15
      },
    }
  })
);

interface IProps {
  maxWidth?: string | number;
  fontSize?: string | number;
  border?: string;
  borderRadius?: string | number;
}

const ItemReview: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { room } = state;
  const merchant = room.merchant.data;
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={3}>
          <Link href={`/users/${merchant.id}`}>
            <a>
              <Avatar
                alt={merchant.avatar}
                src="/static/images/room_demo.jpg"
                className={classes.avatar}
              />
            </a>
          </Link>
        </Grid>
        <Grid item xs={9}>
          <Grid item xs className={classes.content}>
            <Link href={`/users/${merchant.id}`}>
              <a className={classes.link}>
                <Typography className={classes.userName}>{merchant.name}</Typography>
              </a>
            </Link>
            <Grid container className={classes.price}>
              <Grid item sm={3} md={3} lg={3}>
                <Typography variant="subtitle1" className={classes.icon}>
                  <FontAwesomeIcon className={classes.icon} icon={faHome}></FontAwesomeIcon>
                  {merchant.number_room}
                </Typography>
              </Grid>
              <Grid item sm={9} md={9} lg={9}>
                <Typography variant="subtitle1" className={classes.certificate}>
                  <FontAwesomeIcon className={classes.icon} icon={faCheckCircle}></FontAwesomeIcon>
                  {t('rooms:verified')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemReview;
