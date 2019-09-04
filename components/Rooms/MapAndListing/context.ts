import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { useContext, useEffect } from 'react';
import { RoomIndexContext, getRooms } from '@/store/Context/Room/RoomListContext';
import { GlobalContext } from '@/store/Context/GlobalContext';

interface ReturnUseRefresh {
  isMapOpen: boolean;
}

export const useRefreshListing = (): ReturnUseRefresh => {
  const { state } = useContext(RoomFilterContext);
  const { router } = useContext(GlobalContext);
  const { state: stateRoomIndex, dispatch: dispatchIndexRoom } = useContext(RoomIndexContext);
  const { isMapOpen, coords } = stateRoomIndex;
  // const filter = useSelector<ReducersList, SearchFilterState>((state) => state.searchFilter);

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
