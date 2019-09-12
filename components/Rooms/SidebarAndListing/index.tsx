import { useEffect, useContext, useState, Fragment, FC } from 'react';

// import { Grid, Hidden, Paper } from '@material-ui/core';

import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
// import Pagination from 'rc-pagination';
// import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import 'rc-pagination/assets/index.css';
import _ from 'lodash';
import { updateRouter } from '@/store/Context/utility';

import { GlobalContext } from '@/store/Context/GlobalContext';
import { useTranslation } from 'react-i18next';
// import GridContainer from '@/components/Layout/Grid/Container';
// import ButtonGlobal from '@/components/ButtonGlobal';
// import VisitedRooms from '../VisitedRooms';
// import LoadingSkeleton from '@/components/Loading/LoadingSkeleton';
import RoomCardListing from '../RoomCardListing';
import RoomListing from '../RoomListing';
// import CompareRooms from '../CompareRooms';
// @ts-ignore
const SidebarAndListing: FC = (props) => {
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
      <RoomListing />
    </Fragment>
  );
};

export default SidebarAndListing;
