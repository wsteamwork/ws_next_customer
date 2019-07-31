import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import VisitedRoom from '../Rooms/VisitedRoom';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    label: {
      textAlign: 'left',
      fontWeight: 900,
      marginBottom: theme.spacing(2)
    }
  })
);

interface IProps {
  visitedRoom: RoomIndexRes[];
}

const VisitedRoomBox: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { visitedRoom } = props;
  return (
    <Paper >
      <Typography variant="h5" className={classes.label}>
        Phòng đã xem
      </Typography>
      {visitedRoom.slice(0, 4).map((room, index) => (
        <VisitedRoom key={index} room={room}></VisitedRoom>
      ))}
    </Paper>
  );
};

export default VisitedRoomBox;
