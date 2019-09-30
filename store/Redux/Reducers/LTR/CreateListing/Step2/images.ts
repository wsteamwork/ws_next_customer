import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import { Reducer, Dispatch } from 'redux';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';

export type ImageReducerState = {
  avatar_image: ImagesRes;
  cover_photo: ImagesRes;
  livingrooms: ImagesRes;
  bedrooms: any;
  kitchens: ImagesRes;
  bathrooms: any;
  outdoors: ImagesRes;
  furnitures: ImagesRes;
};

export const init: ImageReducerState = {
  avatar_image: { images: [] },
  cover_photo: { images: [] },
  livingrooms: { images: [] },
  bedrooms: {},
  kitchens: { images: [] },
  bathrooms: {},
  outdoors: { images: [] },
  furnitures: { images: [] }
};

export type ImageReducerAction =
  | { type: 'setListing'; payload: any }
  | { type: 'setAvatarImage'; payload: ImagesRes }
  | { type: 'setCoverImage'; payload: ImagesRes }
  | { type: 'setLivingRoomImage'; payload: ImagesRes }
  | { type: 'setKitchensImage'; payload: ImagesRes }
  | { type: 'setOutdoorsImage'; payload: ImagesRes }
  | { type: 'setFurnituresImage'; payload: ImagesRes }
  | { type: 'setBedRoomImage'; payload: any }
  | { type: 'setBathRoomImage'; payload: any };

export const descriptionReducer: Reducer<ImageReducerState, ImageReducerAction> = (
  state: ImageReducerState = init,
  action: ImageReducerAction
): ImageReducerState => {
  switch (action.type) {
    case 'setAvatarImage':
      return updateObject<ImageReducerState>(state, { avatar_image: action.payload });
    case 'setCoverImage':
      return updateObject<ImageReducerState>(state, { cover_photo: action.payload });
    case 'setLivingRoomImage':
      return updateObject<ImageReducerState>(state, { livingrooms: action.payload });
    case 'setKitchensImage':
      return updateObject<ImageReducerState>(state, { kitchens: action.payload });
    case 'setOutdoorsImage':
      return updateObject<ImageReducerState>(state, { outdoors: action.payload });
    case 'setFurnituresImage':
      return updateObject<ImageReducerState>(state, { furnitures: action.payload });
    case 'setBedRoomImage':
        return updateObject<ImageReducerState>(state, { bedrooms: {...state.bedrooms, ...action.payload }});
    case 'setBathRoomImage':
        return updateObject<ImageReducerState>(state, { bathrooms: {...state.bathrooms, ...action.payload }});
    default:
      return state;
  }
};

export const handleSubmitImage = async (id: string | number, data: any) => {
  try {
    const res = await axios.post(`long-term/room/step2/tab3/${id}`, { step2: { tab3: data } });
  } catch (error) {}
};
