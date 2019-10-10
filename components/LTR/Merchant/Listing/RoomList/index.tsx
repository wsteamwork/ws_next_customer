import { ReducersList } from '@/store/Redux/Reducers';
import React, { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { RoomListReducerAction, getRoomList } from '@/store/Redux/Reducers/LTR/RoomList/roomlist';
import RoomCardItem from './RoomCardItem';
import { Typography, Grid } from '@material-ui/core';
interface IProps {
  classes?: any;
}
const RoomListHost: FC<IProps> = (props) => {
  const roomlist = useSelector<ReducersList, any[]>((state) => state.roomlist.roomlist);
  const dispatch = useDispatch<Dispatch<RoomListReducerAction>>();
  useEffect(() => {
    if (!roomlist.length) {
      getRoomList(dispatch);
    }
  }, []);

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <h2>Bộ lọc phòng</h2>
      </Grid>
      {roomlist.length ? (
        roomlist.map((o) => <RoomCardItem key={o.id} room={o}/>)
      ) : (
        <Typography>Chưa có dữ liệu phòng</Typography>
      )}
    </Fragment>
  );
};
export default RoomListHost;
