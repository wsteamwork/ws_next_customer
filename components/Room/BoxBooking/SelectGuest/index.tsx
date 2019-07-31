import React, { ChangeEvent, useState, useContext, useMemo } from 'react';
import { BootstrapInput } from '@/components/SelectGlobal';
import { KeyboardArrowDown } from '@material-ui/icons';
import { Select, MenuItem, Grid } from '@material-ui/core';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';

const SelectGuest = () => {
  const { state } = useContext(RoomDetailsContext);
  const { room } = state;
  const [value, setValue] = useState<number>(1);

  const onChange = (event: ChangeEvent<{ name?: string; value: number }>) => {
    setValue(event.target.value);
  };

  const arrMenuItem = (x: number, y: number): any[] => {
    let i = 1;
    let arr = [];
    let z = x + y;
    while (i <= z) {
      arr.push(
        <MenuItem key={i} value={i}>
          <p className="selectGuest__guest">{i} khách</p>
        </MenuItem>
      );
      i++;
    }
    return arr;
  };

  return (
    room && (
      <Grid className="selectGuest">
        <Select
          onChange={onChange}
          input={<BootstrapInput fullWidth className="selectGuest__input" />}
          displayEmpty
          value={value}
          IconComponent={KeyboardArrowDown}>
          {arrMenuItem(room.max_additional_guest, room.max_guest)}
        </Select>
      </Grid>
    )
  );
};

export default SelectGuest;
