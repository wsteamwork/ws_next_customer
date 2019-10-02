import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { Grid, Hidden } from '@material-ui/core';
import React, { FC, useContext, useState } from 'react';
import RoomListing from '../RoomListing';
import MapCanvas from './MapCanvas';


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
