import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterState } from '@/store/Redux/Reducers/Search/searchFilter';
import Router from 'next/router';
import { RoomIndexContext, getRooms } from '@/store/Context/Room/RoomListContext';
import { GlobalContext } from '@/store/Context/GlobalContext';

interface ReturnUseRefresh {
  isMapOpen: boolean;
}

export const useRefreshListing = (): ReturnUseRefresh => {
  const { router } = useContext(GlobalContext);
  const { state: stateRoomIndex, dispatch: dispatchIndexRoom } = useContext(RoomIndexContext);
  const { isMapOpen, coords } = stateRoomIndex;

  const getData = async () => {
    dispatchIndexRoom({ type: 'setLoading', isLoading: true });

    try {
      const res = await getRooms(router, coords);
      dispatchIndexRoom({ type: 'setRooms', rooms: res.data, meta: res.meta });
      dispatchIndexRoom({ type: 'setLoading', isLoading: false });
    } catch (error) {
      dispatchIndexRoom({ type: 'setLoading', isLoading: false });
    }
  };

  useEffect(() => {
    getData();
  }, [router.query, coords]);


  return { isMapOpen };
};
