/* global google */
import { placeNearTypeList } from '@/utils/mixins';
import axios from 'axios';
import React, { FC, useEffect } from 'react';
import HPlatform, { HMap, HMapCircle } from 'react-here-map';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
  latitude?: string;
  longitude?: string;
  dp?: any;
}

const HereMap: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { latitude, longitude, dp } = props;
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
    dp({ type: 'setDataPlaces', payload: newData });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <HPlatform app_id={your_app_id} app_code={your_app_code} useCIT useHTTPS includeUI interactive>
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
