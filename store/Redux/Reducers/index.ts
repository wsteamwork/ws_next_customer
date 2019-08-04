import loginInfo, { LoginInfoState, LoginInfoAction } from '@/store/Redux/Reducers/loginInfo';
import searchFilterRDC, {
  SearchFilterState,
  SearchFilterAction
} from '@/store/Redux/Reducers/searchFilter';
import V_animation, {
  AnimationState,
  AnimationAction
} from '@/store/Redux/Reducers/global-animation';
import { combineReducers, Reducer, Store } from 'redux';
import bookingReducer, { BookingState, BookingAction } from '@/store/Redux/Reducers/booking';
import reducerSearchNav, { SearchNavState, SearchNavAction } from './searchNav';
import { RoomHomepageState, RoomHomepageAction, RoomHomepageReducer } from './Home/roomHomepage';
import { NextJSContext } from 'next-redux-wrapper';
import { NextPageContext } from 'next';

export type ReducersType = {
  searchFilter: Reducer<SearchFilterState, SearchFilterAction>;
  loginInfo: Reducer<LoginInfoState, LoginInfoAction>;
  v_animate: Reducer<AnimationState, AnimationAction>;
  booking: Reducer<BookingState, BookingAction>;
  searchNavMobile: Reducer<SearchNavState, SearchNavAction>;
  roomHomepage: Reducer<RoomHomepageState, RoomHomepageAction>;
};

export type ReducersList = {
  searchFilter: SearchFilterState;
  loginInfo: LoginInfoState;
  v_animate: AnimationState;
  booking: BookingState;
  searchNavMobile: SearchNavState;
  roomHomepage: RoomHomepageState;
};

export type ReducresActions =
  | SearchFilterAction
  // | LoginInfoAction
  // | AnimationAction
  // | BookingAction
  // | SearchNavAction
  | RoomHomepageAction;

const reducers: ReducersType = {
  searchFilter: searchFilterRDC,
  loginInfo: loginInfo,
  v_animate: V_animation,
  booking: bookingReducer,
  searchNavMobile: reducerSearchNav,
  roomHomepage: RoomHomepageReducer
};

export interface NextContextPage extends NextPageContext {
  store: Store<ReducersList, ReducresActions>;
  isServer: boolean;
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
