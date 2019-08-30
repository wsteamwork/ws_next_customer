import React, { FC } from 'react';
import { Coords, ChildComponentProps } from 'google-map-react';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import numeral from 'numeral';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import CustomPopper from '@/components/CustomPopper';
import RoomCard from '@/components/RoomCard';

interface IProps extends Coords, ChildComponentProps {
  room: RoomIndexRes;
  isHover?: boolean;
  focus(room: RoomIndexRes): void;
}

// @ts-ignore
const MapMarker: FC<IProps> = (props) => {
  const { room, $hover, isHover, focus } = props;

  // console.log(room);

  return (
    <CustomPopper
      arrow
      multiple
      placement="top"
      duration={200}
      trigger="click"
      theme="light-border"
      interactive
      onTrigger={() => focus(room)}
      content={<Grid className="mapRoom">{<RoomCard room={room} isHomepage={true} />}</Grid>}>
      <Grid className={classNames('arrow_box')}>
        <p className={isHover ? 'arrow_hover' : ''}>{numeral(room.price_day).format('0,0')}đ</p>
      </Grid>
    </CustomPopper>
  );
};

export default MapMarker;
