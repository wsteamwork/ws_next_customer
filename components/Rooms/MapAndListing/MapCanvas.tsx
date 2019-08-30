import React, {
  ComponentType,
  Fragment,
  useState,
  useContext,
  memo,
  useEffect,
  useMemo
} from 'react';
import _ from 'lodash';
import GoogleMap, { ChangeEventValue, Coords } from 'google-map-react';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import MapMarker from '../Map/MapMarker';
import { MapCoords } from '@/types/Requests/Rooms/RoomRequests';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';

interface IProps {
  rooms: RoomIndexRes[];
  center: Coords;
  hoverAction(id: number): void;
  hoverId: number;
  focusRoomLocation(room: RoomIndexRes): void
}

// @ts-ignore
const MapCanvas: FC<IProps> = (props) => {
  const { rooms, center, hoverAction, hoverId, focusRoomLocation } = props;
  const { state, dispatch } = useContext(RoomIndexContext);

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
    <Fragment>
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
        center={center}
        yesIWantToUseGoogleMapApiInternals
        // onChildMouseEnter={(h) => hoverAction(parseInt(h))}
        // onChildMouseLeave={(h) => hoverAction(0)}
      >
        {_.map(rooms, (room) => (
          <MapMarker
            isHover={hoverId === room.id}
            focus={focusRoomLocation}
            room={room}
            key={room.id}
            lat={parseFloat(room.latitude)}
            lng={parseFloat(room.longitude)}
          />
        ))}
      </GoogleMap>
    </Fragment>
  );
};

export default MapCanvas;
