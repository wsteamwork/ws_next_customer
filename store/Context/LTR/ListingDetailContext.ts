import { updateObject } from '@/store/Context/utility';
import { createContext, Dispatch, Reducer } from 'react';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import Router from 'next/router';

export const ListingDetailContext = createContext<IListingDetailContext>(
  null as IListingDetailContext
);

export interface IListingDetailContext {
  state: ListingDetailState;
  dispatch: Dispatch<ListingDetailAction>;
}

export type ListingDetailState = {
  readonly listing: any | null;
};

export type ListingDetailAction = {
  type: 'setListing';
  payload: any;
};

export const ListingDetailStateInit: ListingDetailState = {
  listing: null
};

export const ListingDetailReducer: Reducer<ListingDetailState, ListingDetailAction> = (
  state: ListingDetailState,
  action: ListingDetailAction
): ListingDetailState => {
  switch (action.type) {
    case 'setListing':
      return updateObject<ListingDetailState>(state, { listing: action.payload });
    default:
      return state;
  }
};

export const getListingDetail = async (
  id: any,
  dispatch: Dispatch<ListingDetailAction>,
):Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios.get(`long-term-rooms/${id}`);
    dispatch({ type: 'setListing', payload: res.data.data });
  } catch (error) {
    Router.push('/');
  }
};
