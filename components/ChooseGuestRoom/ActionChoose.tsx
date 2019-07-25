import React, { FC, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import RowSelect from './RowSelect';
import { faUserFriends, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

const ActionChoose: FC = () => {
  const [guest, setGuest] = useState(0);
  const [room, setRoom] = useState(0);

  return (
    <Grid className="actions">
      <RowSelect icon={faUserFriends} number={guest} setNumber={setGuest} title="Guest"></RowSelect>
      <RowSelect icon={faDoorClosed} number={room} setNumber={setRoom} title="Room"></RowSelect>

      <Grid container>
        <Grid item xs={6} className="centerCustom">
          <Button color="primary">Hủy</Button>
        </Grid>
        <Grid item xs={6} className="centerCustom">
          <Button color="primary" variant="contained">
            App dụng
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ActionChoose;
