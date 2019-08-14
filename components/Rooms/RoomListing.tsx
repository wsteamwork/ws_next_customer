import { useEffect, useContext, useState, Fragment, FC } from 'react';
import GridContainer from '../Layout/Grid/Container';
import { Grid, Hidden, Paper } from '@material-ui/core';
import RoomCardListing from './RoomCardListing';
import ButtonGlobal from '../ButtonGlobal';
import VisitedRooms from './VisitedRooms';
import ListRoom from '../ListRoom';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import 'rc-pagination/assets/index.css';
import _ from 'lodash';
import { updateRouter } from '@/store/Context/utility';
import LoadingSkeleton from '../Loading/LoadingSkeleton';
import NotFound from './Lotte/NotFound';

// @ts-ignore
const RoomListing: FC = (props) => {
  const { state: stateIndexRoom, dispatch } = useContext(RoomIndexContext);
  const { rooms, meta, isLoading } = stateIndexRoom;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const changePage = (current: number) => {
    setCurrentPage(current);
    updateRouter(true, 'page', current);
  };

  useEffect(() => {
    setIsEmpty(meta !== null && rooms.length === 0 && !isLoading);
  }, [rooms, isLoading]);

  const renderRoom = (room) => <RoomCardListing room={room} />;

  const openMap = () => {
    dispatch({ type: 'setMapOpen', isMapOpen: true });
  };

  return (
    <GridContainer xs={11} md={10} xl={9}>
      <Grid
        container
        justify="center"
        alignContent="center"
        spacing={4}
        style={{ marginTop: '48px' }}>
        {meta ? (
          <Hidden smDown>
            <Grid item sm={4} lg={3}>
              <Paper
                elevation={0}
                style={{ backgroundImage: `url('./static/images/map-vector.svg')` }}
                classes={{
                  root: 'mapPaper'
                }}>
                <ButtonGlobal className="watchMapButton" onClick={openMap}>
                  Xem Bản Đồ
                </ButtonGlobal>
              </Paper>

              <VisitedRooms visitedRoom={rooms} />
            </Grid>
          </Hidden>
        ) : (
            <Hidden smDown>
              <Grid item sm={4} lg={3}>
                <LoadingSkeleton type={'sideBar'} />
              </Grid>
            </Hidden>
          )}

        <Grid item lg={9} md={8} sm={12} xs={12}>
          {rooms.length !== 0 ? (
            <Fragment>
              <ListRoom
                customClass="listRoomContainerWithoutSlickCustom"
                roomData={rooms}
                usingSlider={false}
                title={''}
                spacing={1}
                render={renderRoom}
              />
              <Pagination
                className="rooms-pagination"
                total={meta.pagination.total}
                locale={localeInfo}
                pageSize={meta.pagination.per_page}
                current={currentPage}
                onChange={changePage}
              />
            </Fragment>
          ) : !isEmpty ? (
            <Hidden xsDown>
              <Grid>
                <LoadingSkeleton type={'rooms'} duplicate={5} />
              </Grid>
            </Hidden>
          ) : (
                ''
              )}
          {isEmpty ? <NotFound height={250} width={250} /> : ''}
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default RoomListing;
