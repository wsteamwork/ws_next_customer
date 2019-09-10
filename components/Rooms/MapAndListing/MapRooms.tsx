import React, { ComponentType, Fragment, useState, useContext, memo, useEffect } from 'react';
import _ from 'lodash';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import NotFound from '../Lotte/NotFound';
// import LazyLoad from 'react-lazyload';
import ListRoom from '@/components/ListRoom';
import RoomCardListing from '../RoomCardListing';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
// import { updateRouter } from '@/store/Context/utility';
import { Grid } from '@material-ui/core';
import LoadingSkeleton from '@/components/Loading/LoadingSkeleton';

interface IProps {
  classes?: any;
  rooms: RoomIndexRes[];
  page: number;
  hoverAction(id: number): void;
  hoverId: number;
  focusRoomLocation(room: RoomIndexRes): void;
  pageChange(current: number, pageSize: number): void;
  defaultRoom: RoomIndexRes;
}

// @ts-ignore
const MapRooms: FC<IProps> = (props) => {
  const { rooms, hoverId, hoverAction, focusRoomLocation } = props;
  const { state } = useContext(RoomIndexContext);
  const { meta, isLoading } = state;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const changePage = (current: number) => {
    setCurrentPage(current);
  };


  useEffect(() => {
    setIsEmpty(meta !== null && rooms.length === 0 && !isLoading);
  }, [rooms, isLoading]);

  const renderMapRooms = (room) => <RoomCardListing room={room} />;

  return (
    <Fragment>
      {rooms.length > 0 ? (
        <Fragment>
          {rooms && (
            <Fragment>
              <ListRoom
                customClass="listRoomContainerWithoutSlickCustom"
                roomData={rooms}
                usingSlider={false}
                title={''}
                spacing={1}
                render={renderMapRooms}
                usingInMap={true}
                hoverId={hoverId}
                hoverAction={hoverAction}
                focusRoomLocation={focusRoomLocation}
              />
              <Pagination
                className="rooms-pagination"
                total={meta.pagination.total}
                pageSize={meta.pagination.per_page}
                current={currentPage}
                onChange={changePage}
              />
            </Fragment>
          )}
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

export default MapRooms;
