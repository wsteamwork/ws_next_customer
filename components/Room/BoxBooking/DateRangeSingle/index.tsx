import React, { FC, useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import momemt, { Moment } from 'moment';
import { Paper } from '@material-ui/core';
import RenderDay from './RenderDay';

interface DateRange {
  startDate: Moment | null;
  endDate: Moment | null;
}

const DateRangeSingle: FC = (props) => {
  const [date, setDate] = useState<DateRange>({ startDate: momemt(), endDate: null });
  const [focused, setFocued] = useState<FocusedInputShape | null>(null);

  const onDatesChange = (date: DateRange) => {
    setDate(date);
  };

  const onFocusChange = (forcus: FocusedInputShape | null) => {
    setFocued(forcus);
  };

  const onNextMonthClick = (newCurrentMonth: Moment) => {};

  const _renderDayContents = (day: Moment) => <RenderDay day={day} />;

  return (
    <Paper>
      <DateRangePicker
        transitionDuration={300}
        numberOfMonths={1}
        startDateId="startDate"
        endDateId="endDate"
        startDate={date.startDate}
        endDate={date.endDate}
        onDatesChange={onDatesChange}
        focusedInput={focused}
        onFocusChange={onFocusChange}
        //   isDayBlocked = {blockingDate}
        //   isOutsideRange = {isOutSideRange}
        onNextMonthClick={onNextMonthClick}
        renderDayContents={_renderDayContents}
        hideKeyboardShortcutsPanel
        minimumNights={1}
        noBorder={true}
        displayFormat="ddd, DD/MM/YYYY"
        readOnly
      />
    </Paper>
  );
};

export default DateRangeSingle;
