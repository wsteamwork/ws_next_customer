import React, { FC, useContext, useMemo } from 'react';
import GoogleMap, { ChangeEventValue } from 'google-map-react';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import _ from 'lodash';
import MapMarker from '../Map/MapMarker';
import { MapCoords } from '@/types/Requests/Rooms/RoomRequests';

const MapRoomListing: FC = () => {
  const { state, dispatch } = useContext(RoomIndexContext);
  const { rooms } = state;

  const room = useMemo(() => rooms.length && rooms[0], [rooms]);
  // console.log(room)
  const onChangeMap = ({ bounds }: ChangeEventValue) => {
    const coords: MapCoords = {
      lat_max: bounds.ne.lat,
      lat_min: bounds.sw.lat,
      long_max: bounds.ne.lng,
      long_min: bounds.sw.lng
    };

    dispatch({ type: 'setCoords', payload: coords });
  };

  return (
    rooms.length && (
      <div className="mapRoomListing">
        <GoogleMap
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAP_KEY || 'AIzaSyA2ePi78OKNDZPNg-twQ74XwX_oczRQUoM'
          }}
          defaultZoom={15}
          onChange={onChangeMap}
          defaultCenter={{
            lat: parseFloat(room.latitude),
            lng: parseFloat(room.longitude)
          }}
          yesIWantToUseGoogleMapApiInternals>
          {_.map(rooms, (room) => (
            <MapMarker
              room={room}
              key={room.id}
              lat={parseFloat(room.latitude)}
              lng={parseFloat(room.longitude)}
            />
          ))}
        </GoogleMap>
      </div>
    )
  );
};

export default MapRoomListing;
