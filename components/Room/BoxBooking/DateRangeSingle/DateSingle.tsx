import React, { useState, memo, useMemo } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import { useDateRange } from './context';
import { Moment } from 'moment';
import RenderDay from './RenderDay';
import { Grid } from '@material-ui/core';
import '@/styles/Airbnb/date-picker-single.scss';

const DateSingle = () => {
  const [focused, setFocused] = useState(false);
  const { isOutsideRange, isDayBlocked, onChangeDateSingle, dateSingle } = useDateRange();

  const _renderMonthText = (day: Moment) => (
    <p className="dateSingle__monthText">{day.format('MMMM YYYY')}</p>
  );

  const onFocusChange = ({ focused }: { focused: boolean | null }) => {
    setFocused(focused);
  };

  const _renderDayContents = (day: Moment) => <RenderDay day={day} />;

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
          id="your_unique_id"></SingleDatePicker>
      </Grid>
    ),
    [focused, dateSingle]
  );
};

export default memo(DateSingle);
