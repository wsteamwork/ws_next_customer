import { createContext, Dispatch, Reducer } from 'react';

import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import {
  LTBookingPriceCalculatorRes,
  LTBookingIndexRes
} from '@/types/Requests/Booking/BookingResponses';
import {
  LTBookingReq,
  LTBookingPriceCalculatorReq,
  LTBookingCreateReq
} from '@/types/Requests/Booking/BookingRequests';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import { ReducresActions } from '../..';
import { getLTRoom } from '../LTRoom/ltroomReducer';

export type LTBookingReducerState = {
  readonly movein: string | null;
  readonly moveout: string | null;
  readonly numberOfGuests: number;
  readonly LTBookingPriceCalculate: LTBookingPriceCalculatorRes;
};

export type LTBookState = {
  readonly LTBookingPriceCalculate: LTBookingPriceCalculatorRes;
};

export type LTBookingAction =
  | { type: 'setMoveIn'; payload: string }
  | { type: 'setMoveOut'; payload: string }
  | { type: 'setNumberOfGuests'; payload: number }
  | { type: 'setLTBookingPriceCalculate'; payload: LTBookingPriceCalculatorRes };

export const init: LTBookingReducerState = {
  movein: moment().format(DEFAULT_DATE_FORMAT),
  moveout: '',
  numberOfGuests: 1,
  LTBookingPriceCalculate: null
};

export const ltBookingReducer: Reducer<LTBookingReducerState, LTBookingAction> = (
  state: LTBookingReducerState = init,
  action: LTBookingAction
): LTBookingReducerState => {
  switch (action.type) {
    case 'setMoveIn':
      return updateObject(state, { movein: action.payload });
    case 'setMoveOut':
      return updateObject(state, { moveout: action.payload });
    case 'setNumberOfGuests':
      return updateObject(state, { numberOfGuests: action.payload });
    case 'setLTBookingPriceCalculate':
      return updateObject(state, { LTBookingPriceCalculate: action.payload });
    default:
      return state;
  }
};

export const getLTCalculatedBookingPrice = async (
  body: LTBookingPriceCalculatorReq
): Promise<LTBookingPriceCalculatorRes> => {
  const { move_in, move_out, long_term_room_id } = body;
  const req: LTBookingPriceCalculatorReq = {
    long_term_room_id: long_term_room_id,
    move_in,
    move_out
  };

  const res: AxiosRes<LTBookingPriceCalculatorRes> = await axios.post(
    `long-term-bookings/price-calculator`,
    req
  );

  return res.data.data;
};

export const getLTBookingData = async (
  query: any,
  dispatch: Dispatch<ReducresActions>,
  initLanguage: string = 'vi'
): Promise<Omit<LTBookState, 'error'>> => {
  const { room_id } = query;
  const body = {
    move_in: query.move_in,
    move_out: query.move_out,
    long_term_room_id: parseInt(query.long_term_room_id, 10)
  } as LTBookingPriceCalculatorReq;

  try {
    const res = await Promise.all([
      // getLTRoom(room_id, initLanguage),
      getLTCalculatedBookingPrice(body)
    ]);

    const [LTBookingPriceCalculate] = res;

    dispatch({ type: 'setLTBookingPriceCalculate', payload: LTBookingPriceCalculate });
    dispatch({ type: 'setError', payload: false });

    return { LTBookingPriceCalculate };
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }

  // const res = Promise.all([])
};

export const createLTBooking = async (req: LTBookingCreateReq): Promise<LTBookingIndexRes> => {
  const res: AxiosRes<LTBookingIndexRes> = await axios.post('long-term-bookings', req);
  // console.log(res.data.data);
  return res.data.data;
};
