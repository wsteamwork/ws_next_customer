import { AxiosRes, Pagination } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import Router from 'next/router';
import qs from 'query-string';
import { Dispatch, Reducer } from 'redux';

export type BookingListReducerState = {
  readonly bookingList_ST: any;
  readonly bookingList_LT: any;
  readonly meta: Pagination | null;
  error: boolean;
};

export const init: BookingListReducerState = {
  bookingList_ST: [],
  bookingList_LT: [],
  meta: null,
  error: false
};

export type BookingListReducerAction =
  | { type: 'setBookingListST'; payload: any; meta?: Pagination | null }
  | { type: 'setBookingListLT'; payload: any; meta?: Pagination | null }
  | { type: 'setMetaST'; meta: Pagination }
  | { type: 'setError'; payload: boolean };

export const bookingListReducer: Reducer<BookingListReducerState, BookingListReducerAction> = (
  state: BookingListReducerState = init,
  action: BookingListReducerAction
): BookingListReducerState => {
  switch (action.type) {
    case 'setBookingListST':
      return updateObject(state, { bookingList_ST: action.payload, meta: action.meta || null });
    case 'setBookingListLT':
      return updateObject(state, { bookingList_LT: action.payload });
    case 'setMetaST':
      return updateObject(state, { meta: action.meta });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getBookingListST = async (dispatch: Dispatch<BookingListReducerAction>): Promise<any> => {
  try {
    let params = Router.query;
    let query = {
      size: 10,
      include: 'room.details',
      page: params.page
    };
    const url = `bookings?${qs.stringify(query)}`;
    const res: any = await axios_merchant.get(url);
    const bookingListST = res.data.data;
    if (bookingListST) {
      dispatch({ type: 'setBookingListST', payload: bookingListST, meta: res.data.meta });
    }
    return bookingListST;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
