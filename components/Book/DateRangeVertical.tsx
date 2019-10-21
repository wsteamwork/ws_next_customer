import React, { FC, memo, useMemo, useState, useEffect, Dispatch } from 'react';
import 'react-dates/initialize';
import moment, { Moment } from 'moment';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { DayPickerRangeController } from 'react-dates';
import { useDateRange } from '../Room/BoxBooking/DateRangeSingle/context';
import RenderDay from '../Room/BoxBooking/DateRangeSingle/RenderDay';
import { DateRange } from '@/store/Redux/Reducers/Booking/booking';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { FocusedInputShape } from 'react-dates';
const DateRangeVertical: FC = (props) => {
  // const {
  //   date,
  //   onClose,
  //   onDatesChange,
  //   onFocusChange,
  //   isOutsideRange,
  //   isDayBlocked,
  //   onNextMonthClick,
  //   focused
  // } = useDateRange();

  // const dispatch = useDispatch<Dispatch<BookingAction>>();
  const [date, setDate] = useState<DateRange>({
    startDate: moment(),
    endDate: null
  });
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>('startDate');
  const onFocusChange = (focus: FocusedInputShape | null) => {
    setFocusedInput(focus || 'startDate');
  };
  useEffect(() => {
    console.log(focusedInput);
  }, [focusedInput]);

  const onDatesChange = (dateChanged: DateRange) => {
    setDate(dateChanged);
  };

  //   const priceByDay = useSelector<ReducersList, PriceByDayRes[]>(
  //     (state) => state.roomPage.priceByDay
  //   );
  //   const _renderDayContents = (day: Moment) => <RenderDay day={day} priceByDay={priceByDay} />;

  //   const _renderMonthText = (day: Moment) => (
  //     <p className="datePickerBooking__monthText">{day.format('MMMM YYYY')}</p>
  //   );

  return useMemo(
    () => (
      <DayPickerRangeController
        // isRTL={false}
        daySize={60}
        orientation="verticalScrollable"
        minimumNights={3}
        startDate={date.startDate}
        endDate={date.endDate}
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={onFocusChange}
        hideKeyboardShortcutsPanel
        noBorder
        navNext={null}
        navPrev={null}
        monthFormat="MMMM YYYY"
        verticalHeight={300}
        // withPortal={false}
        //   isDayBlocked={isDayBlocked}
        //   isOutsideRange={isOutsideRange}
        numberOfMonths={3}
      />
    ),
    [date]
  );
};

export default memo(DateRangeVertical);
