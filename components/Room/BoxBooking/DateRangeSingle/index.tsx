import React, { FC, useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import momemt, { Moment } from 'moment';

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

  return (
    <DateRangePicker
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
      minimumNights={0}
      noBorder={true}
      displayFormat="ddd, DD/MM/YYYY"
      readOnly
    />
  );
};

export default DateRangeSingle;
