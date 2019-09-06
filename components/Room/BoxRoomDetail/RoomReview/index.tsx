import React, { FC, Fragment, useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ReviewItem from '../ReviewItem/index';
import RatingDetail from '../RatingDetail/index';
import _ from 'lodash';
import { ReducersList } from '@/store/Redux/Reducers';
import { useSelector } from 'react-redux';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import 'rc-pagination/assets/index.css';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 900
    },
    boxPagination: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    review: {
      marginBottom: '2rem'
    },
    noComment: {
      marginTop: 10
    },
    mgTop:{
      marginTop: theme.spacing(3)
    }
  })
);

interface IProps {
  room: RoomIndexRes;
  showComment?:boolean;
}

const RoomReview: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  // const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const {room,showComment} = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(4);
  const [reviews, setReviews] = useState<any>(room.reviews.data);

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const newData = reviews.slice(indexOfFirst, indexOfLast);

  const ChangePage = (current: number) => {
    setCurrentPage(current);
  };

  return (
    room ? (
      <Fragment>
             <Grid container>
               <Grid item xs={12}>
                 <Typography variant="h5" className={classes.name}>
                   {t('rooms:review')}({room.total_review})
                 </Typography>
               </Grid>
               {room.total_review !== 0 ? (
                 <Fragment>
                   <Grid container item xs={12}>
                     <Grid item xs={12}>
                       <RatingDetail room={room}/>
                     </Grid>
                   </Grid>

                   {showComment ? (
                     <Grid container className={classes.mgTop}>
                       <Grid container item xs={12} spacing={2}>
                         {_.map(newData, (obj, i) =>
                           obj.status === 1 ? (
                             <Grid key={i} item xs={12} sm={6} className={classes.review} container alignItems='center'>
                               <ReviewItem review={obj} />
                             </Grid>
                           ) : (
                             ''
                           )
                         )}
                       </Grid>
                       {room.reviews.data.length > 4 ? (
                         <Grid item xs={12} className={classes.boxPagination}>
                           <Pagination
                             className="rooms-pagination"
                             total={reviews.length}
                             locale={localeInfo}
                             pageSize={pageSize}
                             current={currentPage}
                             onChange={ChangePage}
                           />
                         </Grid>
                       ) : (
                         ''
                       )}
                     </Grid>
                   ) : ''}

                 </Fragment>
               ) : (
                 <Grid container>
                   <Grid item xs={12}>
                     <Typography variant="body1" className={classes.noComment}>
                       {t('rooms:noReview')}
                     </Typography>
                   </Grid>
                 </Grid>
               )}
             </Grid>
           </Fragment>
      )
   : <Fragment/> );
};

export default RoomReview;
