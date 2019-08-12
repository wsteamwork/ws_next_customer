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
  const { state } = useContext(RoomFilterContext);
  const { router } = useContext(GlobalContext);
  const { state: stateRoomIndex, dispatch: dispatchIndexRoom } = useContext(RoomIndexContext);
  const { isMapOpen, coords } = stateRoomIndex;
  const filter = useSelector<ReducersList, SearchFilterState>((state) => state.searchFilter);

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

  useEffect(() => {
    let query = {};

    const combinedFilter = { ...state, ...filter };

    Object.keys(combinedFilter).forEach((i) => {
      if (!!combinedFilter[i]) {
        if (Array.isArray(combinedFilter[i]) && combinedFilter[i].length > 0) {
          if (i === 'roomTypes') {
            query['room_type'] = combinedFilter[i];
          } else {
            query[i] = combinedFilter[i].join(',');
          }
        } else if (i === 'searchText') {
          query['name'] = combinedFilter[i];
        } else if (i === 'startDate') {
          query['check_in'] = combinedFilter[i];
        } else if (i === 'endDate') {
          query['check_out'] = combinedFilter[i];
        } else if (i === 'bookingType') {
          query['rent_type'] = combinedFilter[i];
        } else if (i === 'roomsCount') {
          query['number_of_rooms'] = combinedFilter[i];
        } else if (i === 'guestsCount') {
          query['number_of_guests'] = combinedFilter[i];
        } else if (!Array.isArray(combinedFilter[i])) {
          query[i] = combinedFilter[i];
        }
      }
    });

    Router.push({
      pathname: '/rooms',
      query
    });
  }, [state, filter]);

  return { isMapOpen };
};
