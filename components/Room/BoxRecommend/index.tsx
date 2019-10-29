import ListRoom from '@/components/ListRoom';
import RoomCard from '@/components/RoomCard';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 900,
    }
  })
);

const BoxRecommend: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();
  const roomRecommend = useSelector<ReducersList, RoomIndexRes[]>((state) => state.roomPage.roomRecommend);

  const renderRoom = (room) => <RoomCard room={room} isHomepage={false} isFormatPrice={true} />;

  return (
    <Fragment>
      {/*<Typography variant="h5" gutterBottom className={classes.title}>*/}
      {/*  {t('room:recommend')}*/}
      {/*</Typography>*/}
      <ListRoom roomData={roomRecommend}
        usingSlider={true}
        title={t('room:recommend')}
        render={renderRoom} />
    </Fragment>
  );
};

export default BoxRecommend;
