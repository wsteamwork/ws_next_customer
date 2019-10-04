import { updateObject } from '@/store/Context/utility';
import { Dispatch, Reducer } from 'redux';

export type CreateListingState = {
  readonly leaseType: number;
  readonly accommodationType: number;
  readonly stayWithHost: number;
  readonly guestRecommendation: number;
  readonly maxGuest: number;
  readonly bedRoomsNumber: number;
  readonly address: string;
  readonly building: string;
  readonly city_id: number;
  readonly district_id: number;
  readonly latitude: string;
  readonly longitude: string;
};

export type CreateListingActions =
  | { type: 'SET_LEASE_TYPE'; payload: number }
  | { type: 'SET_ACCOMMODATION_TYPE'; payload: number }
  | { type: 'SET_STAY_WITH_HOST'; payload: number }
  | { type: 'SET_GUEST_RECOMMENDATION'; payload: number }
  | { type: 'SET_MAX_GUEST'; payload: number }
  | { type: 'SET_BEDROOMS_NUMBER'; payload: number }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_BUILDING'; payload: string }
  | { type: 'SET_CITY_ID'; payload: number }
  | { type: 'SET_DISTRICT_ID'; payload: number }
  | { type: 'SET_LATITUDE'; payload: string }
  | { type: 'SET_LONGITUDE'; payload: string };

const init: CreateListingState = {
  leaseType: null,
  accommodationType: null,
  stayWithHost: null,
  guestRecommendation: null,
  maxGuest: null,
  bedRoomsNumber: 1,
  address: '',
  building: '',
  city_id: null,
  district_id: null,
  latitude: '',
  longitude: ''
};

export const createListingReducer: Reducer<CreateListingState, CreateListingActions> = (
  state: CreateListingState = init,
  action: CreateListingActions
): CreateListingState => {
  switch (action.type) {
    case 'SET_LEASE_TYPE':
      return updateObject<CreateListingState>(state, { leaseType: action.payload });
    case 'SET_ACCOMMODATION_TYPE':
      return updateObject<CreateListingState>(state, { accommodationType: action.payload });
    case 'SET_STAY_WITH_HOST':
      return updateObject<CreateListingState>(state, { stayWithHost: action.payload });
    case 'SET_GUEST_RECOMMENDATION':
      return updateObject<CreateListingState>(state, { guestRecommendation: action.payload });
    case 'SET_MAX_GUEST':
      return updateObject<CreateListingState>(state, { maxGuest: action.payload });
    case 'SET_BEDROOMS_NUMBER':
      return updateObject<CreateListingState>(state, { bedRoomsNumber: action.payload });
    case 'SET_ADDRESS':
      return updateObject<CreateListingState>(state, { address: action.payload });
    case 'SET_BUILDING':
      return updateObject<CreateListingState>(state, { building: action.payload });
    case 'SET_CITY_ID':
      return updateObject<CreateListingState>(state, { city_id: action.payload });
    case 'SET_DISTRICT_ID':
      return updateObject<CreateListingState>(state, { district_id: action.payload });
    case 'SET_LATITUDE':
      return updateObject<CreateListingState>(state, { latitude: action.payload });
    case 'SET_LONGITUDE':
      return updateObject<CreateListingState>(state, { longitude: action.payload });
    default:
      return state;
  }
};

const createFirstTab = async (data: any, dispatch: Dispatch<CreateListingActions>) => {
  dispatch({ type: 'SET_LEASE_TYPE', payload: data });
  dispatch({ type: 'SET_ACCOMMODATION_TYPE', payload: data });
  dispatch({ type: 'SET_STAY_WITH_HOST', payload: data });
};
