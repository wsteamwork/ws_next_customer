import React, { FC, useMemo } from 'react';
import { changeDataPriceByDay } from './context';
import { Grid } from '@material-ui/core';
import { Moment } from 'moment';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';

interface Iprops {
  day: Moment;
}

const RenderDay: FC<Iprops> = (props) => {
  const priceByDay = useSelector<ReducersList, PriceByDayRes[]>(
    (state) => state.roomPage.priceByDay
  );
  const { day } = props;
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
