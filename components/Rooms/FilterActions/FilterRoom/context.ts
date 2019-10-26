import { useState, useEffect, ChangeEvent, useContext, MouseEventHandler } from 'react';
import { axios } from '@/utils/axiosInstance';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { ComfortIndexRes } from '@/types/Requests/Comforts/ComfortResponses';
import { Dispatch, SetStateAction } from 'react';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { Instance } from 'tippy.js';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { updateRouter } from '@/store/Context/utility';
import { GlobalContext } from '@/store/Context/GlobalContext';

export type ResDataFilter = ReturnType<typeof changeDataWithEntries>;

export const getDataFilter = async (
  setData: Dispatch<SetStateAction<ResDataFilter>>
): Promise<ResDataFilter> => {
  const res: AxiosRes<ComfortIndexRes[]> = await axios.get('comforts?include=details&limit=-1');
  const resChangeWithReducer = changeDataWithReduce(res.data.data);
  const resChangeWithEntries = changeDataWithEntries(resChangeWithReducer);
  setData(resChangeWithEntries);
  return resChangeWithEntries;
};

interface ChangeWithReduce {
  [key: string]: ComfortIndexRes[];
}

const changeDataWithReduce = (data: ComfortIndexRes[]): ChangeWithReduce => {
  return data.reduce((a, b) => {
    if (a[b.type_txt]) {
      a[b.type_txt] = [...a[b.type_txt], b];
    } else {
      a[b.type_txt] = [b];
    }
    return a;
  }, {});
};

const changeDataWithEntries = (data: ChangeWithReduce): [string, ComfortIndexRes[]][] => {
  return Object.entries(data);
};

interface ReturnUseFilterRoom {
  data: ResDataFilter;
  dataClick: number[];
  handleChange: (id: number) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  handleSubmit: MouseEventHandler;
  handleClose: MouseEventHandler;
}

export const useFilterRoom = (
  setDataClick: Dispatch<SetStateAction<number[]>>,
  dataClick: number[],
  setOpen: Dispatch<SetStateAction<boolean>>
): ReturnUseFilterRoom => {
  const [data, setData] = useState<ResDataFilter>([]);
  const { state, dispatch } = useContext(RoomFilterContext);
  const { router } = useContext(GlobalContext);
  const { query } = router;
  const { amenities } = state;

  useEffect(() => {
    getDataFilter(setData);
  }, []);

  useEffect(() => {
    if (!!query.amenities) {
      const data = query.amenities as string;
      const res: number[] = data.split(',').map(function(i) {
        return parseInt(i, 10);
      });

      dispatch({ type: 'setAmenitiesFilter', amenities: res });
    }
  }, [query]);

  const handleChange = (id: number) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      setDataClick([...dataClick, id]);
    } else {
      const dataCheckboxUnCheck = dataClick.filter((i) => i !== id);
      setDataClick(dataCheckboxUnCheck);
    }
  };

  const handleSubmit = () => {
    setOpen(false);
    dispatch({ type: 'setAmenitiesFilter', amenities: dataClick });
    updateRouter('/rooms',false, 'amenities', dataClick, 'page', 1);
  };

  const handleClose = () => {
    setOpen(false);
    setDataClick(amenities);
  };

  return { data, handleChange, dataClick, handleClose, handleSubmit };
};
