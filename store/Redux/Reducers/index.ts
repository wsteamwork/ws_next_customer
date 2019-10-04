import reuderBooking, { BookingAction, BookingState } from '@/store/Redux/Reducers/Booking/booking';
import {
  CompareRoomsActions,
  CompareRoomsState,
  ComparisonListReducer
} from '@/store/Redux/Reducers/Room/CompareRooms';
import reducerSearch, {
  SearchFilterAction,
  SearchFilterState
} from '@/store/Redux/Reducers/Search/searchFilter';
import { NextPageContext } from 'next';
import { Router } from 'next/router';
import { combineReducers, Reducer, Store } from 'redux';
import { BookActions, bookReducer, BookState } from './Book/book';
import { RoomHomepageAction, roomHomepageReducer, RoomHomepageState } from './Home/roomHomepage';
import {
  CreateListingActions,
  createListingReducer,
  CreateListingState
} from './LTR/CreateListing/Basic/CreateListing';
import {
  descriptionReducer,
  DescriptionReducerAction,
  DescriptionReducerState
} from './LTR/CreateListing/Step2/description';
import {
  notificationReducer,
  NotificationReducerAction,
  NotificationReducerState
} from './Notification/notification';
import { iProfileReducer, ProfileAction, ProfileState } from './Profile/profile';
import { UserProfileActions, userProfileReducer, UserProfileState } from './Profile/userProfile';
import { PomotionActions, PomotionState, promotionReducer } from './promotion';
import { roomReducer, RoomReducerAction, RoomReducerState } from './Room/roomReducer';
import { VisitedRoomActions, visitedRoomReducer, VisitedRoomState } from './Room/visitedRoom';

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
  description: Reducer<DescriptionReducerState, DescriptionReducerAction>;
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
  description: DescriptionReducerState;
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
  | DescriptionReducerAction
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
  description: descriptionReducer,
  createListing: createListingReducer
};

export interface NextContextPage extends NextPageContext {
  store: Store<ReducersList, ReducresActions>;
  isServer: boolean;
  router: Router;
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
