import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileViewInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { RoomReviewIndexResponse } from '@/types/Requests/Rooms/RoomReviewIndexResponse';
import { Divider, Grid, Typography } from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOnRounded';
import React, { FC, Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ListRoom from '../ListRoom';
import RoomCard from '../RoomCard';
import ReviewUser from './ReviewUser';

const UserDetail: FC = (props) => {
  const { t } = useTranslation();
  const profile = useSelector<ReducersList, ProfileViewInfoRes>(
    (state) => state.userProfile.profile
  );
  const userRooms = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.userProfile.userRooms
  );

  const totalReview = useMemo<number>(() => {
    let total = 0;
    if (!!userRooms) {
      userRooms.forEach((item) => {
        total += item.total_review;
      });
    }
    return total;
  }, [userRooms]);

  const reviewArray = useMemo<RoomReviewIndexResponse[]>(() => {
    let array: RoomReviewIndexResponse[] = [];
    if (!!userRooms) {
      const reviews = userRooms.map((room) => room.reviews.data);
      reviews.forEach((review) => {
        array = array.concat(review);
      });
    }
    return array;
  }, [userRooms]);

  const renderRoom = (room) => <RoomCard room={room} isHomepage={true} />;

  return (
    <Grid container className={'userDetail'}>
      <Grid item className={'boxName'}>
        <Typography className={'title'}>{t('user:personInfo')}</Typography>
        <Typography className={'text'}>
          {t('user:joinFrom')} {profile!.created_at.substring(0, 4)}
        </Typography>
        {profile!.description && (
          <Fragment>
            <Divider className={'dividerDescription'} />
            <Typography className={'description'}>{profile.description}</Typography>
          </Fragment>
        )}
        <Divider className={'dividerDescription'} />
        <div className={'extraInfo'}>
          <div className={'infoItem'}>
            <span>
              <LocationIcon className={'imgIcon'} />
            </span>

            <Typography className={'subText'}>
              {profile!.district != t('user:unknown') ? profile!.district + ',' : ''}{' '}
              {profile!.city != t('user:unknown') ? profile!.city + ',' : ''} Việt Nam
            </Typography>
          </div>
        </div>
      </Grid>

      <ListRoom
        roomData={userRooms}
        slidesPerView={userRooms.length < 2 ? 1 : 2}
        usingSlider={true}
        title={t('user:accommodationUpper')}
        render={renderRoom}></ListRoom>

      {totalReview !== 0 && (
        <Fragment>
          <Divider className={'divider'} />
          <Grid item className={'boxName'}>
            <Typography className={'title'}>{t('user:reviews')}</Typography>
            <div className={'userReviews'}>
              {reviewArray!.length > 0 && <ReviewUser review={reviewArray} />}
            </div>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

export default UserDetail;
