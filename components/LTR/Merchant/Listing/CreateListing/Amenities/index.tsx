import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CardAmenities from './CardAmenities';
import { AmenitiesIndexGetParams } from '@/types/Requests/LTR/Amenities/AmenitiesRequests';
import qs from 'query-string';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { AmenitiesIndexRes } from '@/types/Requests/LTR/Amenities/AmenitiesResponses';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
interface IProps {
  classes?: any;
  activeStep: number;
  steps: string[];
  setActiveStep: Dispatch<SetStateAction<number>>;
  nextLink: string;
}
const Amenities: FC<IProps> = (props) => {
  const [amenities, setAmenities] = useState<any>([]);
  const { activeStep, steps, setActiveStep, nextLink } = props;
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
          <BottomNavigation
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            nextLink={nextLink}
            />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Amenities;
