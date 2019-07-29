import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useContext,
  MouseEventHandler
} from 'react';
import { axios } from '@/utils/axiosInstance';
import { AxiosResponse } from 'axios';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';

export interface RoomType {
  id: number;
  value: string;
}

export interface RoomTypeCheckbox extends RoomType {
  checked: boolean;
}

export const getRoomType = async (
  setData: Dispatch<SetStateAction<RoomType[]>>
): Promise<RoomType[]> => {
  const res: AxiosResponse<RoomType[]> = await axios.get('rooms/type');
  setData(res.data);
  return res.data;
};

export const useRoomTypeChecbox = (
  setOpen: Dispatch<SetStateAction<boolean>>
): [RoomType[], Function, RoomType[], MouseEventHandler] => {
  const [data, setData] = useState<RoomType[]>([]);
  const [dataClick, setDataClick] = useState<RoomType[]>([]);
  const { dispatch } = useContext(RoomIndexContext);

  useEffect(() => {
    getRoomType(setData);
  }, []);

  const handleChange = (item: RoomType) => (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked === true) {
      setDataClick([...dataClick, item]);
    } else {
      const dataCheckboxUnCheck = dataClick.filter((i) => i.id !== item.id);
      setDataClick(dataCheckboxUnCheck);
    }
  };

  const handleSubmit = () => {
    dispatch({ type: 'setRoomTypes', roomTypes: dataClick });
    setOpen(false);
  };

  return [data, handleChange, dataClick, handleSubmit];
};
