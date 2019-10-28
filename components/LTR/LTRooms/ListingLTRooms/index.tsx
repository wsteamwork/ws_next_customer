import React, { Fragment, FC, useContext, useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import LoadingSkeleton from '@/components/Loading/LoadingSkeleton';
import GridContainer from '@/components/Layout/Grid/Container';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useTranslation } from 'react-i18next';
import LTRoomCardListing from '@/components/LTR/LTRooms/LTRoomCardListing';
import Pagination from 'rc-pagination';
import NotFound from '@/components/Rooms/Lotte/NotFound';
import { updateRouter } from '@/store/Context/utility';
import LazyLoad from 'react-lazyload';
import RoomCardListing from '@/components/Rooms/RoomCardListing';
import ListRoom from '@/components/ListRoom';

interface IProps {
  classes?: any,
  hoverAction?(id: number): void;
  pageChange?(current: number, pageSize: number): void;
  usingInMap?: boolean;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    titleList:{
      marginTop:48,
      fontWeight: 600
    }
  })
);

const ListingLTRooms: FC<IProps> = (props) => {
  const classes                             = useStyles(props);
  const { hoverAction, usingInMap }         = props;
  const { state: stateIndexRoom } = useContext(RoomIndexContext);
  const { longtermRooms, meta, isLoading }  = stateIndexRoom;
  const [isEmpty, setIsEmpty]               = useState<boolean>(false);
  const { width }                           = useContext(GlobalContext);
  const { t }                               = useTranslation();
  const [currentPage, setCurrentPage]       = useState<number>(1);

  const renderRooms = (room) => (
    <LazyLoad>
      <LTRoomCardListing room={room}/>
    </LazyLoad>
  );

  const changePage  = (current: number) => {
    setCurrentPage(current);
    updateRouter('/long-term-rooms',true, 'page', current);
  };

  useEffect(() => {
    if (meta && meta.pagination) setCurrentPage(meta.pagination.current_page);
  }, [meta]);

  useEffect(() => {
    setIsEmpty(meta !== null && longtermRooms.length === 0 && !isLoading);
  }, [longtermRooms, isLoading]);

  return (
    <GridContainer xs = {11} md = {11} lg = {10}>
      {longtermRooms.length > 0 && !isLoading ? (
        <Fragment>
          {meta && (
            <Typography variant='h5' className={classes.titleList}>
            {meta.pagination ? `Tổng số ${meta.pagination.total} kết quả tìm kiếm` : ''}
          </Typography>)}

          <ListRoom
            customClass=''
            roomData={longtermRooms}
            usingSlider={false}
            title={''}
            spacing={2}
            render={renderRooms}
            usingInMap={usingInMap}
            hoverAction={hoverAction}
            xs={12} sm={6} md={4} lg={4} xl={3}
          />
          <Pagination
            className = 'rooms-pagination'
            total = {meta.pagination.total}
            pageSize = {meta.pagination.per_page}
            current = {currentPage}
            onChange = {changePage}
          />
        </Fragment>
      ) : !isEmpty ? (
        <Grid style={{marginTop:32}}>
          <LoadingSkeleton type = {'rooms'} duplicate = {5} />
        </Grid>
      ) : (
        <NotFound height = {250} width = {250} />
      )}
    </GridContainer>
  );
};

export default ListingLTRooms;
