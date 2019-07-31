import { createContext, Dispatch, Reducer, useEffect, useMemo, useState, useContext } from 'react';
import { RoomIndexRes, RoomScheduleRes } from '@/types/Requests/Rooms/RoomResponses';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import _ from 'lodash';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { updateObject } from '../utility';
import { NextRouter } from 'next/router';
import { PriceByDayRes, BodyRequestPriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { GlobalContext } from '../GlobalContext';
import { BookingPriceCalculatorReq } from '@/types/Requests/Booking/BookingRequests';
import qs from 'query-string';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';

export const RoomDetailsContext = createContext<IRoomDetailsContext>(null as IRoomDetailsContext);

export interface IRoomDetailsContext {
  state: RoomDetailsState;
  dispatch: Dispatch<RoomDetailsAction>;
}

export type RoomDetailsState = {
  readonly room: RoomIndexRes | null;
  readonly roomRecommend: RoomIndexRes[];
  readonly schedule: string[];
  readonly bookingType: number;
  readonly dataCalculate: BookingPriceCalculatorRes | null;
  readonly priceByDay: PriceByDayRes[];
};

export type RoomDetailsAction =
  | {
      type: 'setDetails';
      room: RoomIndexRes;
      recommend: RoomIndexRes[];
      schedule: string[];
      priceByDay: PriceByDayRes[];
    }
  | { type: 'setBookingType'; bookingType: number }
  | { type: 'setDataCalculdate'; payload: BookingPriceCalculatorRes }
  | { type: 'updatePriceDay'; payload: PriceByDayRes[] };

export const RoomDetailsStateInit: RoomDetailsState = {
  room: null,
  roomRecommend: [],
  schedule: [],
  bookingType: 2,
  priceByDay: [],
  dataCalculate: null
};

export const RoomDetailsReducer: Reducer<RoomDetailsState, RoomDetailsAction> = (
  state: RoomDetailsState,
  action: RoomDetailsAction
): RoomDetailsState => {
  switch (action.type) {
    case 'setDetails':
      return updateObject<RoomDetailsState>(state, {
        room: action.room,
        schedule: action.schedule,
        roomRecommend: action.recommend,
        priceByDay: action.priceByDay
      });
    case 'setBookingType':
      return updateObject<RoomDetailsState>(state, { bookingType: action.bookingType });
    case 'setDataCalculdate':
      return updateObject<RoomDetailsState>(state, { dataCalculate: action.payload });
    case 'updatePriceDay':
      return updateObject<RoomDetailsState>(state, {
        priceByDay: action.payload
      });
    default:
      return state;
  }
};

export const getRoom = async (idRoom: any): Promise<RoomIndexRes> => {
  const res: AxiosRes<RoomIndexRes> = await axios.get(
    `rooms/${idRoom}?include=details,merchant,comforts.details,media,district,city,places.guidebook,reviews.user`
  );

  return res.data.data;
};

const getRoomRecommend = async (idRoom: any): Promise<RoomIndexRes[]> => {
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(
    `rooms/room_recommend/${idRoom}?include=media,details,city,district`
  );

  return res.data.data;
};

const getRoomSchedule = async (idRoom: any): Promise<string[]> => {
  const res: AxiosRes<RoomScheduleRes> = await axios.get(`rooms/schedule/${idRoom}`);
  return res.data.data.blocks;
};

export const getPriceByDay = async (
  idRoom: any,
  date_start: string = moment().format(DEFAULT_DATE_FORMAT),
  date_end: string = moment()
    .add(12, 'month')
    .endOf('month')
    .format(DEFAULT_DATE_FORMAT)
): Promise<PriceByDayRes[]> => {
  const query: BodyRequestPriceByDayRes = { date_start, date_end };

  const res: AxiosRes<PriceByDayRes[]> = await axios.get(
    `rooms/calendar-props/${idRoom}?${qs.stringify(query)}`
  );

  return res.data.data;
};

export const getDataRoom = async (dispatch: Dispatch<RoomDetailsAction>, router: NextRouter) => {
  const { id } = router.query;

  try {
    const res = await Promise.all([
      getRoom(id),
      getRoomRecommend(id),
      getRoomSchedule(id),
      getPriceByDay(id)
    ]);

    const [room, recommend, schedule, priceByDay] = res;

    dispatch({ type: 'setDetails', room, recommend, schedule, priceByDay });
  } catch (error) {
    console.log(error);
  }
};

type ReturnCalculate = {
  numberDay: number;
  checkData: boolean;
  loading: boolean;
  dataCalculate: BookingPriceCalculatorRes;
};

export const useCalculatePrice = (): ReturnCalculate => {
  const startDate = useSelector<ReducersList, string | null>(
    (state) => state.searchFilter.startDate
  );
  const endDate = useSelector<ReducersList, string | null>((state) => state.searchFilter.endDate);
  const guestsCount = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const bookingType = useSelector<ReducersList, number>((state) => state.searchFilter.bookingType);
  const [loading, setLoading] = useState(false);
  const { router } = useContext(GlobalContext);
  const { dispatch, state } = useContext(RoomDetailsContext);
  const { dataCalculate } = state;

  const numberDay: number = useMemo<number>(() => {
    if (startDate && endDate) {
      const startValue = moment(startDate);
      const endValue = moment(endDate);

      return Math.abs(startValue.diff(endValue, 'days'));
    }
    if (startDate === endDate) {
      return 1;
    }

    return 0;
  }, [endDate, startDate]);

  const checkData = useMemo<boolean>(() => {
    return !!startDate && !!endDate && guestsCount !== 0;
  }, [endDate, startDate, guestsCount]);

  useEffect(() => {
    checkData && getcalculatePrice();
  }, [checkData, endDate, startDate, guestsCount]);

  const getcalculatePrice = async () => {
    setLoading(true);

    const body: BookingPriceCalculatorReq = {
      room_id: parseInt(router.query.id as string, 10),
      checkin: startDate,
      checkout: endDate,
      coupon: '',
      number_of_guests: guestsCount,
      booking_type: bookingType
    };

    try {
      const res: AxiosRes<BookingPriceCalculatorRes> = await axios.post(
        'bookings/calculate-price-with-specific-day-price',
        body
      );

      setLoading(false);
      dispatch({ type: 'setDataCalculdate', payload: res.data.data });
    } catch (error) {
      setLoading(false);
      dispatch({ type: 'setDataCalculdate', payload: null });
    }
  };

  return { numberDay, checkData, loading, dataCalculate };
};
