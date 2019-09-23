import { createContext, Dispatch, Reducer } from 'react';
import { updateObject } from '../utility';
export const CreateRoomContext = createContext<ICreateListingContext>(
  null as ICreateListingContext
);

export interface ICreateListingContext {
  state: CreateListingState;
  dispatch: Dispatch<CreateListingAction>;
}

export type CreateListingState = {
  readonly leaseType: number;
  readonly accommodationType: number;
  readonly stayWithHost: number;
  readonly guestRecommendation: number;
  readonly maxGuest: number;

  readonly listings: any;
};

export type CreateListingAction =
  | { type: 'setPercentage'; payload: number }
  | { type: 'setListings'; listings: any };

export const CreateListingInit: CreateListingState = {
  leaseType: null,
  accommodationType: null,
  stayWithHost: null,
  guestRecommendation: null,
  maxGuest: null,
  listings: null
};

export const CreateListingReducer: Reducer<CreateListingState, CreateListingAction> = (
  state: CreateListingState,
  action: CreateListingAction
): CreateListingState => {
  switch (action.type) {
    case 'setListings':
      return updateObject<CreateListingState>(state, { listings: action.listings });

    default:
      return state;
  }
};
