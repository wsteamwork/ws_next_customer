import searchFilterRDC, {
  SearchFilterState,
  SearchFilterAction
} from '@/store/Redux/Reducers/searchFilter';
import { combineReducers, Reducer, Store } from 'redux';
import bookingReducer, { BookingState, BookingAction } from '@/store/Redux/Reducers/booking';
import { RoomHomepageState, RoomHomepageAction, roomHomepageReducer } from './Home/roomHomepage';
import { NextPageContext } from 'next';
import { NextRouter } from 'next/router';

export type ReducersType = {
  searchFilter: Reducer<SearchFilterState, SearchFilterAction>;
  booking: Reducer<BookingState, BookingAction>;
  roomHomepage: Reducer<RoomHomepageState, RoomHomepageAction>;
};

export type ReducersList = {
  searchFilter: SearchFilterState;
  booking: BookingState;
  roomHomepage: RoomHomepageState;
};

export type ReducresActions = SearchFilterAction | RoomHomepageAction | BookingAction;

const reducers: ReducersType = {
  searchFilter: searchFilterRDC,
  booking: bookingReducer,
  roomHomepage: roomHomepageReducer
};

export interface NextContextPage extends NextPageContext {
  store: Store<ReducersList, ReducresActions>;
  isServer: boolean;
  router: NextRouter;
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
