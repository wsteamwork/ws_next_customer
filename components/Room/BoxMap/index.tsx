import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { faMapSigns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import GoogleMap from 'google-map-react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any;
  room: RoomIndexRes
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 900,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2)
    },
    root: {
      height: 400,
      margin: '10px 0',
      borderRadius: 5,
      overflow: 'hidden',
      border: '1px solid #e0e0e0'
    },
    txtAddress: {
      color: '#484848'
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  })
);

const BoxMap: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { room } = props;
  // const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  return (
    room && (
      <div>
        <Typography variant="h5" className={classes.title}>
          {t('room:map')}
        </Typography>

        <Typography variant="subtitle1" className={classes.txtAddress}>
          <FontAwesomeIcon className={classes.icon} icon={faMapSigns} />
          {room.district.data.name}, {room.city.data.name}
        </Typography>

        <div className={classes.root}>
          <GoogleMap
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAP_KEY || 'AIzaSyA2ePi78OKNDZPNg-twQ74XwX_oczRQUoM'
            }}
            defaultZoom={15}
            defaultCenter={{
              lat: room.latitude ? parseFloat(room.latitude) : 0,
              lng: room.longitude ? parseFloat(room.longitude) : 0
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              room.latitude ?
                new maps.Circle({
                  strokeColor: '#FCAB70',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#FDBF68',
                  fillOpacity: 0.3,
                  map,
                  center: {
                    lat: room.latitude,
                    lng: room.longitude
                  },
                  radius: 400
                }) : null
            }}
          />
        </div>
      </div>
    )
  );
};

export default BoxMap;
