import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import DateRangeSingle from './DateRangeSingle';
import PriceDetail from './PriceDetail';
import SelectGuest from './SelectGuest';
import TotalPrice from './TotalPrice';
import CancellationPolicy from './CancellationPolicy';
import SubmitBooking from './SubmitBooking';
import ChooseBookingType from './ChooseBookingType';
import SelectTime from './SelectTime';

const BoxBooking: FC = () => {
  return (
    <Grid className="boxBooking">
      <PriceDetail></PriceDetail>
      <Grid className="boxBooking__padding">
        <ChooseBookingType></ChooseBookingType>
        <DateRangeSingle></DateRangeSingle>
        <SelectGuest></SelectGuest>
        <SelectTime></SelectTime>
        <TotalPrice></TotalPrice>
        <SubmitBooking></SubmitBooking>
      </Grid>
      <CancellationPolicy></CancellationPolicy>
    </Grid>
  );
};

export default BoxBooking;
