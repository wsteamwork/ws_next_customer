/* global google */
import { ReducersList } from '@/store/Redux/Reducers';
import { faMapSigns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import HPlatform, { HMap, HMapCircle } from 'react-here-map';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface IProps {
  classes?: any;
  district?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 700,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2)
    },
    root: {
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
  const { district, city, latitude, longitude } = props;
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const your_app_id = 'nfVrIaYJrNrOsBPg8An7';
  const your_app_code = '54vN9paKcbDlrQ_E4R4jqw';
  const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude)
  };
  const circleOptions = {
    style: {
      strokeColor: '#1275E8',
      fillColor: 'rgba(212, 92, 91, 0.2)',
      lineWidth: 1,
      strokeWeight: 2,
      strokeOpacity: 0.8,
      fillOpacity: 0.3
    }
  };
  return (
    <Grid>
      <Typography variant="h5" className={classes.title}>
        {t('room:map')}
      </Typography>

      <Typography variant="subtitle1" className={classes.txtAddress}>
        <FontAwesomeIcon className={classes.icon} icon={faMapSigns} />
        {district}, {city}
      </Typography>
      <HPlatform
        app_id={your_app_id}
        app_code={your_app_code}
        useCIT
        useHTTPS
        includeUI
        interactive
        includePlaces>
        <HMap
          style={{
            height: '400px',
            width: '100%'
          }}
          mapOptions={{ center: center, zoom: 15 }}>
          <HMapCircle coords={center} radius={400} options={circleOptions} />
        </HMap>
      </HPlatform>
    </Grid>
  );
};

export default BoxMap;
