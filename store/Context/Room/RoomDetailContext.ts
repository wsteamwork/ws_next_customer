import { createContext, Dispatch, Reducer } from 'react';
import { RoomIndexRes, RoomScheduleRes } from '@/types/Requests/Rooms/RoomResponses';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import _ from 'lodash';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { updateObject } from '../utility';
import { NextRouter } from 'next/router';

export const RoomDetailsContext = createContext<IRoomDetailsContext>(null as IRoomDetailsContext);

export interface IRoomDetailsContext {
  state: RoomDetailsState;
  dispatch: Dispatch<RoomDetailsAction>;
}

export type RoomDetailsState = {
  readonly room: RoomIndexRes | null;
  readonly roomRecommend: RoomIndexRes[] | [];
  readonly schedule: string[];
  readonly bookingType: number;
  readonly price?: BookingPriceCalculatorRes;
};

export type RoomDetailsAction =
  | { type: 'setDetails'; room: RoomIndexRes; recommend: RoomIndexRes[]; schedule: string[] }
  | { type: 'setBookingType'; bookingType: number }
  | { type: 'setPrice'; price: BookingPriceCalculatorRes };

export const RoomDetailsStateInit: RoomDetailsState = {
  room: null,
  roomRecommend: [],
  schedule: [],
  bookingType: 2
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
        roomRecommend: action.recommend
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

export const getRoom = async (idRoom: number) => {
  const res: AxiosRes<RoomIndexRes> = await axios.get(
    `rooms/${idRoom}?include=details,merchant,comforts.details,media,district,city,places.guidebook,reviews.user`
  );
  return res.data.data;
};

const getRoomRecommend = async (idRoom: number) => {
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(
    `rooms/room_recommend/${idRoom}?include=media,details,city,district`
  );
  return res.data.data;
};

const getRoomSchedule = async (id: number) => {
  const res: AxiosRes<RoomScheduleRes> = await axios.get(`rooms/schedule/${id}`);
  return res.data;
};

export const getData = (id: number, dispatch: Dispatch<RoomDetailsAction>, router: NextRouter) => {
  if (isNaN(id)) router.push('/');
  const pathName = window.location.pathname;
  let isMerchant = false;
  //console.log(window.location.pathname);
  if (pathName.indexOf('preview-room') !== -1) {
    isMerchant = true;
  }
  Promise.all([getRoom(id), getRoomSchedule(id), getRoomRecommend(id)])
    .then((res) => {
      const [room, schedule, roomRecommend] = res;
      // console.log(!isMerchant, room.status !== 1);
      if (!isMerchant && room.status !== 1) {
        router.push('/404');
      }
      dispatch({
        type: 'setDetails',
        room: room,
        recommend: roomRecommend,
        schedule: _.sortBy(schedule.data.blocks)
      });
    })
    .catch((err) => {
      console.log(err);
      router.push('/404');
    });
};
