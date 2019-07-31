import React, { useContext, FC } from 'react';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { Grid } from '@material-ui/core';
import numeral from 'numeral';

const PriceDetail: FC = () => {
  const { state } = useContext(RoomDetailsContext);
  const { room } = state;

  return (
    room && (
      <Grid container className="priceDetail">
        <Grid item xs={6} className="priceDetail__priceDay flex_center">
          <p>{numeral(room.price_day).format('0,0')} VND/ ngày</p>
        </Grid>
        <Grid item xs={6} className="priceDetail__priceHour flex_center">
          {room.price_hour !== 0 && <p>{numeral(room.price_hour).format('0,0')} VND/ 4 giờ</p>}
        </Grid>
      </Grid>
    )
  );
};

export default PriceDetail;
