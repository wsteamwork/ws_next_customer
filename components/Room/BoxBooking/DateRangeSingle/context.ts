import { useState, useContext, Dispatch, memo, useEffect } from 'react';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { useDispatch, useSelector } from 'react-redux';
import { SearchFilterAction, DateRange } from '@/store/Redux/Reducers/searchFilter';
import { ReducersList } from '@/store/Redux/Reducers';
import moment, { Moment } from 'moment';
import { FocusedInputShape } from 'react-dates';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { DEFAULT_DATE_TIME_FORMAT, DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import * as _ from 'lodash';
interface DataChangePriceByDay {
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

interface ReturnUseDateRange {
  date: DateRange;
  onDatesChange: (arg: DateRange) => void;
  onClose?: (final: DateRange) => void;
  onFocusChange: (arg: FocusedInputShape | null) => void;
  isDayBlocked?: (day: Moment) => boolean;
  isOutsideRange?: (day: Moment) => boolean;
  onNextMonthClick?: (newCurrentMonth: Moment) => void;
  focused?: FocusedInputShape | null;
}

export const useDateRange = (): ReturnUseDateRange => {
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
    if (date.startDate) {
      dispatch({
        type: 'SET_START_DATE',
        payload: date.startDate.format(DEFAULT_DATE_TIME_FORMAT)
      });
    }

    if (date.endDate) {
      dispatch({
        type: 'SET_END_DATE',
        payload: date.endDate.format(DEFAULT_DATE_TIME_FORMAT)
      });
    }
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
        .add(12, 'month')
        .endOf('month')
        .subtract(1, 'days')
        .diff(day, 'days') < 0;

    let isBookingHour = false;

    if (focused === 'endDate' && !!date.startDate) {
      let checkOnlyOneDay =
        day.format(DEFAULT_DATE_FORMAT) !== date.startDate.format(DEFAULT_DATE_FORMAT);

      let onlyOneDay = isBookingHour && checkOnlyOneDay;
      let pastDayBlocked = day.diff(date.startDate, 'days') < 0;
      let chainBlocked = maxDate ? day.diff(moment(maxDate), 'days') > 0 : false;
      return pastDayBlocked || isBlocked || onlyOneDay || chainBlocked;
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
    focused
  };
};
