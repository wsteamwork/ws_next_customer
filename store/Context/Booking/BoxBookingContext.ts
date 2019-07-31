import { createContext, Dispatch, Reducer } from 'react';
import { updateObject } from '../utility';
import moment from 'moment';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';

export const BoxBookingContext = createContext<IBoxBookingContext>(null as IBoxBookingContext);

export interface IBoxBookingContext {
  state: BoxBookingState;
  dispatch: Dispatch<BoxBookingAction>;
}

export type BoxBookingState = {
  readonly checkin: string | null;
  readonly checkout: string | null;
  readonly booking_type: number;
  readonly number_of_guests: number;
};

export type BoxBookingAction =
  | { type: 'SET_CHECK_IN'; payload: string }
  | { type: 'SET_CHECK_OUT'; payload: string }
  | { type: 'SET_BOOKING_TYPE'; payload: number }
  | { type: 'SET_NUMBER_OF_GUESTS'; payload: number };

export const BoxBookingStateInit: BoxBookingState = {
  checkin: moment().format(DEFAULT_DATE_TIME_FORMAT),
  checkout: '',
  booking_type: 2,
  number_of_guests: 1
};

export const BoxBookingReducer: Reducer<BoxBookingState, BoxBookingAction> = (
  state: BoxBookingState,
  action: BoxBookingAction
) => {
  switch (action.type) {
    case 'SET_CHECK_IN':
      return updateObject(state, { checkin: action.payload });
    case 'SET_CHECK_OUT':
      return updateObject(state, { checkout: action.payload });
    case 'SET_BOOKING_TYPE':
      return updateObject(state, { booking_type: action.payload });
    case 'SET_NUMBER_OF_GUESTS':
      return updateObject(state, { number_of_guests: action.payload });
    default:
      return state;
  }
};
