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
  readonly percentage: number | null;
  readonly listings: any;
};

export type CreateListingAction =
  | { type: 'setPercentage'; payload: number }
  | { type: 'setListings'; listings: any };

export const CreateListingInit: CreateListingState = {
  percentage: null,
  listings: null
};

export const CreateListingReducer: Reducer<CreateListingState, CreateListingAction> = (
  state: CreateListingState,
  action: CreateListingAction
): CreateListingState => {
  switch (action.type) {
    case 'setPercentage':
      return updateObject<CreateListingState>(state, { percentage: action.payload });
    case 'setListings':
      return updateObject<CreateListingState>(state, { listings: action.listings });

    default:
      return state;
  }
};
