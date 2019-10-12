import { ReducersList } from '@/store/Redux/Reducers';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { RoomListReducerAction, getRoomList } from '@/store/Redux/Reducers/LTR/RoomList/roomlist';
import RoomCardItem from './RoomCardItem';
import { Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import { ReactScrollLinkProps } from 'react-scroll/modules/components/Link';
import { animateScroll as scroll } from 'react-scroll/modules';
import NotFoundGlobal from '@/components/Rooms/Lotte/NotFoundGlobal';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(3,0),
    },
  })
);
const RoomListHost: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const roomlist = useSelector<ReducersList, any[]>((state) => state.roomlist.roomlist);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const collectRoom = roomlist.slice(indexOfFirst, indexOfLast);

  const scrollTop = () => {
    let duration = 500 + window.scrollY * 0.1;
    let effect: Partial<ReactScrollLinkProps> = {
      smooth: 'easeInOutQuad',
      isDynamic: true,
      duration
    };
    scroll.scrollToTop(effect);
  };

  const ChangePage = (current: number) => {
    setCurrentPage(current);
    scrollTop();
  };

  const dispatch = useDispatch<Dispatch<RoomListReducerAction>>();
  useEffect(() => {
    if (!roomlist.length) {
      getRoomList(dispatch);
    }
  }, []);

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center" className={classes.title}>
        <h2>{t('roomlist:titleName')}</h2>
      </Grid>
      {roomlist.length ? (
        collectRoom.map((o) => <RoomCardItem key={o.id} room={o} />)
      ) : (
        <NotFoundGlobal height={300} width={250} content={t('roomlist:contentNotFound')}/>
      )}
      {roomlist.length > 10 ? (
        <Pagination
          className="rooms-pagination"
          total={roomlist.length}
          locale={localeInfo}
          pageSize={pageSize}
          current={currentPage}
          onChange={ChangePage}
        />
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default RoomListHost;
