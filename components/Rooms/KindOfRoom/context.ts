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

export const getRoomType = async (
  setData: Dispatch<SetStateAction<RoomType[]>>
): Promise<RoomType[]> => {
  const res: AxiosResponse<RoomType[]> = await axios.get('rooms/type');
  setData(res.data);
  return res.data;
};

type ReturnUseCheckBox = {
  data: RoomType[];
  handleChange: Function;
  handleSubmit: MouseEventHandler;
  handleClose: MouseEventHandler;
  handleRemove: MouseEventHandler;
  roomTypes: RoomType[];
};

export const useRoomTypeChecbox = (
  setOpen?: Dispatch<SetStateAction<boolean>>,
  dataClick?: RoomType[],
  setDataClick?: Dispatch<SetStateAction<RoomType[]>>
): ReturnUseCheckBox => {
  const { dispatch, state } = useContext(RoomIndexContext);
  const { roomTypes } = state;
  const [data, setData] = useState<RoomType[]>([]);

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
