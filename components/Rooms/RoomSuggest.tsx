import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      margin: 'auto',
      maxWidth: (props) => props.maxWidth || '400px',
      border: (props) => props.border || '1px soild #ddd',
      borderRadius: (props) => props.borderRadius || '4px',
      cursor: 'pointer',
      overflow: 'hidden',
    },
    content: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: '0.3rem 0.3rem 0 0.3rem'
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
  })
);

interface IProps {
  maxWidth?: string | number;
  fontSize?: string | number;
  border?: string;
  borderRadius?: string | number;
  roomName: string;
  roomPrice: string | number;
  src: string;
  alt: string;
}

const RoomSuggest: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { alt, src, roomPrice, roomName } = props;
  return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={4}>
            <img className={classes.img} alt={alt} src={src} />
          </Grid>
          <Grid item xs={8} >
            <Grid item xs className={classes.content}>
              <Typography className={classes.roomName}>{roomName}</Typography>
              <Typography variant="subtitle1">{roomPrice}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
  );
};

export default RoomSuggest;
