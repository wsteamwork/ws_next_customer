import { axios_merchant } from '@/utils/axiosInstance';
import { createContext, Dispatch, Reducer } from 'react';
import { updateObject } from '../utility';
// import { headers } from '@/utils/axiosInstance.ts';

export const CreateListingContext = createContext<ICreateListingContext>(
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
  | { type: 'setLeaseType'; payload: number }
  | { type: 'setAccommodationType'; payload: number }
  | { type: 'setStayWithHost'; payload: number }
  | { type: 'setGuestRecommendation'; payload: number }
  | { type: 'setMaxGuest'; payload: number }
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
    case 'setLeaseType':
      return updateObject<CreateListingState>(state, { leaseType: action.payload });
    case 'setAccommodationType':
      return updateObject<CreateListingState>(state, { accommodationType: action.payload });
    case 'setStayWithHost':
      return updateObject<CreateListingState>(state, { stayWithHost: action.payload });
    case 'setGuestRecommendation':
      return updateObject<CreateListingState>(state, { guestRecommendation: action.payload });
    case 'setMaxGuest':
      return updateObject<CreateListingState>(state, { maxGuest: action.payload });
    case 'setListings':
      return updateObject<CreateListingState>(state, { listings: action.listings });

    default:
      return state;
  }
};

export const handleCreateRoom = async (token?: string, initLanguage: string = 'vi') => {
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': initLanguage
    }
  };

  const body = {
    step1: {
      tab1: {
        lease_type: 2,
        accommodation_type: 2,
        stay_with_host: 1
      },
      tab2: {
        guest: {
          recommendation: 4,
          max_additional_guest: 4
        },
        bedrooms: {
          bedroom_1: {
            number_bed: 1,
            beds: [
              {
                number_bed: 1,
                size: 3
              },
              {
                number_bed: 2,
                size: 1
              }
            ],
            area: 15
          },
          bedroom_2: {
            beds: [
              {
                number_bed: 1,
                size: 3
              },
              {
                number_bed: 2,
                size: 1
              }
            ],
            number_bed: 3,
            area: 15
          },
          number_bedroom: 2
        }
      },
      tab3: {
        bathrooms: {
          number_bathroom: 2
        }
      },
      tab4: {
        address: '102 Thai Thinh',
        building: 'Ha Thanh Plaza',
        city_id: 2,
        district_id: 102,
        latitude: '102',
        longitude: '39'
      }
    }
  };

  const response = await axios_merchant.post(`long-term/room/create`, body);

  if (response) {
    console.log('before next');
  }
  return response;
};
