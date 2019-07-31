import React, { FC, useContext } from 'react';
import { Paper, Grid } from '@material-ui/core';
import DateRangeSingle from './DateRangeSingle';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import PriceDetail from './PriceDetail';
import SelectGuest from './SelectGuest';
import TotalPrice from './TotalPrice';
import ButtonGlobal from '@/components/ButtonGlobal';
import CancellationPolicy from './CancellationPolicy';

const BoxBooking: FC = () => {
  const { state } = useContext(RoomDetailsContext);

  return (
    <Grid className="boxBooking">
      <PriceDetail></PriceDetail>
      <Grid className="boxBooking__padding">
        <DateRangeSingle></DateRangeSingle>
        <SelectGuest></SelectGuest>
        <TotalPrice></TotalPrice>

        <Grid className="boxBooking__buttonSubmit">
          <ButtonGlobal padding="0px" width="100%">
            Đặt phòng
          </ButtonGlobal>
        </Grid>
      </Grid>
      <CancellationPolicy></CancellationPolicy>
    </Grid>
  );
};

export default BoxBooking;
