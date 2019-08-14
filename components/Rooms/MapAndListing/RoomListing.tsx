import { useContext, FC } from 'react';
import { Grid, Hidden, Paper } from '@material-ui/core';
import RoomCardListing from '../RoomCardListing';
import ButtonGlobal from '../../ButtonGlobal';
import VisitedRooms from '../VisitedRooms';
import ListRoom from '../../ListRoom';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import GridContainer from '@/components/Layout/Grid/Container';
import LazyLoad from 'react-lazyload';

interface IProps { }

const RoomListing: FC<IProps> = (props) => {
  const { state } = useContext(RoomIndexContext);
  const { rooms } = state;

  const renderRoom = (room) => (
    <LazyLoad>
      <RoomCardListing room={room} />
    </LazyLoad>
  );

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

export default RoomListing;
