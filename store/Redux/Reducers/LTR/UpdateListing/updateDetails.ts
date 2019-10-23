import { BedRoomReq } from '@/types/Requests/LTR/Basic/BasicRequests';
import Cookies from 'universal-cookie';
import { AxiosRes } from './../../../../../types/Requests/ResponseTemplate';
import { updateObject } from '@/store/Context/utility';
import { Dispatch, Reducer } from 'redux';
import { axios_merchant } from '@/utils/axiosInstance';

export type UpdateDetailsState = {
  readonly room_id: number;
  readonly accommodationType: number;
  readonly stayWithHost: number;
  readonly status_short_term: number;
  readonly status_long_term: number;
  readonly guestRecommendation: number;
  readonly maxGuest: number;
  readonly bedRoomsNumber: number;
  readonly bathRooms: any;
  readonly bedRooms: BedRoomReq;
  readonly error: boolean;
};

export type UpdateDetailsActions =
  | { type: 'SET_ROOM_ID'; payload: number }
  | { type: 'SET_ACCOMMODATION_TYPE'; payload: number }
  | { type: 'SET_STAY_WITH_HOST'; payload: number }
  | { type: 'SET_STATUS_SHORT_TERM'; payload: number }
  | { type: 'SET_STATUS_LONG_TERM'; payload: number }
  | { type: 'SET_GUEST_RECOMMENDATION'; payload: number }
  | { type: 'SET_MAX_GUEST'; payload: number }
  | { type: 'SET_BEDROOMS_NUMBER'; payload: number }
  | { type: 'SET_BEDROOMS'; payload: BedRoomReq }
  | { type: 'SET_BATHROOMS'; payload: any }
  | { type: 'SET_ERROR'; payload: boolean };

const init: UpdateDetailsState = {
  room_id: null,
  accommodationType: 2,
  stayWithHost: 0,
  status_short_term: 0,
  status_long_term: 0,
  guestRecommendation: 0,
  maxGuest: 0,
  bedRooms: null,
  bedRoomsNumber: 1,
  bathRooms: null,
  error: false
};

export const updateDetailsReducer: Reducer<UpdateDetailsState, UpdateDetailsActions> = (
  state: UpdateDetailsState = init,
  action: UpdateDetailsActions
): UpdateDetailsState => {
  switch (action.type) {
    case 'SET_ROOM_ID':
      return updateObject<UpdateDetailsState>(state, { room_id: action.payload });
    case 'SET_ACCOMMODATION_TYPE':
      return updateObject<UpdateDetailsState>(state, { accommodationType: action.payload });
    case 'SET_STAY_WITH_HOST':
      return updateObject<UpdateDetailsState>(state, { stayWithHost: action.payload });
    case 'SET_STATUS_SHORT_TERM':
      return updateObject<UpdateDetailsState>(state, { status_short_term: action.payload });
    case 'SET_STATUS_LONG_TERM':
      return updateObject<UpdateDetailsState>(state, { status_long_term: action.payload });
    case 'SET_GUEST_RECOMMENDATION':
      return updateObject<UpdateDetailsState>(state, { guestRecommendation: action.payload });
    case 'SET_MAX_GUEST':
      return updateObject<UpdateDetailsState>(state, { maxGuest: action.payload });
    case 'SET_BEDROOMS_NUMBER':
      return updateObject<UpdateDetailsState>(state, { bedRoomsNumber: action.payload });
    case 'SET_BEDROOMS':
      return updateObject<UpdateDetailsState>(state, { bedRooms: action.payload });
    case 'SET_BATHROOMS':
      return updateObject<UpdateDetailsState>(state, { bathRooms: action.payload });
    case 'SET_ERROR':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getDataUpdateListing = async (
  id: any,
  dispatch: Dispatch<UpdateDetailsActions>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const listing = res.data.data;
    const room_id = listing.room_id;

    dispatch({ type: 'SET_ROOM_ID', payload: room_id });
    dispatch({ type: 'SET_ACCOMMODATION_TYPE', payload: listing.accommodation_type });
    dispatch({ type: 'SET_STAY_WITH_HOST', payload: listing.stay_with_host });
    dispatch({ type: 'SET_STATUS_SHORT_TERM', payload: listing.short_term_room.merchant_status });
    dispatch({ type: 'SET_STATUS_LONG_TERM', payload: listing.merchant_status });
    dispatch({ type: 'SET_GUEST_RECOMMENDATION', payload: listing.guests.recommendation });
    dispatch({ type: 'SET_MAX_GUEST', payload: listing.guests.max_additional_guest });
    dispatch({ type: 'SET_BEDROOMS_NUMBER', payload: listing.bedrooms.number_bedroom });
    dispatch({ type: 'SET_BEDROOMS',payload: listing.bedrooms });
    dispatch({ type: 'SET_BATHROOMS',payload: listing.bathrooms });
    return listing;
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: true });
  }
};

export const handleUpdateRentAndRoomType = async (room_id: any, option: any, checked: number) => {
  const cookies = new Cookies();
  const token = cookies.get('_token');
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios_merchant.put(
    `long-term/room/minor-update/${room_id}/${option}`,
    {
      [`${option}`]: checked
    },
    headers
  );

  return response.data;
};
