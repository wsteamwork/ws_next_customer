import React, { useMemo } from 'react';
import RoomListing from '@/components/Rooms/RoomListing';
import { useRefreshListing } from './context';
import MapRoomListing from './MapRoomListing';

const MapAndListing = () => {
  const { isMapOpen } = useRefreshListing();
  console.log(isMapOpen);
  return useMemo(
    () => (!!isMapOpen ? <MapRoomListing></MapRoomListing> : <RoomListing></RoomListing>),
    [isMapOpen]
  );
};

export default MapAndListing;
