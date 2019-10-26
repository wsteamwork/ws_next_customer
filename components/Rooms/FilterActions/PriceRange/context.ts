import {
  useState,
  useContext,
  useMemo,
  MouseEventHandler,
  SetStateAction,
  Dispatch,
  useEffect
} from 'react';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomFilterContext, MIN_PRICE, MAX_PRICE } from '@/store/Context/Room/RoomFilterContext';
import { updateRouter } from '@/store/Context/utility';
import numeral from 'numeral';

type ReturnUsePriceRange = {
  open: boolean;
  onHide?: () => void;
  checkPrice: string;
  hanldeOpen?: MouseEventHandler;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleRemove?: MouseEventHandler;
};

export const usePriceRange = (): ReturnUsePriceRange => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(RoomFilterContext);
  const { router } = useContext(GlobalContext);
  const { query } = router;
  const { price_day_from, price_day_to } = state;

  const checkPrice = useMemo<string>(() => {
    if (price_day_from === MIN_PRICE && price_day_to === MAX_PRICE) {
      return '';
    } else if (price_day_to !== MIN_PRICE && price_day_from === MIN_PRICE) {
      return `đ 0 - ${numeral(price_day_to).format('0,0')}`;
    } else if (price_day_from !== MIN_PRICE && price_day_to > price_day_from) {
      return `đ ${numeral(price_day_from).format('0,0')} - ${numeral(price_day_to).format('0,0')}`;
    }

    return '';
  }, [price_day_from, price_day_to]);

  useEffect(() => {
    if (!!query.price_day_from && !!query.price_day_to) {
      dispatch({
        type: 'setPrices',
        price_day_from: parseInt(query.price_day_from as string, 10),
        price_day_to: parseInt(query.price_day_to as string, 10)
      });
    }
  }, [query]);

  const onHide = () => {
    setOpen(false);
  };

  const hanldeOpen = () => {
    setOpen(true);
  };

  const handleRemove = () => {
    setOpen(false);
    dispatch({ type: 'setPrices', price_day_from: MIN_PRICE, price_day_to: MAX_PRICE });
    updateRouter('/rooms',true, 'price_day_from', MIN_PRICE, 'price_day_to', MAX_PRICE);
  };

  return {
    open,
    onHide,
    checkPrice,
    hanldeOpen,
    setOpen,
    handleRemove
  };
};
