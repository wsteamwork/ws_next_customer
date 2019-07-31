import React, { FC, useContext, useMemo } from 'react';
import {
  RoomDetailsContext,
  DEFAULT_FORMAT_DATE_PRICE_BY_DAY
} from '@/store/Context/Room/RoomDetailContext';
import { changeDataPriceByDay } from './context';
import { Grid } from '@material-ui/core';
import { Moment } from 'moment';
import numeral from 'numeral';

interface Iprops {
  day: Moment;
}

const RenderDay: FC<Iprops> = (props) => {
  const { state } = useContext(RoomDetailsContext);
  const { day } = props;
  const { priceByDay } = state;
  const dataPriceByDay = useMemo(() => changeDataPriceByDay(priceByDay), [priceByDay]);

  const date = day.format(DEFAULT_FORMAT_DATE_PRICE_BY_DAY);

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
