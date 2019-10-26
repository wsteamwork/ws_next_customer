import React, { useMemo } from 'react';
import { useRefreshListing } from './context';
import MapRoomListing from './MapRoomListing';
import SidebarAndListing from '../SidebarAndListing';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import ListingLTRooms from '@/components/LTR/LTRooms/ListingLTRooms';

const MapAndListing = () => {
  const { isMapOpen } = useRefreshListing();
  const leaseTypeGlobal = useSelector<ReducersList, 0|1>((state) => state.searchFilter.leaseTypeGlobal);

  return useMemo(
    () =>
      !!isMapOpen ? <MapRoomListing/> : (leaseTypeGlobal ? <ListingLTRooms/> : <SidebarAndListing/> ),
    [isMapOpen]
  );
};

export default MapAndListing;
