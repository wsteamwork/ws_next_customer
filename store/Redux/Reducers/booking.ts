import { Moment } from 'moment';
import { Reducer } from 'redux';
import { updateObject } from '@/store/Context/utility';
import moment from 'moment';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';

export type DateRange = {
  startDate: Moment | null;
  endDate: Moment | null;
};

export type BookingState = {
  readonly roomID: number | null;
  readonly numberOfGuest: number;
  readonly bookingType: number;
  readonly startDate: string | null;
  readonly endDate: string | null;
  readonly checkInHour: string | null;
  readonly checkOutHour: string | null;
  readonly availableCheckoutTime: string[];
};

export type BookingAction =
  | { type: 'SET_CHECK_IN'; payload: string }
  | { type: 'SET_CHECK_OUT'; payload: string }
  | { type: 'SET_CHECK_IN_HOUR'; payload: string }
  | { type: 'SET_CHECK_OUT_HOUR'; payload: string }
  | { type: 'SET_BOOKING_TYPE'; payload: number }
  | { type: 'SET_NUMBER_OF_GUEST'; payload: number }
  | { type: 'SET_ROOM_ID'; payload: number }
  | { type: 'SET_AVAILABLE_CHECKOUT'; payload: string[] };

const init: BookingState = {
  roomID: null,
  numberOfGuest: 1,
  bookingType: 2,
  startDate: moment().format(DEFAULT_DATE_TIME_FORMAT),
  endDate: null,
  checkInHour: null,
  checkOutHour: null,
  availableCheckoutTime: []
};

const reducer: Reducer<BookingState, BookingAction> = (
  state: BookingState = init,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case 'SET_BOOKING_TYPE':
      return updateObject(state, { bookingType: action.payload });
    case 'SET_CHECK_IN':
      return updateObject(state, { startDate: action.payload });
    case 'SET_CHECK_OUT':
      return updateObject(state, { endDate: action.payload });
    case 'SET_CHECK_IN_HOUR':
      return updateObject(state, { checkInHour: action.payload });
    case 'SET_CHECK_OUT_HOUR':
      return updateObject(state, { checkOutHour: action.payload });
    case 'SET_NUMBER_OF_GUEST':
      return updateObject(state, { numberOfGuest: action.payload });
    case 'SET_ROOM_ID':
      return updateObject(state, { roomID: action.payload });
    case 'SET_AVAILABLE_CHECKOUT':
      return updateObject(state, { availableCheckoutTime: action.payload });
    default:
      return state;
  }
};

export default reducer;
