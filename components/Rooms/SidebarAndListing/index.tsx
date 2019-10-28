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
import GridContainer from '@/components/Layout/Grid/Container';
import { Grid, Hidden, Paper } from '@material-ui/core';
import ButtonGlobal from '@/components/ButtonGlobal';
import ListRoom from '@/components/ListRoom';
import { Pagination } from 'swiper/dist/js/swiper.esm';
import NotFound from '../Lotte/NotFound';
import LoadingSkeleton from '@/components/Loading/LoadingSkeleton';
import CompareRooms from '../CompareRooms';
import VisitedRooms from '../VisitedRooms';
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
    updateRouter('/rooms',true, 'page', current);
  };

  useEffect(() => {
    setIsEmpty(meta !== null && rooms.length === 0 && !isLoading);
  }, [rooms, isLoading]);

  useEffect(() => {
    if (meta && meta.pagination) setCurrentPage(meta.pagination.current_page);
  }, [meta]);


  const openMap = () => {
    dispatch({ type: 'setMapOpen', isMapOpen: true });
  };

  return (
    <GridContainer xs={11} md={11} lg={10} xl={9}>
      <Grid
        container
        justify="center"
        alignContent="center"
        spacing={4}
        style={{ marginTop: width === 'xs' || width === 'sm' ? '8px' : '48px' }}>
        {meta && !isLoading ? (
          <Hidden smDown>
            <Grid item sm={4} lg={3}>
              <Paper
                elevation={0}
                style={{ backgroundImage: `url('./static/images/map-vector.svg')` }}
                classes={{
                  root: 'mapPaper'
                }}>
                <ButtonGlobal className="watchMapButton" onClick={openMap}>
                  {t('rooms:viewOnMap')}
                </ButtonGlobal>
              </Paper>

              <VisitedRooms />
              <CompareRooms />
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
          <RoomListing usingInMap={false} rooms={rooms} />
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default SidebarAndListing;
