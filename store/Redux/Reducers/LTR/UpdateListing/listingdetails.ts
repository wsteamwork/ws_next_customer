import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import { Reducer, Dispatch } from 'redux';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';

export type ListingDetailsReducerState = {
  listing: LTRoomIndexRes;
  error: boolean;
};

export const init: ListingDetailsReducerState = {
  listing: null,
  error: false
};

export type ListingDetailsReducerAction =
  | { type: 'setListing'; payload: LTRoomIndexRes }
  | { type: 'setError'; payload: boolean };

export const listingDetailsReducer: Reducer<ListingDetailsReducerState, ListingDetailsReducerAction> = (
  state: ListingDetailsReducerState = init,
  action: ListingDetailsReducerAction
): ListingDetailsReducerState => {
  switch (action.type) {
    case 'setListing':
      return updateObject(state, { listing: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getListingDetails = async (
  id: any,
  dispatch: Dispatch<ListingDetailsReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const listing = res.data.data;
    if (listing) {
      dispatch({ type: 'setListing', payload: listing });
    }
    return listing;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};


