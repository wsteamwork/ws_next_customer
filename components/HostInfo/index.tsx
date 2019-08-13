import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';

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
        borderRadius: '0 !important'
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
      padding: '0.7rem 0',
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
      position:'absolute',
      top:'50%',
      left:'50%',
      transform:'translate(-50%,-50%)',
      width: 60,
      height: 60,
      [theme.breakpoints.down('md')]: {
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
      }
    },
    certificate: {
      color: '#08C299',
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.8rem !important'
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: 15
      }
    }
  })
);

interface IProps {
  maxWidth?: string | number;
  fontSize?: string | number;
  border?: string;
  borderRadius?: string | number;
}

const HostInfo: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  const merchant = !!room && room.merchant.data;

  return (
    room && (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={3} sm={4} md={4} lg={4} xl={3} style={{position:'relative'}}>
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
          <Grid item xs={9} sm={8} md={8} lg={8} xl={9}>
            <Grid item xs className={classes.content}>
              <Link href={`/users/${merchant.id}`}>
                <a className={classes.link}>
                  <Typography className={classes.userName}>{merchant.name}</Typography>
                </a>
              </Link>
              <Grid container className={classes.price}>
                <Grid item sm={2} md={3} lg={3}>
                  <Typography variant="subtitle1" className={classes.icon}>
                    <FontAwesomeIcon className={classes.icon} icon={faHome}></FontAwesomeIcon>
                    {merchant.number_room}
                  </Typography>
                </Grid>
                <Grid item sm={10} md={9} lg={9}>
                  <Typography variant="subtitle1" className={classes.certificate}>
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faCheckCircle}></FontAwesomeIcon>
                    {t('rooms:verified')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  );
};

export default HostInfo;
