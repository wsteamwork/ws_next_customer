import { useState, useContext, Dispatch, memo, useEffect, useMemo } from 'react';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from '@/store/Redux/Reducers/Search/searchFilter';
import { ReducersList } from '@/store/Redux/Reducers';
import moment, { Moment } from 'moment';
import { FocusedInputShape } from 'react-dates';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { DEFAULT_DATE_TIME_FORMAT, DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import * as _ from 'lodash';
import { BookingAction } from '@/store/Redux/Reducers/Booking/booking';
export interface DataChangePriceByDay {
  [key: string]: PriceByDayRes;
}

export const changeDataPriceByDay = (data: PriceByDayRes[]): DataChangePriceByDay => {
  return data.reduce((a, b) => {
    if (!a[b.date]) {
      a[b.date] = b;
    }
    return a;
  }, {});
};

const useCheckDate = (date: DateRange, dateSingle: Moment) => {
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);
  const dispatch = useDispatch<Dispatch<BookingAction>>();

  useEffect(() => {
    if (bookingType === 1 && !!dateSingle) {
      dispatch({
        type: 'SET_CHECK_IN',
        payload: dateSingle.format(DEFAULT_DATE_FORMAT)
      });

      dispatch({
        type: 'SET_CHECK_OUT',
        payload: dateSingle.format(DEFAULT_DATE_FORMAT)
      });
    } else if (!!date.startDate && !!date.endDate) {
      if (date.startDate.format(DEFAULT_DATE_FORMAT) === date.endDate.format(DEFAULT_DATE_FORMAT)) {
        dispatch({
          type: 'SET_CHECK_IN',
          payload: date.startDate.format(DEFAULT_DATE_FORMAT)
        });

        dispatch({
          type: 'SET_CHECK_OUT',
          payload: date.startDate.format(DEFAULT_DATE_FORMAT)
        });
      } else {
        dispatch({
          type: 'SET_CHECK_IN',
          payload: date.startDate.format(DEFAULT_DATE_FORMAT)
        });

        dispatch({
          type: 'SET_CHECK_OUT',
          payload: date.endDate.format(DEFAULT_DATE_FORMAT)
        });
      }
    }
  }, [bookingType, date, dateSingle]);

  return {};
};

interface ReturnUseDateRange {
  date: DateRange;
  onDatesChange?: (arg: DateRange) => void;
  onChangeDateSingle?: (date: Moment) => void;
  dateSingle?: Moment;
  onClose?: (final: DateRange) => void;
  onFocusChange: (arg: FocusedInputShape | null) => void;
  isDayBlocked?: (day: Moment) => boolean;
  isOutsideRange?: (day: Moment) => boolean;
  onNextMonthClick?: (newCurrentMonth: Moment) => void;
  focused?: FocusedInputShape | null;
}

export const useDateRange = (): ReturnUseDateRange => {
  const dateStart = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const dateEnd = useSelector<ReducersList, string | null>((state) => state.booking.endDate);
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);
  const [date, setDate] = useState<DateRange>({
    startDate: dateStart ? moment(dateStart) : moment(),
    endDate: dateEnd ? moment(dateEnd) : null
  });

  const [dateSingle, setDateSingle] = useState<Moment | null>(
    dateStart ? moment(dateStart) : moment()
  );

  const onChangeDateSingle = (date: Moment) => {
    setDateSingle(date);
  };

  const {} = useCheckDate(date, dateSingle);

  useEffect(() => {
    if (!!dateStart) {
      setDate({ ...date, startDate: moment(dateStart) });
    }

    if (!!dateSingle) {
      setDateSingle(moment(dateStart));
    }

    if (!!dateEnd) {
      setDate({ ...date, endDate: moment(dateEnd) });
    }
  }, [dateStart, dateEnd]);

  const [focused, setFocued] = useState<FocusedInputShape | null>(null);
  const schedule = useSelector<ReducersList, string[]>((state) => state.roomPage.schedule);

  const [maxDate, setMaxDate] = useState<string | undefined>(undefined);

  const onDatesChange = (date: DateRange) => {
    setDate(date);
  };

  const onClose = (date: DateRange) => {
    setDate(date);
  };

  const onFocusChange = (forcus: FocusedInputShape | null) => {
    setFocued(forcus);
  };

  useEffect(() => {
    if (date.startDate) {
      let dateMax = _.find(schedule, (block) => moment(block).diff(date.startDate) > 0);
      setMaxDate(dateMax);
    }
  }, [date.startDate]);

  const onNextMonthClick = async (newCurrentMonth: Moment) => {};

  const isOutsideRange = (day: Moment) => day.diff(moment(), 'days') < 0;

  const isDayBlocked = (day: Moment) => {
    let isBlocked = _.indexOf(schedule, day.format(DEFAULT_DATE_FORMAT)) !== -1;
    let is12MothNext =
      moment()
        .add(6, 'month')
        .endOf('month')
        .subtract(1, 'days')
        .diff(day, 'days') < 0;

    let isBookingHour = bookingType === 1;

    if (focused === 'endDate' && !!date.startDate) {
      let checkOnlyOneDay =
        day.format(DEFAULT_DATE_FORMAT) !== date.startDate.format(DEFAULT_DATE_FORMAT);

      let onlyOneDay = isBookingHour && checkOnlyOneDay;
      let pastDayBlocked = day.diff(date.startDate, 'days') < 0;
      let chainBlocked = maxDate ? day.diff(moment(maxDate), 'days') > 0 : false;
      return pastDayBlocked || isBlocked || onlyOneDay || chainBlocked || is12MothNext;
    }

    return isBlocked || is12MothNext;
  };

  return {
    date,
    onDatesChange,
    onClose,
    onFocusChange,
    isDayBlocked,
    isOutsideRange,
    onNextMonthClick,
    focused,
    onChangeDateSingle,
    dateSingle
  };
};
