import { updateObject } from '@/store/Context/utility';
import { Dispatch, Reducer } from 'redux';

export type CreateListingState = {
  readonly leaseType: number;
  readonly accommodationType: number;
  readonly stayWithHost: number;
  readonly guestRecommendation: number;
  readonly maxGuest: number;
  readonly bedRoomsNumber: number;
};

export type CreateListingActions =
  | { type: 'SET_LEASE_TYPE'; payload: number }
  | { type: 'SET_ACCOMMODATION_TYPE'; payload: number }
  | { type: 'SET_STAY_WITH_HOST'; payload: number }
  | { type: 'SET_GUEST_RECOMMENDATION'; payload: number }
  | { type: 'SET_MAX_GUEST'; payload: number }
  | { type: 'SET_BEDROOMS_NUMBER'; payload: number };

const init: CreateListingState = {
  leaseType: null,
  accommodationType: null,
  stayWithHost: null,
  guestRecommendation: null,
  maxGuest: null,
  bedRoomsNumber: 1
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
    default:
      return state;
  }
};

const createFirstTab = async (data: any, dispatch: Dispatch<CreateListingActions>) => {
  dispatch({ type: 'SET_LEASE_TYPE', payload: data });
  dispatch({ type: 'SET_ACCOMMODATION_TYPE', payload: data });
  dispatch({ type: 'SET_STAY_WITH_HOST', payload: data });
};
