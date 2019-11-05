import { updateObject } from '@/store/Context/utility';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { AxiosRes, Pagination } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { Dispatch, Reducer } from 'redux';

export type RoomListReducerState = {
  readonly roomlist: LTRoomIndexRes[];
  error: boolean;
};

export const init: RoomListReducerState = {
  roomlist: [],
  error: false
};

export type RoomListReducerAction =
  | { type: 'setRoomList'; payload: LTRoomIndexRes[]; meta?: Pagination | null }
  | { type: 'setError'; payload: boolean };

export const roomListReducer: Reducer<RoomListReducerState, RoomListReducerAction> = (
  state: RoomListReducerState = init,
  action: RoomListReducerAction
): RoomListReducerState => {
  switch (action.type) {
    case 'setRoomList':
      return updateObject(state, { roomlist: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getRoomList = async (
  dispatch: Dispatch<RoomListReducerAction>,
  initLanguage: string = 'vi',
  token?: string
): Promise<any> => {
  const headers = token && {
    headers: {
      'Accept-Language': initLanguage
    }
  };
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms`, headers);
    const roomlist = res.data.data;
    if (roomlist) {
      dispatch({ type: 'setRoomList', payload: roomlist });
    }
    return roomlist;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
