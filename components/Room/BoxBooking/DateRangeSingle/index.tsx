import React, { FC, useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import momemt, { Moment } from 'moment';
import { Paper, Typography, Grid } from '@material-ui/core';
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

  const _isOutSideRange = (day: Moment) => day.diff(momemt(), 'days') <= 0;

  // const blockingDate   = (day: Moment) => {
  //   let isBlocked     = _.indexOf(schedule, day.format(DEFAULT_DATE_FORMAT)) !== -1;
  //   let isBookingHour = (minNights === 0);

  //   if (focusedInput === 'endDate' && !!sd) {
  //     let checkOnlyOneDay = day.format(DEFAULT_DATE_FORMAT) !== sd.format(DEFAULT_DATE_FORMAT);

  //     let onlyOneDay     = (isBookingHour && checkOnlyOneDay);
  //     let pastDayBlocked = day.diff(sd, 'days') < 0;
  //     let chainBlocked   = maxDate ? day.diff(moment(maxDate), 'days') > 0 : false;
  //     return pastDayBlocked || isBlocked || chainBlocked || onlyOneDay;
  //   }
  //   return isBlocked;
  // };

  const _renderMonthText = (day: Moment) => (
    <p className="datePickerBooking__monthText">{day.format('MMMM YYYY')}</p>
  );

  return (
    <Grid className="datePickerBooking">
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
        // isOutsideRange={_isOutSideRange}
        renderMonthText={_renderMonthText}
        onNextMonthClick={onNextMonthClick}
        renderDayContents={_renderDayContents}
        hideKeyboardShortcutsPanel
        minimumNights={1}
        noBorder={true}
        displayFormat="ddd, DD/MM/YYYY"
        readOnly
      />
    </Grid>
  );
};

export default DateRangeSingle;
