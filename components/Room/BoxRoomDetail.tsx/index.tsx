import React, { FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '@/store/Context/GlobalContext';
import Link from 'next/link';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
    },
  })
);

interface IProps {
}

const BoxRoomDetail: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  return (
    <RoomBasic></RoomBasic>
  );
};

export default BoxRoomDetail;
