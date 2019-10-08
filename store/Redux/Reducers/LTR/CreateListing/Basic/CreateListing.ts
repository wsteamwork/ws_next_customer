import { updateObject } from '@/store/Context/utility';
import { Dispatch, Reducer } from 'redux';
import { BedRoomReq } from '@/types/Requests/LTR/Basic/BasicRequests';
import { axios_merchant } from '@/utils/axiosInstance';

interface Coordinate {
  lat: number;
  lng: number;
}

export type CreateListingState = {
  readonly leaseType: number;
  readonly accommodationType: number;
  readonly stayWithHost: number;
  readonly guestRecommendation: number;
  readonly maxGuest: number;
  readonly bedRoomsNumber: number;
  readonly bathroomNumber: number;
  readonly bedRooms: BedRoomReq;
  readonly address: string;
  readonly building: string;
  readonly city_id: number;
  readonly district_id: number;
  readonly coordinate: Coordinate;
  readonly listing: any;
  readonly id_listing: number;
};

export type CreateListingActions =
  | { type: 'SET_LEASE_TYPE'; payload: number }
  | { type: 'SET_ACCOMMODATION_TYPE'; payload: number }
  | { type: 'SET_STAY_WITH_HOST'; payload: number }
  | { type: 'SET_GUEST_RECOMMENDATION'; payload: number }
  | { type: 'SET_MAX_GUEST'; payload: number }
  | { type: 'SET_BEDROOMS_NUMBER'; payload: number }
  | { type: 'SET_BEDROOMS'; payload: BedRoomReq }
  | { type: 'SET_BATHROOM_NUMBER'; payload: number }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_BUILDING'; payload: string }
  | { type: 'SET_CITY_ID'; payload: number }
  | { type: 'SET_DISTRICT_ID'; payload: number }
  | { type: 'SET_COORDINATE'; payload: Coordinate }
  | { type: 'SET_LISTING'; payload: any }
  | { type: 'SET_ID_LISTING'; payload: number };

const init: CreateListingState = {
  leaseType: null,
  accommodationType: null,
  stayWithHost: null,
  bedRooms: null,
  guestRecommendation: null,
  maxGuest: null,
  bedRoomsNumber: 1,
  bathroomNumber: 0,
  address: '',
  building: '',
  city_id: null,
  district_id: null,
  coordinate: null,
  listing: null,
  id_listing: 0
};

export const createListingReducer: Reducer<CreateListingState, CreateListingActions> = (
  state: CreateListingState = init,
  action: CreateListingActions
): CreateListingState => {
  switch (action.type) {
    case 'SET_LEASE_TYPE':
      return updateObject<CreateListingState>(state, { leaseType: action.payload });
    case 'SET_ACCOMMODATION_TYPE':
      return updateObject<CreateListingState>(state, { accommodationType: action.payload });
    case 'SET_STAY_WITH_HOST':
      return updateObject<CreateListingState>(state, { stayWithHost: action.payload });
    case 'SET_GUEST_RECOMMENDATION':
      return updateObject<CreateListingState>(state, { guestRecommendation: action.payload });
    case 'SET_MAX_GUEST':
      return updateObject<CreateListingState>(state, { maxGuest: action.payload });
    case 'SET_BEDROOMS_NUMBER':
      return updateObject<CreateListingState>(state, { bedRoomsNumber: action.payload });
    case 'SET_BEDROOMS':
      return updateObject<CreateListingState>(state, { bedRooms: action.payload });
    case 'SET_BATHROOM_NUMBER':
      return updateObject<CreateListingState>(state, { bathroomNumber: action.payload });
    case 'SET_ADDRESS':
      return updateObject<CreateListingState>(state, { address: action.payload });
    case 'SET_BUILDING':
      return updateObject<CreateListingState>(state, { building: action.payload });
    case 'SET_CITY_ID':
      return updateObject<CreateListingState>(state, { city_id: action.payload });
    case 'SET_DISTRICT_ID':
      return updateObject<CreateListingState>(state, { district_id: action.payload });
    case 'SET_COORDINATE':
      return updateObject<CreateListingState>(state, { coordinate: action.payload });
    case 'SET_LISTING':
      return updateObject<CreateListingState>(state, { listing: action.payload });
      case 'SET_ID_LISTING':
      return updateObject<CreateListingState>(state, { id_listing: action.payload });

    default:
      return state;
  }
};

// const submitStepOne = async (data: any, dispatch: Dispatch<CreateListingActions>) => {
//   dispatch({ type: 'SET_LEASE_TYPE', payload: data });
//   dispatch({ type: 'SET_ACCOMMODATION_TYPE', payload: data });
//   dispatch({ type: 'SET_STAY_WITH_HOST', payload: data });
// };

export const handleCreateRoom = async (data: any, dispatch: any, token?: string, initLanguage: string = 'vi') => {
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': initLanguage
    }
  };

  const body = {
    step1: {
      tab1: {
        lease_type: data.lease_type,
        accommodation_type: data.accommodation_type,
        stay_with_host: data.stay_with_host
      },
      tab2: {
        guest: {
          recommendation: data.guest_recommendation,
          max_additional_guest: data.max_guest
        },
        bedrooms: data.bedRooms
      },
      tab3: {
        bathrooms: {
          number_bathroom: data.number_bathroom
        }
      },
      tab4: {
        address: data.address,
        building: data.building,
        city_id: 2,
        district_id: 102,
        latitude: parseFloat(data.coordinate.lat),
        longitude: parseFloat(data.coordinate.long)
      }
    }
  };
  console.log(body);

  const response = await axios_merchant.post(`long-term/room/create`, body);

  if (response) {
    
    console.log(response);
  }
  return response;
};

// export const submitStepOne = async (data: any) => {
//   const cookies = new Cookies();
//   const token = cookies.get('_token');
//   const headers = token && {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     }
//   };
//   const response = await axios_merchant.post(
//     `long-term/room/step2/${tab}/${room_id}`,
//     {
//       step2: {
//         [`${tab}`]: data
//       }
//     },
//     headers
//   );

//   return response.data;
// };
