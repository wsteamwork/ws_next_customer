import { IPriceShortTerm, IPriceLongTerm } from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { Reducer } from 'redux';
import { updateObject } from '@/store/Context/utility';
import { IServicesFee } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';

export type PriceTermState = {
  readonly priceST: IPriceShortTerm;
  readonly priceLT: IPriceLongTerm;
  readonly serviceFee: IServicesFee;
};

export type PriceTermActions = { type:'setPriceST'; payload: IPriceShortTerm }
  | { type:'setPriceLT'; payload: IPriceLongTerm }
  | { type:'setServiceFee'; payload: IServicesFee }

export const init: PriceTermState = {
  priceST: null,
  priceLT: null,
  serviceFee: {included_fee: [] },
};

export const PriceTermReducer: Reducer<PriceTermState,PriceTermActions> = (
  state: PriceTermState = init,
  action: PriceTermActions
):PriceTermState => {
  switch (action.type) {
    case 'setPriceST':
      return updateObject(state, { priceST: action.payload });
    case 'setPriceLT':
      return updateObject(state, { priceLT: action.payload });
    case 'setServiceFee':
      return updateObject(state, { serviceFee: action.payload });
    default:
      return state;
  }
};



