import NotFoundGlobal from '@/components/Rooms/Lotte/NotFoundGlobal';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getRoomList, RoomListReducerAction } from '@/store/Redux/Reducers/LTR/RoomList/roomlist';
import { getCookieFromReq } from '@/utils/mixins';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { NextPage } from 'next';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll/modules';
import { ReactScrollLinkProps } from 'react-scroll/modules/components/Link';
import { Dispatch } from 'redux';
import BookingCardItem from './BookingCardItem';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(3, 0),
    },
  })
);
const LongTermBookingList: NextPage = (props) => {
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
  }, [roomlist]);

  return (
    <Fragment>
      {roomlist.length ? (
        collectRoom.map((o) => <BookingCardItem key={o.id} room={o} />)
      ) : (
          <NotFoundGlobal height={300} width={250} content={t('roomlist:contentNotFound')} />
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
LongTermBookingList.getInitialProps = async ({ req, store }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const token = getCookieFromReq(req, '_token');
  const res = await getRoomList(store.dispatch, initLanguage, token);

  return {};
};
export default LongTermBookingList;
