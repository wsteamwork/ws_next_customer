import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment, useState, useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CardAmenities from './CardAmenities';
import { AmenitiesIndexGetParams } from '@/types/Requests/LTR/Amenities/AmenitiesRequests';
import qs from 'query-string';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { AmenitiesIndexRes } from '@/types/Requests/LTR/Amenities/AmenitiesResponses';
interface IProps {
  classes?: any;
}
const Amenities: FC<IProps> = (props) => {
  const [amenities, setAmenities] = useState<any>([]);
  const getAmenities = async () => {
    const url = `comforts`;
    const res: AxiosRes<any> = await axios_merchant.get(url);
    setAmenities(res.data);
  };
  useEffect(() => {
    getAmenities();
  }, []);

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} className="wrapper">
          {amenities['facilities'] ? (
            <CardAmenities
              label={amenities['facilities'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['facilities']}
            />
          ) : (
            ''
          )}
          {amenities['bathrooms'] ? (
            <CardAmenities
              label={amenities['bathrooms'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['bathrooms']}
            />
          ) : (
            ''
          )}
          {amenities['kitchens'] ? (
            <CardAmenities
              label={amenities['kitchens'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['kitchens']}
            />
          ) : (
            ''
          )}
          {amenities['entertainments'] ? (
            <CardAmenities
              label={amenities['entertainments'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['entertainments']}
            />
          ) : (
            ''
          )}
          {amenities['outdoors'] ? (
            <CardAmenities
              label={amenities['outdoors'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['outdoors']}
            />
          ) : (
            ''
          )}
          {amenities['others'] ? (
            <CardAmenities
              label={amenities['others'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['others']}
            />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Amenities;
