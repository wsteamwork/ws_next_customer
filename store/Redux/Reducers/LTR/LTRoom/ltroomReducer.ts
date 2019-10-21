import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import moment from 'moment';
import qs from 'query-string';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { updateObject } from '@/store/Context/utility';
import { Reducer, Dispatch } from 'redux';
import { ParsedUrlQuery } from 'querystring';
import { ReducresActions } from '@/store/Redux/Reducers';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';

export type LTRoomReducerState = {
  readonly room: LTRoomIndexRes | null;
  readonly error: boolean;
};

export type LTRoomReducerAction =
  | { type: 'setLTRoom'; payload: LTRoomIndexRes }
  | { type: 'setErrorSSRLTRoompage'; payload: boolean };

export const init: LTRoomReducerState = {
  room: null,
  error: false
};

export const ltroomReducer: Reducer<LTRoomReducerState, LTRoomReducerAction> = (
  state: LTRoomReducerState = init,
  action: LTRoomReducerAction
): LTRoomReducerState => {
  switch (action.type) {
    case 'setLTRoom':
      return updateObject(state, { room: action.payload });
    case 'setErrorSSRLTRoompage':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getLTRoom = async (idRoom: any, initLanguage: string = 'vi'): Promise<LTRoomIndexRes> => {
  const res: AxiosRes<LTRoomIndexRes> = await axios.get(
    `long-term-rooms/${idRoom}?include=city,district,merchant`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};
//
// const getRoomRecommend = async (
//   idRoom: any,
//   initLanguage: string = 'vi'
// ): Promise<RoomIndexRes[]> => {
//   const res: AxiosRes<RoomIndexRes[]> = await axios.get(
//     `rooms/room_recommend/${idRoom}?include=media,details,city,district`,
//     { headers: { 'Accept-Language': initLanguage } }
//   );
//
//   return res.data.data;
// };
//
// export const getRoomSchedule = async (
//   idRoom: any,
//   initLanguage: string = 'vi'
// ): Promise<string[]> => {
//   const res: AxiosRes<RoomScheduleRes> = await axios.get(`rooms/schedule/${idRoom}`, {
//     headers: { 'Accept-Language': initLanguage }
//   });
//   return res.data.data.blocks;
// };
//
// export const getPriceByDay = async (
//   idRoom: any,
//   date_start: string = moment().format(DEFAULT_DATE_FORMAT),
//   date_end: string = moment()
//     .add(6, 'month')
//     .endOf('month')
//     .format(DEFAULT_DATE_FORMAT),
//   initLanguage: string = 'vi'
// ): Promise<PriceByDayRes[]> => {
//   const query: BodyRequestPriceByDayRes = { date_start, date_end };
//
//   const res: AxiosRes<PriceByDayRes[]> = await axios.get(
//     `rooms/calendar-props/${idRoom}?${qs.stringify(query)}`,
//     { headers: { 'Accept-Language': initLanguage } }
//   );
//
//   return res.data.data;
// };
//
export const getDataLTRoom = async (
  dispatch: Dispatch<ReducresActions>,
  query: ParsedUrlQuery,
  initLanguage: string = 'vi'
): Promise<Omit<LTRoomReducerState, 'error'>> => {
  const { id } = query;
  try {
    const res = await Promise.all([
      getLTRoom(id, initLanguage),
    ]);

    const [room] = res;

    dispatch({ type: 'setLTRoom', payload: room });
    dispatch({ type: 'setErrorSSRLTRoompage', payload: false });
    console.log(res);
    return { room };
  } catch (error) {
    dispatch({ type: 'setErrorSSRLTRoompage', payload: true });
    // console.log(error.response);
    console.log(error);
  }
};
