import Cookies from 'universal-cookie';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant} from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import { Reducer, Dispatch } from 'redux';

export type AmenitiesReducerState = {
  room_id: number;
  amentitiesList: any;
  common: number[];
  livingrooms: number[];
  bedrooms: number[];
  kitchens: number[];
  bathrooms: number[];
  entertainment: number[];
  facilities: number[];
  others: number[];
  error: boolean;
};

export const init: AmenitiesReducerState = {
  room_id: null,
  amentitiesList: null,
  common: [], 
  livingrooms: [],
  bedrooms: [],
  kitchens: [],
  bathrooms: [],
  entertainment: [],
  facilities: [],
  others: [],
  error: false
};

export type AmenitiesReducerAction =
  | { type: 'setRoomId'; payload: number }
  | { type: 'setCommon'; payload: number[] }
  | { type: 'setAmenitiesList'; payload: any }
  | { type: 'setLivingRooms'; payload: number[] }
  | { type: 'setBedRooms'; payload: number[] }
  | { type: 'setKitChens'; payload: number[] }
  | { type: 'setBathRooms'; payload: number[] }
  | { type: 'setEntertainment'; payload: number[] }
  | { type: 'setFacilities'; payload: number[] }
  | { type: 'setOthers'; payload: number[] }
  | { type: 'setError'; payload: boolean };

export const amenitiesReducer: Reducer<AmenitiesReducerState, AmenitiesReducerAction> = (
  state: AmenitiesReducerState = init,
  action: AmenitiesReducerAction
): AmenitiesReducerState => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject(state, { room_id: action.payload });
    case 'setAmenitiesList':
      return updateObject(state, { amentitiesList: action.payload });
    case 'setCommon':
      return updateObject(state, { common: action.payload });
    case 'setLivingRooms':
      return updateObject(state, { livingrooms: action.payload });
    case 'setBedRooms':
      return updateObject(state, { bedrooms: action.payload });
    case 'setKitChens':
      return updateObject(state, { kitchens: action.payload }); 
    case 'setBathRooms':
      return updateObject(state, { bathrooms: action.payload });
    case 'setEntertainment':
      return updateObject(state, { entertainment: action.payload });
    case 'setFacilities':
      return updateObject(state, { facilities: action.payload }); 
    case 'setOthers':
      return updateObject(state, { others: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getDataAmenities = async (
  id: any,
  dispatch: Dispatch<AmenitiesReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const room_id = res.data.data.room_id;
    const amenities = res.data.data.comforts;
    if(amenities) {
      console.log('amenities',amenities.facilities.map(item => item.id))
      dispatch({ type: 'setRoomId', payload: room_id });
      // dispatch({ type: 'setCommon', payload: amenities.common.map(item => item.id) });
      dispatch({ type: 'setLivingRooms', payload: amenities.livingrooms.map(item => item.id) });
      dispatch({ type: 'setBedRooms', payload: amenities.bedrooms.map(item => item.id) });
      dispatch({ type: 'setKitChens', payload: amenities.kitchens.map(item => item.id) });
      dispatch({ type: 'setBathRooms', payload: amenities.bathrooms.map(item => item.id) });
      dispatch({ type: 'setEntertainment', payload: amenities.entertainment.map(item => item.id) });
      dispatch({ type: 'setFacilities', payload: amenities.facilities.map(item => item.id) });
      dispatch({ type: 'setOthers', payload: amenities.others.map(item => item.id) });
    }
    return amenities;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};

export const getAmenitiesList = async (
  dispatch: Dispatch<AmenitiesReducerAction>,
) => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get('comforts');
    dispatch({ type: 'setAmenitiesList', payload: res.data });
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};


