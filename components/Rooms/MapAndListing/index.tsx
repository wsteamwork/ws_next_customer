import React, { useMemo } from 'react';
import RoomListing from './RoomListing';
import { useRefreshListing } from './context';
import MapRoomListing from './MapRoomListing';

const MapAndListing = () => {
  const { isMapOpen } = useRefreshListing();

  return useMemo(
    () => (!!isMapOpen ? <MapRoomListing></MapRoomListing> : <RoomListing></RoomListing>),
    [isMapOpen]
  );
};

export default MapAndListing;
