import React, { FC, useState, useContext, Dispatch, memo, useEffect } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import moment, { Moment } from 'moment';
import { Grid } from '@material-ui/core';
import RenderDay from './RenderDay';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import * as _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/searchFilter';

interface DateRange {
  startDate: Moment | null;
  endDate: Moment | null;
}

const DateRangeSingle: FC = (props) => {
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const dateStart = useSelector<ReducersList, string | null>(
    (state) => state.searchFilter.startDate
  );
  const dateEnd = useSelector<ReducersList, string | null>((state) => state.searchFilter.endDate);
  const [date, setDate] = useState<DateRange>({
    startDate: dateStart ? moment(dateStart) : moment(),
    endDate: dateEnd ? moment(dateEnd) : null
  });
  const [focused, setFocued] = useState<FocusedInputShape | null>(null);
  const { state } = useContext(RoomDetailsContext);
  const { schedule } = state;
  const [maxDate, setMaxDate] = useState<string | undefined>(undefined);

  const onDatesChange = (date: DateRange) => {
    setDate(date);
  };

  const onClose = (date: DateRange) => {
    console.log(date);

    if (date.startDate) {
      dispatch({
        type: 'SET_START_DATE',
        payload: date.startDate.format(DEFAULT_DATE_TIME_FORMAT)
      });
    }

    // if (date.startDate) {
    //   dispatch({
    //     type: 'SET_END_DATE',
    //     payload: date.endDate.format(DEFAULT_DATE_TIME_FORMAT)
    //   });
    // }
  };

  const onFocusChange = (forcus: FocusedInputShape | null) => {
    setFocued(forcus);
  };

  useEffect(() => {
    if (date.startDate) {
      let dateMax = _.find(schedule, (block) => moment(block).diff(date.startDate) > 0);
      setMaxDate(dateMax);
    }
  }, [schedule, date.startDate]);

  const onNextMonthClick = (newCurrentMonth: Moment) => {};

  const _renderDayContents = (day: Moment) => <RenderDay day={day} />;

  const _isOutSideRange = (day: Moment) => day.diff(moment(), 'days') < 0;

  const _blockingDate = (day: Moment) => {
    let isBlocked = _.indexOf(schedule, day.format(DEFAULT_DATE_FORMAT)) !== -1;
    // let isBookingHour = minNights === 0;
    let isBookingHour = false;

    if (focused === 'endDate' && date.startDate) {
      let checkOnlyOneDay =
        day.format(DEFAULT_DATE_FORMAT) !== date.startDate.format(DEFAULT_DATE_FORMAT);

      let onlyOneDay = isBookingHour && checkOnlyOneDay;
      let pastDayBlocked = day.diff(date.startDate, 'days') < 0;
      let chainBlocked = maxDate ? day.diff(moment(maxDate), 'days') > 0 : false;
      return pastDayBlocked || isBlocked || onlyOneDay || chainBlocked;
    }
    return isBlocked;
  };

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
        onClose={onClose}
        focusedInput={focused}
        onFocusChange={onFocusChange}
        isDayBlocked={_blockingDate}
        isOutsideRange={_isOutSideRange}
        renderMonthText={_renderMonthText}
        onNextMonthClick={onNextMonthClick}
        renderDayContents={_renderDayContents}
        hideKeyboardShortcutsPanel
        minimumNights={0}
        noBorder={true}
        displayFormat="ddd, DD/MM/YYYY"
        readOnly
      />
    </Grid>
  );
};

export default memo(DateRangeSingle);
