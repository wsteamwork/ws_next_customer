import React, { ChangeEvent, ReactNode, memo, FC } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { BootstrapInput } from '@/components/SelectGlobal';
import { KeyboardArrowDown } from '@material-ui/icons';
import { MenuProps } from '.';
import { useMinBookByHourCheckin } from './context';

const SelectTimeCheckin: FC = () => {
  const { valueStart, checkInHour, available_hour, dispatch } = useMinBookByHourCheckin();

  const onChange = (event: ChangeEvent<{ name?: string; value: string }>, child: ReactNode) => {
    dispatch({ type: 'SET_CHECK_IN_HOUR', payload: event.target.value });
  };

  return (
    <Select
      MenuProps={MenuProps}
      onChange={onChange}
      input={<BootstrapInput fullWidth className="selectHours__input" />}
      displayEmpty
      value={checkInHour || valueStart}
      IconComponent={KeyboardArrowDown}>
      {available_hour.map((item, index) => (
        <MenuItem key={index} value={item}>
          <p className="selectHours__guest">{item}</p>
        </MenuItem>
      ))}
    </Select>
  );
};

export default memo(SelectTimeCheckin);
