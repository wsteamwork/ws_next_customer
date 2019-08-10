import { useEffect, useContext, useState, Fragment } from 'react';
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
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import 'rc-pagination/assets/index.css';
import _ from 'lodash';
import Link from 'next/link';
import { updateRouter } from '@/store/Context/utility';
import RoomCard from '../RoomCard';
import ContentLoader from 'react-content-loader';
import LoadingSkeleton from '../Loading/LoadingSkeleton';
import NotFound from './Lotte/NotFound';

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
  const { rooms, meta } = stateIndexRoom;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const changePage = (current: number) => {
    console.log(current);
    setCurrentPage(current);
    updateRouter(true, 'page', current);
  };

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

  useEffect(() => {
    setIsEmpty(meta !== null && rooms.length === 0 && !isLoading);
  }, [rooms, isLoading]);

  useEffect(() => {
    console.log(isEmpty);
  });

  const renderRoom = (room) => <RoomCardListing room={room} />;
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
                <ButtonGlobal className="watchMapButton">Xem Bản Đồ</ButtonGlobal>
              </Paper>

              <VisitedRooms visitedRoom={rooms} />
            </Grid>
          </Hidden>
        ) : (
          <Grid item sm={4} lg={3}>
            <LoadingSkeleton type={'sideBar'} />
          </Grid>
        )}

        <Grid item lg={9} md={8} sm={12} xs={12} style={{ marginTop: '-69px' }}>
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
            <Grid style={{ marginTop: 64 }}>
              <LoadingSkeleton type={'rooms'} duplicate={5} />
            </Grid>
          ) : (
            ''
          )}
          {isEmpty ? <NotFound height={250} width={250} /> : ''}
        </Grid>

        {/* <Hidden smDown>
          <Grid item sm={4} lg={3}>
            {rooms && meta ? (
              <Fragment>
                <Paper
                  elevation={0}
                  style={{ backgroundImage: `url('./static/images/map-vector.svg')` }}
                  classes={{
                    root: 'mapPaper'
                  }}>
                  <ButtonGlobal className="watchMapButton">Xem Bản Đồ</ButtonGlobal>
                </Paper>

                <VisitedRooms visitedRoom={rooms} />
              </Fragment>
            ) : (
              <LoadingSkeleton type={'sideBar'} />
            )}
          </Grid>
        </Hidden>

        <Grid item lg={9} md={8} sm={12} xs={12} style={{ marginTop: '-64px' }}>
          {rooms && meta ? (
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
          ) : (
            <Grid style={{ marginTop: 64 }}>
              <LoadingSkeleton type={'rooms'} duplicate={5} />
            </Grid>
          )} */}
        {/* </Grid> */}
      </Grid>
    </GridContainer>
  );
};

const mapStateToProps = (state: ReducersType) => ({
  filter: state.searchFilter
});

export default compose<IProps, any>(connect(mapStateToProps))(RoomListing);
