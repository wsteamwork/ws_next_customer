import { useEffect, useContext, useState } from 'react';
import { ReducersList, ReducersType } from '@/store/Redux/Reducers';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import GridContainer from '../Layout/Grid/Container';
import { Grid, Hidden, Paper } from '@material-ui/core';
import RoomCardListing from './RoomCardListing';
import ButtonGlobal from '../ButtonGlobal';
import VisitedRooms from './VisitedRooms';
import ListRoom from '../ListRoom';
import {
  getRooms,
  RoomIndexContext,
  IRoomIndexContext
} from '@/store/Context/Room/RoomListContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { SearchFilterState } from '@/store/Redux/Reducers/Search/searchFilter';
import { IRoomFilterContext, RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import Router from 'next/router';
import _ from 'lodash';

interface IProps {
  classes?: any;
  filter: SearchFilterState;
}

// @ts-ignore
const RoomListing: ComponentType<IProps> = (props: LocalProps) => {
  const { classes, filter } = props;

  const { state: stateFilterRoom, dispatch: dispatchFilterRoom } = useContext<IRoomFilterContext>(
    RoomFilterContext
  );
  const { state: stateIndexRoom, dispatch: dispatchIndexRoom } = useContext<IRoomIndexContext>(
    RoomIndexContext
  );
  const { roomTypes, instant_book, amenities } = stateFilterRoom;
  const { rooms } = stateIndexRoom;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);

  const renamePropertyObject = (oldName: string, newName: string, object: any) => {
    const renamed = ({ oldName, ...object }) => ({ newName: oldName, ...object });
    renamed(object);
  };

  useEffect(() => {
    let query = {};

    const combinedFilter = { ...stateFilterRoom, ...filter };

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

    console.log(query);
    Router.push({
      pathname: '/rooms',
      query
    });
  }, [stateFilterRoom, filter]);

  useEffect(() => {
    setLoading(true);
    dispatchIndexRoom({
      type: 'setRooms',
      rooms: []
    });
    getRooms(router)
      .then((data) => {
        const roomData = data.data;
        const pagination = data.meta;
        setLoading(false);
        dispatchIndexRoom({
          type: 'setRooms',
          rooms: roomData,
          meta: pagination
        });
      })
      .catch((err) => console.error(err));
  }, [router.query]);

  const renderRoom = (room) => <RoomCardListing room={room} />;
  return (
    <GridContainer xs={11} md={10} xl={9}>
      <Grid
        container
        justify="center"
        alignContent="center"
        spacing={4}
        style={{ marginTop: '48px' }}>
        <Hidden smDown>
          <Grid item sm={4}>
            <Paper
              elevation={0}
              style={{ backgroundImage: `url('./static/images/map-vector.svg')` }}
              classes={{
                root: 'mapPaper'
              }}>
              <ButtonGlobal className="watchMapButton">Xem Bản Đồ</ButtonGlobal>
            </Paper>

            <VisitedRooms visitedRoom={rooms} />
          </Grid>
        </Hidden>

        <Grid item lg={8} md={8} sm={12} xs={12} style={{ marginTop: '-64px' }}>
          {rooms && (
            <ListRoom
              customClass="listRoomContainerWithoutSlickCustom"
              roomData={rooms}
              usingSlider={false}
              title={''}
              spacing={1}
              render={renderRoom}
            />
          )}
        </Grid>
      </Grid>
    </GridContainer>
  );
};

const mapStateToProps = (state: ReducersType) => ({
  filter: state.searchFilter
});

export default compose<IProps, any>(connect(mapStateToProps))(RoomListing);
