import React, { useState, memo, useMemo } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import { useDateRange } from './context';
import { Moment } from 'moment';
import RenderDay from './RenderDay';
import { Grid } from '@material-ui/core';
import '@/styles/Airbnb/date-picker-single.scss';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';

const DateSingle = () => {
  const [focused, setFocused] = useState(false);
  const { isOutsideRange, isDayBlocked, onChangeDateSingle, dateSingle } = useDateRange();
  const priceByDay = useSelector<ReducersList, PriceByDayRes[]>(
    (state) => state.roomPage.priceByDay
  );
  const _renderDayContents = (day: Moment) => <RenderDay day={day} priceByDay={priceByDay}/>;

  const _renderMonthText = (day: Moment) => (
    <p className="dateSingle__monthText">{day.format('MMMM YYYY')}</p>
  );

  const onFocusChange = ({ focused }: { focused: boolean | null }) => {
    setFocused(focused);
  };

  return useMemo(
    () => (
      <Grid className="dateSingle">
        <SingleDatePicker
          date={dateSingle}
          numberOfMonths={1}
          isOutsideRange={isOutsideRange}
          // renderMonthText={_renderMonthText}
          isDayBlocked={isDayBlocked}
          renderDayContents={_renderDayContents}
          transitionDuration={300}
          onDateChange={onChangeDateSingle}
          focused={focused}
          onFocusChange={onFocusChange}
          displayFormat="ddd, DD/MM/YYYY"
          hideKeyboardShortcutsPanel
          readOnly
          id="your_unique_id"/>
      </Grid>
    ),
    [focused, dateSingle]
  );
};

export default memo(DateSingle);
