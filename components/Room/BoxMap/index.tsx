import React, { Fragment, FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import GoogleMap, { Coords } from 'google-map-react';
import { IRoomDetailsContext, RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { faMapSigns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  classes?: any,
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
      border: '1px solid #e0e0e0',
    },
    txtAddress: {
      color: '#484848',
    },
    icon: {
      marginRight: theme.spacing(1)
    },
  })
);

const BoxMap: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { } = props;
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { room } = state;

  return room && (
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
            key: process.env.REACT_APP_GOOGLE_MAP_KEY || 'AIzaSyA2ePi78OKNDZPNg-twQ74XwX_oczRQUoM',
          }}
          defaultZoom={15}
          defaultCenter={{
            lat: parseFloat(room.latitude),
            lng: parseFloat(room.longitude)
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            new maps.Circle({
              strokeColor: '#FCAB70',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FDBF68',
              fillOpacity: 0.3,
              map,
              center: {
                lat: parseFloat(room.latitude),
                lng: parseFloat(room.longitude),
                // lat: 21.0479552,
                // lng: 105.8368719
              },
              radius: 400,
            })}
        />
      </div>
    </div>
  );
};

export default BoxMap;
