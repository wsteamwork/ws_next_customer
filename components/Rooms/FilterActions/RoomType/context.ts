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
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';

export interface RoomTypeData {
  id: number;
  value: string;
}

export const getRoomType = async (
  setData: Dispatch<SetStateAction<RoomTypeData[]>>
): Promise<RoomTypeData[]> => {
  const res: AxiosResponse<RoomTypeData[]> = await axios.get('rooms/type');
  setData(res.data);
  return res.data;
};

type ReturnUseCheckBox = {
  data: RoomTypeData[];
  handleChange: (item: number) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  handleSubmit: MouseEventHandler;
  handleClose: MouseEventHandler;
  handleRemove: MouseEventHandler;
  roomTypes: number[];
};

export const useRoomTypeChecbox = (
  setOpen?: Dispatch<SetStateAction<boolean>>,
  dataClick?: number[],
  setDataClick?: Dispatch<SetStateAction<number[]>>
): ReturnUseCheckBox => {
  const { dispatch, state } = useContext(RoomFilterContext);
  const { roomTypes } = state;
  const [data, setData] = useState<RoomTypeData[]>([]);

  useEffect(() => {
    getRoomType(setData);
  }, []);

  const handleChange = (item: number) => (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked === true) {
      setDataClick([...dataClick, item]);
    } else {
      const dataCheckboxUnCheck = dataClick.filter((i) => i !== item);
      setDataClick(dataCheckboxUnCheck);
    }
  };

  const handleSubmit = () => {
    dispatch({ type: 'setRoomTypes', roomTypes: dataClick });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setDataClick(roomTypes);
  };

  const handleRemove = () => {
    setOpen(false);
    dispatch({ type: 'setRoomTypes', roomTypes: [] });
    setDataClick([]);
  };

  return { data, handleChange, handleSubmit, handleClose, handleRemove, roomTypes };
};
