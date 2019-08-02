import React, { FC, memo, useMemo } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import { Moment } from 'moment';
import { Grid } from '@material-ui/core';
import RenderDay from './RenderDay';
import { useDateRange } from './context';

const DateRange: FC = (props) => {
  const {
    date,
    onClose,
    onDatesChange,
    onFocusChange,
    isOutsideRange,
    isDayBlocked,
    onNextMonthClick,
    focused
  } = useDateRange();

  const _renderDayContents = (day: Moment) => <RenderDay day={day} />;

  const _renderMonthText = (day: Moment) => (
    <p className="datePickerBooking__monthText">{day.format('MMMM YYYY')}</p>
  );

  return useMemo(
    () => (
      <Grid className="datePickerBooking">
        <DateRangePicker
          transitionDuration={300}
          numberOfMonths={1}
          startDateId="startDate"
          endDateId="endDate"
          startDate={date.startDate}
          endDate={date.endDate}
          onDatesChange={onDatesChange}
          // onClose={onClose}
          focusedInput={focused}
          onFocusChange={onFocusChange}
          isDayBlocked={isDayBlocked}
          isOutsideRange={isOutsideRange}
          // renderMonthText={_renderMonthText}
          onNextMonthClick={onNextMonthClick}
          renderDayContents={_renderDayContents}
          hideKeyboardShortcutsPanel
          minimumNights={0}
          noBorder={true}
          displayFormat="ddd, DD/MM/YYYY"
          readOnly
        />
      </Grid>
    ),
    [date, focused, isDayBlocked]
  );
};

export default memo(DateRange);
