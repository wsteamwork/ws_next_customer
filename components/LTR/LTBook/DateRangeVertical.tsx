import React, { FC, memo, useMemo, useState, useEffect, Dispatch, useContext } from 'react';
import 'react-dates/initialize';
import moment, { Moment } from 'moment';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { DayPickerRangeController } from 'react-dates';
import { DateRange } from '@/store/Redux/Reducers/Booking/booking';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { FocusedInputShape } from 'react-dates';
import * as _ from 'lodash';
import { LTRoomAvailableRes } from '@/types/Requests/Rooms/RoomResponses';
import {
  BookingContext,
  getLTCalculatedBookingPrice
} from '@/store/Context/Booking/BookingContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import {
  LTBookingAction,
  LTBookingReducerState
} from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';
import RenderDay from '@/components/Room/BoxBooking/DateRangeSingle/RenderDay';

interface IProps {
  setDisableBooking?: any;
  date?: DateRange;
  setDate?: any;
  focusedInput?: FocusedInputShape | null;
  setFocusedInput?: any;
}
const DateRangeVertical: FC<IProps> = (props) => {
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
  const { setDisableBooking, date, setDate, focusedInput, setFocusedInput } = props;
  const { router } = useContext(GlobalContext);
  const { id } = router.query;
  const availableDates = useSelector<ReducersList, LTRoomAvailableRes>(
    (state) => state.ltroomPage.availableDates
  );
  const { movein, moveout } = useSelector<ReducersList, LTBookingReducerState>(
    (state) => state.ltBooking
  );
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();

  useEffect(() => {
    dispatch({
      type: 'setMoveIn',
      payload: null
    });

    dispatch({
      type: 'setMoveOut',
      payload: null
    });
  }, []);

  useEffect(() => {
    setDisableBooking(!!date.startDate && !!date.endDate);
  }, [date]);

  const onFocusChange = (focus: FocusedInputShape | null) => {
    setFocusedInput(focus || 'startDate');
  };

  // const [maxDate, setMaxDate] = useState<string | undefined>(undefined);

  const useCheckDate = (date: DateRange) => {
    // console.log('useCheckDate');

    useEffect(() => {
      if (!!date.startDate && !!date.endDate) {
        if (
          date.startDate.format(DEFAULT_DATE_FORMAT) === date.endDate.format(DEFAULT_DATE_FORMAT)
        ) {
          dispatch({
            type: 'setMoveIn',
            payload: date.startDate.format(DEFAULT_DATE_FORMAT)
          });

          dispatch({
            type: 'setMoveOut',
            payload: date.startDate.format(DEFAULT_DATE_FORMAT)
          });
        } else {
          dispatch({
            type: 'setMoveIn',
            payload: date.startDate.format(DEFAULT_DATE_FORMAT)
          });

          dispatch({
            type: 'setMoveOut',
            payload: date.endDate.format(DEFAULT_DATE_FORMAT)
          });
        }

        getLTCalculatedBookingPrice(
          id,
          date.startDate.format(DEFAULT_DATE_FORMAT),
          date.endDate.format(DEFAULT_DATE_FORMAT)
        ).then((data) =>
          dispatch({
            type: 'setLTBookingPriceCalculate',
            payload: data
          })
        );
      }
    }, [date]);

    return {};
  };
  const {} = useCheckDate(date);
  useEffect(() => {
    console.log(focusedInput);
  }, [focusedInput]);

  // useEffect(() => {
  //   if (date.startDate) {
  //     let dateMax = _.find(
  //       availableDates.move_in,
  //       (dateBlock) => moment(dateBlock.date).diff(date.startDate) > 0
  //     );
  //     setMaxDate(dateMax);
  //   }
  // }, [date.startDate]);

  const onDatesChange = (dateChanged: DateRange) => {
    setDate(dateChanged);
  };

  const isDayBlocked = (day: Moment) => {
    let arrayAvailableDates = availableDates.move_in.map((dateBlock) => dateBlock.date);
    // console.log('arrayAvailableDates', arrayAvailableDates);
    let isBlocked;
    if (focusedInput == 'startDate') {
      if (date.endDate == null) {
        // console.log('day', day.format(DEFAULT_DATE_FORMAT));
        isBlocked = _.indexOf(arrayAvailableDates, day.format(DEFAULT_DATE_FORMAT)) == -1;
      }
    } else {
      isBlocked = false;
    }

    // console.log('isblocked', isBlocked);

    // let isBookingHour = bookingType === 1;

    if (focusedInput === 'endDate' && !!date.startDate) {
      // let onlyOneDay = isBookingHour && checkOnlyOneDay;
      let pastDayBlocked = day.diff(date.startDate, 'days') < 0;
      // let chainBlocked = maxDate ? day.diff(moment(maxDate), 'days') > 0 : false;
      return pastDayBlocked || isBlocked;
    }

    return isBlocked;
  };

  const isOutsideRange = (day: Moment) => day.diff(moment(), 'days') < 0;

  const _renderDayContents = (day: Moment) => <RenderDay day={day} />;

  return useMemo(
    () => (
      <DayPickerRangeController
        // isRTL={false}
        daySize={60}
        orientation="verticalScrollable"
        minimumNights={30}
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
        isDayBlocked={isDayBlocked}
        isOutsideRange={isOutsideRange}
        renderDayContents={_renderDayContents}
        numberOfMonths={3}
      />
    ),
    [date]
  );
};

export default memo(DateRangeVertical);
