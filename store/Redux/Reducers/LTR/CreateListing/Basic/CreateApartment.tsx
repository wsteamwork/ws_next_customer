import { updateObject } from '@/store/Context/utility';
import { Reducer } from 'redux';
import { Coordinate } from './CreateListing';
import Cookies from 'universal-cookie';
import { axios_merchant } from '@/utils/axiosInstance';
export type CreateApartmentState = {
  readonly name: string;
  readonly name_en: string;
  readonly address: string;
  readonly avatar: string;
  readonly district_id: number;
  readonly city_id: number;
  readonly coordinate: Coordinate;
  readonly disableSubmit: boolean;
};

export type CreateApartmentActions =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_NAME_EN'; payload: string }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_AVATAR'; payload: string }
  | { type: 'SET_CITY_ID'; payload: number }
  | { type: 'SET_DISTRICT_ID'; payload: number }
  | { type: 'SET_COORDINATE'; payload: Coordinate }
  | { type: 'SET_DISABLE_SUBMIT'; payload: boolean };

const init: CreateApartmentState = {
  name: '',
  name_en: '',
  address: '',
  avatar: '',
  city_id: null,
  district_id: null,
  coordinate: null,
  disableSubmit: true
};

export const createApartmentReducer: Reducer<CreateApartmentState, CreateApartmentActions> = (
  state: CreateApartmentState = init,
  action: CreateApartmentActions
): CreateApartmentState => {
  switch (action.type) {
    case 'SET_NAME':
      return updateObject<CreateApartmentState>(state, { name: action.payload });
    case 'SET_NAME_EN':
      return updateObject<CreateApartmentState>(state, { name_en: action.payload }); 
    case 'SET_ADDRESS':
      return updateObject<CreateApartmentState>(state, { address: action.payload }); 
    case 'SET_ADDRESS':
      return updateObject<CreateApartmentState>(state, { address: action.payload });
    case 'SET_AVATAR':
      return updateObject<CreateApartmentState>(state, { avatar: action.payload });
    case 'SET_CITY_ID':
      return updateObject<CreateApartmentState>(state, { city_id: action.payload });
    case 'SET_DISTRICT_ID':
      return updateObject<CreateApartmentState>(state, { district_id: action.payload });
    case 'SET_COORDINATE':
      return updateObject<CreateApartmentState>(state, { coordinate: action.payload });
    case 'SET_DISABLE_SUBMIT':
      return updateObject<CreateApartmentState>(state, { disableSubmit: action.payload });
    default:
      return state;
  }
};

export const handleCreateBuilding = async (data: any) => {
  const cookies = new Cookies();
  const token = cookies.get('_token');
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios_merchant.post(
    `apartment-buildings`,
    {
      avatar: data.avatar,
      name: data.name,
      name_en: data.name_en,
      address: data.address,
      latitude: data.lat,
      longitude: data.lng,
      city_id: data.city_id,
      district_id: data.district_id
    },
    headers
  );

  return response.data;
};
