import { updateObject } from '@/store/Context/utility';
import { ReducresActions } from '@/store/Redux/Reducers';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { LTRoomAvailableRes } from '@/types/Requests/Rooms/RoomResponses';
import { axios, axios_merchant } from '@/utils/axiosInstance';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import moment from 'moment';
import { ParsedUrlQuery } from 'querystring';
import { Dispatch, Reducer } from 'redux';

export type LTRoomReducerState = {
  readonly room: LTRoomIndexRes | null;
  readonly error: boolean;
  readonly availableDates: LTRoomAvailableRes;
  readonly places?: any;
  readonly roomSameBuilding: any[];
};

export type LTRoomReducerAction =
  | { type: 'setLTRoom'; payload: LTRoomIndexRes }
  | { type: 'setErrorSSRLTRoompage'; payload: boolean }
  | { type: 'setAvailableDates'; payload: LTRoomAvailableRes }
  | { type: 'setDataPlaces'; payload: any }
  | { type: 'setRoomSameBuilding'; payload: any[] };

export const init: LTRoomReducerState = {
  room: null,
  error: false,
  availableDates: null,
  places: null,
  roomSameBuilding: []
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
    case 'setAvailableDates':
      return updateObject(state, { availableDates: action.payload });
    case 'setDataPlaces':
      return updateObject<any>(state, { places: action.payload });
    case 'setRoomSameBuilding':
      return updateObject(state, { roomSameBuilding: action.payload });
    default:
      return state;
  }
};

export const getLTRoom = async (
  idRoom: any,
  initLanguage: string = 'en'
): Promise<LTRoomIndexRes> => {
  const res: AxiosRes<LTRoomIndexRes> = await axios.get(
    `long-term-rooms/${idRoom}?include=city,district,merchant`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

export const getLTRoomOfMerchant = async (
  idRoom: any,
  initLanguage: string = 'en'
): Promise<LTRoomIndexRes> => {
  const res: AxiosRes<LTRoomIndexRes> = await axios_merchant.get(
    `long-term-rooms/${idRoom}?include=city,district,merchant`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

export const getRoomAvailableDate = async (
  idRoom: any,
  initLanguage: string = 'en',
  date_start: string = moment().format(DEFAULT_DATE_FORMAT)
): Promise<LTRoomAvailableRes> => {
  const res: AxiosRes<LTRoomAvailableRes> = await axios.get(
    `long-term-rooms/available-dates/${idRoom}`,
    {
      data: {
        move_in: date_start
      },
      headers: { 'Accept-Language': initLanguage }
    }
  );
  return res.data.data;
};

export const getRoomSameBuilding = async (
  buildingId: any
  // initLanguage: string = 'en'
): Promise<any> => {
  const res: AxiosRes<any> = await axios.get(`long-term-rooms?building_id=${buildingId}`);
  return res.data;
};
//
// export const getPriceByDay = async (
//   idRoom: any,
//   date_start: string = moment().format(DEFAULT_DATE_FORMAT),
//   date_end: string = moment()
//     .add(6, 'month')
//     .endOf('month')
//     .format(DEFAULT_DATE_FORMAT),
//   initLanguage: string = 'en'
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
  initLanguage: string = 'en'
): Promise<Omit<LTRoomReducerState, 'error' | 'roomSameBuilding'>> => {
  const { id } = query;
  try {
    const res = await Promise.all([
      getLTRoom(id, initLanguage),
      getRoomAvailableDate(id, initLanguage)
    ]);

    const [room, availableDates] = res;

    dispatch({ type: 'setLTRoom', payload: room });
    dispatch({ type: 'setAvailableDates', payload: availableDates });
    dispatch({ type: 'setErrorSSRLTRoompage', payload: false });
    // console.log(res);
    return { room, availableDates };
  } catch (error) {
    dispatch({ type: 'setErrorSSRLTRoompage', payload: true });
    // console.log(error.response);
    // console.log(error);
  }
};
