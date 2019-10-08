import CheckboxCustom from '@/components/LTR/Merchant/Listing/CreateListing/Basic/CheckboxCustom';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { getRoomType, RoomTypeData } from '@/components/Rooms/FilterActions/RoomType/context';
import { ReducersList } from '@/store/Redux/Reducers';
import { CreateListingActions, CreateListingState } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, FormikActions, FormikProps } from 'formik';
import React, { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface IProps {
  classes?: any;
}

interface FormValues {
  lease_type: number;
  accommodation_type: number;
  stay_with_host: number;
}

const useStyles = makeStyles((theme) => ({
  checked: {
    color: '#FFA712 !important'
  }
}));

const Basic: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { accommodationType, stayWithHost } = useSelector<ReducersList, CreateListingState>(
    (state) => state.createListing
  );
  const [isStayWithHost, setStayWithHost] = useState<boolean>(!!stayWithHost);

  const [roomType, setRoomType] = useState<number>(accommodationType);
  const [roomTypesData, setRoomTypesData] = useState<RoomTypeData[]>([]);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();

  useEffect(() => {
    getRoomType(setRoomTypesData);
  }, []);

  const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStayWithHost(checked);
  };

  useEffect(() => {
    dispatch({
      type: 'SET_STAY_WITH_HOST',
      payload: isStayWithHost ? 1 : 0
    });
  }, [isStayWithHost]);

  const initFormValue: FormValues = {
    lease_type: null,
    accommodation_type: null,
    stay_with_host: null
  };

  const handleFormSubmit = (values: FormValues, actions: FormikActions<FormValues>) => {

    const data: any = {
      lease_type: values.lease_type,
      accommodation_type: values.accommodation_type,
      stay_with_host: values.stay_with_host
    };
  };

  const callBackOnChange = (value: string) => {
    dispatch({
      type: 'SET_ACCOMMODATION_TYPE',
      payload: parseInt(value)
    });
  };

  return (
    <div>
      <Grid className="createListing-title">
        <Grid className="createListing-heading-1">Thông tin cơ bản</Grid>
      </Grid>

      <Formik
        initialValues={initFormValue}
        onSubmit={handleFormSubmit}
        render={({
          values,
          handleSubmit,
          touched,
          errors,
          handleChange,
          handleBlur,
          isSubmitting
        }: FormikProps<FormValues>) => (
            <form onSubmit={handleSubmit}>
              {/* onSubmit={handleSubmit} */}
              <CheckboxCustom />

              <Grid style={{ width: 'calc(50% - 8px)' }}>
                {/* <h3>Loại Căn hộ: </h3> */}
                <SelectCustom
                  name="accommodation_type"
                  // onChange={handleChangeSelect}
                  onBlur={handleBlur}
                  value={roomType}
                  title="Loại Căn hộ: "
                  options={roomTypesData}
                  callBackOnChange={callBackOnChange}
                />
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    disableRipple
                    classes={{ checked: classes.checked }}
                    checked={isStayWithHost}
                    onChange={handleChangeCheckBox}
                    value="stayWithHost"
                  />
                }
                label="Bạn có đang ở trong căn hộ này không?"
              />
            </form>
          )}
      />
    </div>
  );
};

export default Basic;
