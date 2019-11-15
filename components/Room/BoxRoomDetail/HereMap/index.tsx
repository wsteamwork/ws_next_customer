/* global google */
import { Theme, Grid } from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import React, { FC, useState, useEffect, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import HPlatform, { HMap, HMapCircle } from 'react-here-map';
import axios from 'axios';
import { placeNearTypeList } from '@/utils/mixins';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
interface IProps {
  classes?: any;
  latitude?: string;
  longitude?: string;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
   
  })
);

const HereMap: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { dispatch, state } = useContext(RoomDetailsContext);
  const classes = useStyles(props);
  const { latitude, longitude } = props;
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
  const fetchData = async () => {
    let newData = [];
    for (let i = 0; i < placeNearTypeList.length; i++) {
      let item = placeNearTypeList[i];
      await axios
        .get(`https://places.cit.api.here.com/places/v1/discover/around`, {
          params: {
            app_id: your_app_id,
            app_code: your_app_code,
            at: `${parseFloat(latitude)},${parseFloat(longitude)}`,
            cat: item.name,
            pretty: true,
            size: item.size
          }
        })
        .then((res) => {
          newData = [...newData, res.data.results.items];
        })
        .catch((err) => console.error(err));
    }
    dispatch({ type: 'setDataPlaces', payload: newData });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
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
  );
};

export default HereMap;
