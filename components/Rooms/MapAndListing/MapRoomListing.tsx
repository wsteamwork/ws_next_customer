import React, { FC, useContext, useState, useEffect } from 'react';
import { Coords } from 'google-map-react';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import _ from 'lodash';

// import { MapCoords } from '@/types/Requests/Rooms/RoomRequests';
// import NotFound from '../Lotte/NotFound';
import { Grid, Hidden } from '@material-ui/core';
// import RoomCardListing from '../RoomCardListing';
// import GridContainer from '@/components/Layout/Grid/Container';
// import LazyLoad from 'react-lazyload';
// import ListRoom from '@/components/ListRoom';
// import { StickyContainer, Sticky } from 'react-sticky';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import MapCanvas from './MapCanvas';
import { isNumber } from 'util';
import RoomListing from '../RoomListing';

const MapRoomListing: FC = () => {
  const { state, dispatch } = useContext(RoomIndexContext);
  const { rooms, isMapOpen } = state;
  const [hoverId, setHoverId] = useState<number>(-1);

  const hoverAction = (key: number) => {
    setHoverId(key);
  };

  return (
    <div className="mapRoomListing">
      <Hidden mdDown>
        <Grid className="roomListingInMap">
          <RoomListing usingInMap={true} hoverAction={hoverAction} rooms={rooms} />
        </Grid>
      </Hidden>

      <Grid className="mapListing">
        <MapCanvas hoverId={hoverId} hoverAction={hoverAction} rooms={rooms} />
      </Grid>
    </div>
  );
};

export default MapRoomListing;
