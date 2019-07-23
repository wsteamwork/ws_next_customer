import loginInfo, { LoginInfoState, LoginInfoAction } from '@/store/Redux/Reducers/loginInfo';
import searchFilterRDC, {
  SearchFilterState,
  SearchFilterAction
} from '@/store/Redux/Reducers/searchFilter';
import V_animation, {
  AnimationState,
  AnimationAction
} from '@/store/Redux/Reducers/global-animation';
import { combineReducers, Reducer } from 'redux';
import bookingReducer, { BookingState, BookingAction } from '@/store/Redux/Reducers/booking';
import reducerSearchNav, { SearchNavState, SearchNavAction } from './searchNav';

export type ReducersType = {
  searchFilter: Reducer<SearchFilterState, SearchFilterAction>;
  loginInfo: Reducer<LoginInfoState, LoginInfoAction>;
  v_animate: Reducer<AnimationState, AnimationAction>;
  booking: Reducer<BookingState, BookingAction>;
  searchNavMobile: Reducer<SearchNavState, SearchNavAction>;
};

export type ReducersList = {
  searchFilter: SearchFilterState;
  loginInfo: LoginInfoState;
  v_animate: AnimationState;
  booking: BookingState;
  searchNavMobile: SearchNavState;
};

export type ReducresActions = SearchFilterAction &
  LoginInfoAction &
  AnimationAction &
  BookingAction &
  SearchNavAction;

const reducers: ReducersType = {
  searchFilter: searchFilterRDC,
  loginInfo: loginInfo,
  v_animate: V_animation,
  booking: bookingReducer,
  searchNavMobile: reducerSearchNav
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
