import { ProfileInfoRes } from './../../types/Requests/Profile/ProfileResponse';
import { createContext, Dispatch, Reducer } from 'react';
import { WithWidth } from '@material-ui/core/withWidth';
import { WithRouterProps } from 'next/dist/client/with-router';
import { updateObject } from './utility';

export const GlobalContext = createContext<IGlobalContext>(null as IGlobalContext);

export interface IGlobalContext extends WithWidth, WithRouterProps {
  state: GlobalState;
  dispatch: Dispatch<GlobalAction>;
}

export type GlobalState = {
  readonly profile: ProfileInfoRes;
};

export type GlobalAction = { type: 'setProfile'; payload: ProfileInfoRes };

export const GlobalStateInit: GlobalState = {
  profile: null
};

export const GlobalReducer: Reducer<GlobalState, GlobalAction> = (
  state: GlobalState,
  action: GlobalAction
): GlobalState => {
  switch (action.type) {
    case 'setProfile':
      return updateObject<GlobalState>(state, {
        profile: action.payload
      });
    default:
      state;
  }
};
