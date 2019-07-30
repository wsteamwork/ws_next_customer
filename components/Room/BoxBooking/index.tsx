import React, { FC } from 'react';
import { Paper } from '@material-ui/core';
import DateRangeSingle from './DateRangeSingle';

const BoxBooking: FC = () => {
  return (
    <Paper elevation={1} style={{ height: '500px', width: '400px' }}>
      <DateRangeSingle></DateRangeSingle>
    </Paper>
  );
};

export default BoxBooking;
