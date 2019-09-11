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
import CompareRooms from '@/components/Rooms/CompareRooms';
import Router from 'next/router';
import LazyLoad from 'react-lazyload';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';

interface IProps {
  classes?: any;
  rooms: RoomIndexRes[];
  hoverAction?(id: number): void;
  pageChange?(current: number, pageSize: number): void;
  usingInMap?: boolean;
}
// @ts-ignore
const RoomListing: FC<IProps> = (props) => {
  const { rooms, hoverAction, usingInMap } = props;
  const { state, dispatch } = useContext(RoomIndexContext);
  const { meta, isLoading } = state;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const changePage = (current: number) => {
    setCurrentPage(current);
    updateRouter(true, 'page', current);
  };
  const renderRooms = (room) => (
    <LazyLoad>
      <RoomCardListing room={room} />
    </LazyLoad>
  );

  useEffect(() => {
    if (meta && meta.pagination) setCurrentPage(meta.pagination.current_page);
  }, [meta]);

  useEffect(() => {
    setIsEmpty(meta !== null && rooms.length === 0 && !isLoading);
  }, [rooms, isLoading]);

  return (
    <Fragment>
      {rooms.length > 0 && !isLoading ? (
        <Fragment>
          <ListRoom
            customClass="listRoomContainerWithoutSlickCustom"
            roomData={rooms}
            usingSlider={false}
            title={''}
            spacing={1}
            render={renderRooms}
            usingInMap={usingInMap}
            hoverAction={hoverAction}
          />
          <Pagination
            className="rooms-pagination"
            total={meta.pagination.total}
            pageSize={meta.pagination.per_page}
            current={currentPage}
            onChange={changePage}
          />
        </Fragment>
      ) : !isEmpty ? (
        <Grid>
          <LoadingSkeleton type={'rooms'} duplicate={5} />
        </Grid>
      ) : (
        <NotFound height={250} width={250} />
      )}
    </Fragment>
  );
};

export default RoomListing;
