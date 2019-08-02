import React, { FC, useContext, useMemo } from 'react';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { changeDataPriceByDay } from './context';
import { Grid } from '@material-ui/core';
import { Moment } from 'moment';
import numeral from 'numeral';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';

interface Iprops {
  day: Moment;
}

const RenderDay: FC<Iprops> = (props) => {
  const { state } = useContext(RoomDetailsContext);
  const { day } = props;
  const { priceByDay } = state;
  const dataPriceByDay = useMemo(() => changeDataPriceByDay(priceByDay), [priceByDay]);

  const date = day.format(DEFAULT_DATE_FORMAT);

  return (
    <Grid className="dayContents">
      {day.date()}
      <br></br>
      {dataPriceByDay[date] && (
        <span className="dayContents__price">{dataPriceByDay[date].price_day / 1000000}TR</span>
      )}
    </Grid>
  );
};

export default RenderDay;
