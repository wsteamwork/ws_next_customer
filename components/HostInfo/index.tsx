import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { Merchant } from '@/types/Requests/Rooms/RoomResponses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: (props) => props.maxWidth || '18rem',
      border: (props) => props.border || '1px soild #ddd',
      borderRadius: (props) => props.borderRadius || '1rem',
      cursor: 'pointer',
      overflow: 'hidden',
      backgroundColor: '#f7f9ff',
      boxShadow: 'none'
    },
    content: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: '0.7rem 0 0.7rem 1rem'
    },
    userName: {
      fontWeight: 'bold',
      fontSize: (props) => props.fontSize || '1rem'
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
        width: 65,
        height: 65,
    },
    icon: {
      marginRight: 5
    },
    certificate: {
      color: '#08C299',
      marginLeft: 15
    },
  })
);

interface IProps {
  maxWidth?: string | number;
  fontSize?: string | number;
  border?: string;
  borderRadius?: string | number;
  countRoom: number;
  merchant: Merchant;
}

const HostInfo: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { merchant, countRoom } = props;
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={3}>
          <Link href={`/users/${merchant.id}`}>
            <a>
                <Avatar alt={merchant.avatar} src={merchant.avatar_url} className={classes.avatar} />
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
              <Grid className={classes.price}>
                <Typography variant="subtitle1" className={classes.icon}>
                <FontAwesomeIcon className={classes.icon} icon={faHome}></FontAwesomeIcon>
                  {countRoom}
                </Typography>
                <Typography variant="subtitle1" className={classes.certificate}>
                  <FontAwesomeIcon className={classes.icon} icon={faCheckCircle}></FontAwesomeIcon>
                  {t('rooms:verified')}
                </Typography>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HostInfo;
