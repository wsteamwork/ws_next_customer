import React, { FC, useContext, useMemo, Fragment, useState, useEffect } from 'react';
import GoogleMap, { ChangeEventValue, Coords } from 'google-map-react';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import _ from 'lodash';

import { MapCoords } from '@/types/Requests/Rooms/RoomRequests';
import NotFound from '../Lotte/NotFound';
import { Grid, Hidden } from '@material-ui/core';
import RoomCardListing from '../RoomCardListing';
import GridContainer from '@/components/Layout/Grid/Container';
import LazyLoad from 'react-lazyload';
import ListRoom from '@/components/ListRoom';
import { StickyContainer, Sticky } from 'react-sticky';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import MapRooms from './MapRooms';
import MapCanvas from './MapCanvas';

const MapRoomListing: FC = () => {
  const { state, dispatch } = useContext(RoomIndexContext);
  const { rooms, isMapOpen } = state;
  const [hoverId, setHoverId] = useState<number>(-1);
  const [center, setCenter] = useState<Coords>({
    lat: 0,
    lng: 0
  });

  const hoverAction = (key: number) => {
    setHoverId(key);
  };

  const focusRoomLocation = (room: RoomIndexRes) => {
    setCenter({
      lat: parseFloat(room.latitude),
      lng: parseFloat(room.longitude)
    });
  };

  useEffect(() => {
    if (rooms.length > 0 && isMapOpen) {
      let lat = parseFloat(rooms[0].latitude);
      let lng = parseFloat(rooms[0].longitude);
      let valid = lat < 90 && lat > 90 && lng < 180 && lng > -180;

      let coords: Coords = {
        lat: valid ? lat : 21.02,
        lng: valid ? lng : 105.83
      };

      setCenter(coords);
    }
  }, [rooms.length > 0, isMapOpen]);

  return (
    <div className="mapRoomListing">
      <Hidden mdDown>
        <Grid className="roomListingInMap">
          <MapRooms hoverId={hoverId} hoverAction={hoverAction} rooms={rooms} />
        </Grid>
      </Hidden>

      <Grid className="mapListing">
        <MapCanvas
          focusRoomLocation={focusRoomLocation}
          hoverId={hoverId}
          center={center}
          hoverAction={hoverAction}
          rooms={rooms}
        />
      </Grid>
    </div>
  );
};

export default MapRoomListing;
