import MetroGridImage from '@/components/Layout/MetroGridImage';
import ListRoom from '@/components/ListRoom';
import RoomCard from '@/components/RoomCard';
import SliderTypeApartment from '@/components/Slider/HomePage/SliderTypeApartment';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import React, { Fragment, FC } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
interface IProps { };

const HomepageST: FC<IProps> = (props) => {

  const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.roomHomepage.roomsHot
  );
  const renderRoom = (room) => <RoomCard city={room.city.data.name}
    district={room.district.data.name}
    instantbook={room.instant_book}
    roomID={room.id}
    roomName={room.room_name}
    roomNumber={room.number_room}
    roomType={room.room_type_txt}
    roomImage={room.avatar_image}
    price_day={room.price_day}
    price_hour={room.price_hour}
    total_review={room.total_review}
    avg_rating={room.avg_rating}
    isHomepage={true} />;

  const { t } = useTranslation();

  return (
    <Fragment>
      <LazyLoad offset="150">
        <SliderTypeApartment />
      </LazyLoad>
      <LazyLoad offset="150">
        <MetroGridImage />
      </LazyLoad>
      <LazyLoad offset="150">
        <ListRoom
          roomData={roomsHot}
          usingSlider={true}
          title={t('home:editorChoice')}
          render={renderRoom}
        />
      </LazyLoad>
    </Fragment>
  )
}
export default HomepageST;