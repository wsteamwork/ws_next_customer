import React, { FC, memo } from 'react';
import { Grid } from '@material-ui/core';
import SelectTimeCheckin from './SelectTimeCheckin';
import { useCheckBookingTypeHour } from './context';
import SelectTimeCheckout from './SelectTimeCheckout';

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '300px',
      width: 'auto'
    }
  }
};

const SelectTime: FC = () => {
  const [check] = useCheckBookingTypeHour();

  return (
    check && (
      <Grid container spacing={1} className="selectHours">
        <Grid item xs={6}>
          <SelectTimeCheckin></SelectTimeCheckin>
        </Grid>
        <Grid item xs={6}>
          <SelectTimeCheckout></SelectTimeCheckout>
        </Grid>
      </Grid>
    )
  );
};

export default memo(SelectTime);
