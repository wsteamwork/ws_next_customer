import reducerSearch, {
  SearchFilterState,
  SearchFilterAction
} from '@/store/Redux/Reducers/Search/searchFilter';
import { combineReducers, Reducer, Store } from 'redux';
import { RoomHomepageState, RoomHomepageAction, roomHomepageReducer } from './Home/roomHomepage';
import { NextPageContext } from 'next';
import { Router } from 'next/router';
import reuderBooking, { BookingState, BookingAction } from '@/store/Redux/Reducers/Booking/booking';
import { RoomReducerState, RoomReducerAction, roomReducer } from './Room/roomReducer';
import { BookState, BookActions, bookReducer } from './Book/book';
import { UserProfileState, UserProfileActions, userProfileReducer } from './Profile/userProfile';
import { ProfileAction, ProfileState, iProfileReducer } from './Profile/profile';
import { VisitedRoomActions, VisitedRoomState, visitedRoomReducer } from './Room/visitedRoom';
import { PomotionState, PomotionActions, promotionReducer } from './promotion';
import {
  NotificationReducerAction,
  NotificationReducerState,
  notificationReducer
} from './Notification/notification';
import {
  CompareRoomsActions,
  CompareRoomsState,
  ComparisonListReducer
} from '@/store/Redux/Reducers/Room/CompareRooms';
import {
  CreateListingActions,
  CreateListingState,
  createListingReducer
} from './LTR/CreateListing';

export type ReducersType = {
  searchFilter: Reducer<SearchFilterState, SearchFilterAction>;
  booking: Reducer<BookingState, BookingAction>;
  roomHomepage: Reducer<RoomHomepageState, RoomHomepageAction>;
  roomPage: Reducer<RoomReducerState, RoomReducerAction>;
  book: Reducer<BookState, BookActions>;
  userProfile: Reducer<UserProfileState, UserProfileActions>;
  iProfile: Reducer<ProfileState, ProfileAction>;
  visitedRoom: Reducer<VisitedRoomState, VisitedRoomActions>;
  compareRooms: Reducer<CompareRoomsState, CompareRoomsActions>;
  promotion: Reducer<PomotionState, PomotionActions>;
  notifications: Reducer<NotificationReducerState, NotificationReducerAction>;
  createListing: Reducer<CreateListingState, CreateListingActions>;
};

export type ReducersList = {
  searchFilter: SearchFilterState;
  booking: BookingState;
  roomHomepage: RoomHomepageState;
  roomPage: RoomReducerState;
  book: BookState;
  userProfile: UserProfileState;
  iProfile: ProfileState;
  visitedRoom: VisitedRoomState;
  compareRooms: CompareRoomsState;
  promotion: PomotionState;
  notifications: NotificationReducerState;
  createListing: CreateListingState;
};

export type ReducresActions =
  | SearchFilterAction
  | RoomHomepageAction
  | BookingAction
  | RoomReducerAction
  | BookActions
  | UserProfileActions
  | ProfileAction
  | VisitedRoomActions
  | NotificationReducerAction
  | CompareRoomsActions
  | PomotionActions
  | CreateListingActions;

const reducers: ReducersType = {
  searchFilter: reducerSearch,
  booking: reuderBooking,
  roomHomepage: roomHomepageReducer,
  roomPage: roomReducer,
  book: bookReducer,
  userProfile: userProfileReducer,
  iProfile: iProfileReducer,
  visitedRoom: visitedRoomReducer,
  promotion: promotionReducer,
  notifications: notificationReducer,
  compareRooms: ComparisonListReducer,
  createListing: createListingReducer
};

export interface NextContextPage extends NextPageContext {
  store: Store<ReducersList, ReducresActions>;
  isServer: boolean;
  router: Router;
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
