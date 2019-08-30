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
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useTranslation } from 'react-i18next';
// @ts-ignore
const RoomListing: FC = (props) => {
  const { state: stateIndexRoom, dispatch } = useContext(RoomIndexContext);
  const { rooms, meta, isLoading } = stateIndexRoom;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
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
    <Fragment>
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
    </Fragment>
  );
};

export default RoomListing;
