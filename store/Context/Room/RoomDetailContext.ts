import { createContext, Dispatch, Reducer } from 'react';
import { RoomIndexRes, RoomScheduleRes } from '@/types/Requests/Rooms/RoomResponses';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import _ from 'lodash';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { updateObject } from '../utility';
import { NextRouter } from 'next/router';
import { PriceByDayRes, BodyRequestPriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import moment from 'moment';

export const RoomDetailsContext = createContext<IRoomDetailsContext>(null as IRoomDetailsContext);

export const DEFAULT_FORMAT_DATE_PRICE_BY_DAY = 'YYYY-MM-DD';

export interface IRoomDetailsContext {
  state: RoomDetailsState;
  dispatch: Dispatch<RoomDetailsAction>;
}

export type RoomDetailsState = {
  readonly room: RoomIndexRes | null;
  readonly roomRecommend: RoomIndexRes[];
  readonly schedule: string[];
  readonly bookingType: number;
  readonly price?: BookingPriceCalculatorRes;
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
  | { type: 'setPrice'; price: BookingPriceCalculatorRes };

export const RoomDetailsStateInit: RoomDetailsState = {
  room: null,
  roomRecommend: [],
  schedule: [],
  bookingType: 2,
  priceByDay: []
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
      return updateObject<RoomDetailsState>(state, {
        bookingType: action.bookingType
      });
    case 'setPrice':
      return updateObject<RoomDetailsState>(state, {
        price: action.price
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

const getPriceByDay = async (idRoom: any): Promise<PriceByDayRes[]> => {
  const body: BodyRequestPriceByDayRes = {
    date_start: moment().format(DEFAULT_FORMAT_DATE_PRICE_BY_DAY),
    date_end: moment()
      .endOf('month')
      .format(DEFAULT_FORMAT_DATE_PRICE_BY_DAY)
  };

  const res: AxiosRes<PriceByDayRes[]> = await axios.get(`rooms/calendar-props/${idRoom}`);

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
