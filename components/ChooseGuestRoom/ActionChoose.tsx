import React, { FC, useState, Dispatch, SetStateAction, memo } from 'react';
import { Grid, Button } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { faUserFriends, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SearchFilterAction } from '@/store/Redux/Reducers/searchFilter';
import { ReducersList } from '@/store/Redux/Reducers';

const RowSelect = dynamic(() => import('./RowSelect'));

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ActionChoose: FC<IProps> = (props) => {
  const { setOpen } = props;
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);
  const [guest, setGuest] = useState(numberGuest);
  const [room, setRoom] = useState(numberRoom);

  const hanleSubmit = () => {
    setOpen(false);
    dispatch({ type: 'SET_NUMBER_ROOM', roomsCount: room });
    dispatch({ type: 'SET_NAV_GUESTS', guestsCount: guest });
  };

  return (
    <Grid className="actions">
      <RowSelect icon={faUserFriends} number={guest} setNumber={setGuest} title="Guest"></RowSelect>
      <RowSelect icon={faDoorClosed} number={room} setNumber={setRoom} title="Room"></RowSelect>

      <Grid container>
        <Grid item xs={6} className="centerCustom">
          <Button color="primary">Hủy</Button>
        </Grid>
        <Grid item xs={6} className="centerCustom">
          <Button color="primary" variant="contained" onClick={hanleSubmit}>
            App dụng
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(ActionChoose);
