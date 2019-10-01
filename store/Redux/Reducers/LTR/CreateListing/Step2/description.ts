import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import { Reducer, Dispatch } from 'redux';

export type DescriptionReducerState = {
  room_id: number;
  name: string;
  description: string;
  space: string;
  rules: string;
  error: boolean;
};

export const init: DescriptionReducerState = {
  room_id: null,
  name: '',
  description: '',
  space: '',
  rules: '',
  error: false
};

export type DescriptionReducerAction =
  | { type: 'setRoomId'; payload: number }
  | { type: 'setName'; payload: string }
  | { type: 'setDescription'; payload: string }
  | { type: 'setSpace'; payload: string }
  | { type: 'setRules'; payload: string }
  | { type: 'setError'; payload: boolean };

export const descriptionReducer: Reducer<DescriptionReducerState, DescriptionReducerAction> = (
  state: DescriptionReducerState = init,
  action: DescriptionReducerAction
): DescriptionReducerState => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject(state, { room_id: action.payload });
    case 'setName':
      return updateObject(state, { name: action.payload });
    case 'setDescription':
      return updateObject(state, { description: action.payload });
    case 'setSpace':
      return updateObject(state, { space: action.payload });
    case 'setRules':
      return updateObject(state, { rules: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getDataDescription = async (
  id: any,
  dispatch: Dispatch<DescriptionReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios.get(`long-term-rooms/${id}`);
    const room_id = res.data.data.room_id;
    const about_room = res.data.data.about_room;
    dispatch({ type: 'setRoomId', payload: room_id });
    dispatch({ type: 'setName', payload: about_room ? about_room.name : '' });
    dispatch({ type: 'setDescription', payload: about_room ? about_room.description : '' });
    dispatch({ type: 'setSpace', payload: about_room ? about_room.space : '' });
    dispatch({ type: 'setRules', payload: about_room ? about_room.note : '' });
    return about_room;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
