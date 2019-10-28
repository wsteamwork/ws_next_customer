import React, { FC, useContext } from 'react';
import GridContainer from '@/components/Layout/Grid/Container';
import { Grid, Toolbar, AppBar } from '@material-ui/core';
import ChooseRoomGuest from './ChooseRoomGuest';
import RoomType from './RoomType';
import PriceRange from './PriceRange';
import BookByHour from './BookByHour';
import FastBooking from './FastBooking';
import FilterRoom from './FilterRoom';
import SwitchMap from './SwitchMap';
import InfoSearch from './InfoSearch';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
interface Iprops {
  hideSearchBar?: boolean;
  showBookByHour?:boolean;
}

const FilterActions: FC<Iprops> = (props) => {
  const {hideSearchBar, showBookByHour} = props;
  const { state } = useContext(RoomIndexContext);
  const { isMapOpen } = state;
  return (
    <GridContainer
      xs={11}
      md={11}
      lg={10}
      className={`filterRooms 
      ${!isMapOpen && hideSearchBar ? 'hideSearchBar' : ''}
      ${isMapOpen ? 'stickyFilter' : ''}
      `}>
      <Grid container>
        <Grid item xs={10} container spacing={1}>
          <Grid item className="displayWebkit filterRooms__chooseRoomGuest">
            <ChooseRoomGuest/>
          </Grid>
          <Grid item className="displayWebkit filterRooms__roomType">
            <RoomType/>
          </Grid>
          <Grid item className="displayWebkit filterRooms__priceRange">
            <PriceRange/>
          </Grid>
          {showBookByHour && (
            <Grid item className="displayWebkit filterRooms__bookByHourt">
              <BookByHour/>
            </Grid>
          )}
          <Grid item className="displayWebkit filterRooms__fastBooking">
            <FastBooking/>
          </Grid>
          <Grid item className="displayWebkit filterRooms__filterRoom">
            <FilterRoom/>
          </Grid>
        </Grid>

        <Grid item xs={2} container justify="flex-end">
          <SwitchMap/>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

FilterActions.defaultProps ={
  showBookByHour:true
};

export default FilterActions;
