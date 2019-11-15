import { createContext, Dispatch, Reducer } from 'react';
import _ from 'lodash';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { updateObject } from '../utility';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';

export const RoomDetailsContext = createContext<IRoomDetailsContext>(null as IRoomDetailsContext);

export interface IRoomDetailsContext {
  state: RoomDetailsState;
  dispatch: Dispatch<RoomDetailsAction>;
}

export type RoomDetailsState = {
  readonly dataCalculate: BookingPriceCalculatorRes | null;
  readonly error: string | null;
  readonly currentDate: string;
  readonly places: any;
};

export type RoomDetailsAction =
  | { type: 'setDataCalculdate'; payload: BookingPriceCalculatorRes }
  | { type: 'setError'; payload: string }
  | { type: 'setCurrentDate'; payload: string }
  | { type: 'setDataPlaces'; payload: any };

export const RoomDetailsStateInit: RoomDetailsState = {
  dataCalculate: null,
  error: null,
  currentDate: moment()
    .add(5, 'month')
    .format(DEFAULT_DATE_FORMAT),
  places: null
};

export const RoomDetailsReducer: Reducer<RoomDetailsState, RoomDetailsAction> = (
  state: RoomDetailsState,
  action: RoomDetailsAction
): RoomDetailsState => {
  switch (action.type) {
    case 'setDataCalculdate':
      return updateObject<RoomDetailsState>(state, { dataCalculate: action.payload });
    case 'setError':
      return updateObject<RoomDetailsState>(state, { error: action.payload });
    case 'setCurrentDate':
      return updateObject<RoomDetailsState>(state, { currentDate: action.payload });
    case 'setDataPlaces':
      return updateObject<any>(state, { places: action.payload });
    default:
      return state;
  }
};
