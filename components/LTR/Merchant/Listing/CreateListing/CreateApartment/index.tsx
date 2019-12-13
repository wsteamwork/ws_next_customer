/*global google*/
import CitiesList from '@/components/LTR/Merchant/Listing/CreateListing/Location/CitiesList';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  CreateListingActions,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { FormControl, OutlinedInput, Theme, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import deepEqual from 'lodash.isequal';
import React, { Dispatch, FC, Fragment, useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, WithGoogleMapProps } from 'react-google-maps';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SearchPlaceCustom from '../Location/SearchPlaceCustom';
import CardTextarea from '../Description/CardTextarea';
import { makeStyles, createStyles } from '@material-ui/styles';
import classNames from 'classnames';
interface IProps {}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    normal_divider: {
      margin: theme.spacing(3, 0)
    },
    margin_top: {
      marginTop: '32px !important'
    },
    notchedOutline: {
      border: 'none',
      '&:focus': {
        border: 'none'
      }
    }
  })
);
interface Coordinate {
  lat: number;
  lng: number;
}

interface GoogleMapProps extends WithGoogleMapProps {
  defaultCenter: Coordinate | null;
  coordinate: Coordinate;
  handleDragEnd: (e: google.maps.MouseEvent) => void;
}

interface FormValues {
  name: string;
  name_en: string;
  city: string;
  building: string;
  district: string;
}

const useValidatation = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('details:requiredName'))
      .min(10, t('details:name10Character'))
      .max(100, t('details:name100Character')),
    name_en: Yup.string()
      .required(t('details:requiredEnName'))
      .min(10, t('details:nameEn10Character'))
      .max(100, t('details:nameEn100Character')),
    city: Yup.string().required(t('basic:cityRequired'))
  });

  return FormValidationSchema;
};

export const InputFeedback = ({ error }) =>
  error ? <div className={classNames('input-feedback')}>{error}</div> : null;

const CreateApartmentForListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {
    address,
    building,
    disableSubmit,
    coordinate: coordinateState,
    district_id,
    city_id
  } = useSelector<ReducersList, CreateListingState>((state) => state.createListing);
  const [addressInput, setAddress] = useState<string>(address);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [coordinateMarker, setCoordinateMarker] = useState<Coordinate>(coordinateState);
  const [defaultCenter, setDefaultCenter] = useState<Coordinate | null>(coordinateState);
  const [district, setDistrict] = useState<number>(district_id);
  const [districtList, setDistrictList] = useState<any[]>(null);
  const [disabledDistrictField, setDisabledDistrictField] = useState<boolean>(true);
  const [disableSubmitForm, setDisableSubmit] = useState<boolean>(disableSubmit);
  const { t } = useTranslation();
  let refStandaloneBox: any = null;
  const onSearchBoxMounted = (ref) => {
    refStandaloneBox = ref;
  };

  const FormValidationSchema = useValidatation();

  useEffect(() => {
    dispatch({
      type: 'SET_DISABLE_SUBMIT',
      payload: disableSubmitForm
    });
  }, [disableSubmitForm]);

  useEffect(() => {
    dispatch({
      type: 'SET_COORDINATE',
      payload: coordinateMarker
    });
  }, [coordinateMarker]);

  useEffect(() => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: addressInput
    });
  }, [addressInput]);

  const handleDragEnd = (e: google.maps.MouseEvent) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCoordinateMarker({
      lat,
      lng
    });
  };
  const MapWithAMarker = withGoogleMap<GoogleMapProps>((props) => (
    <Fragment>
      {useMemo(
        () => (
          <GoogleMap defaultZoom={14} defaultCenter={props.defaultCenter} streetView={null}>
            <Marker position={props.coordinate} defaultDraggable onDragEnd={props.handleDragEnd} />
          </GoogleMap>
        ),
        [props.defaultCenter]
      )}
    </Fragment>
  ));

  const callBackOnChange = (value) => {
    setDistrict(value);
    dispatch({
      type: 'SET_DISTRICT_ID',
      payload: parseInt(value)
    });
  };
  const initFormValue: FormValues = {
    name: '',
    name_en: '',
    city: '',
    building: building,
    district: ''
  };

  const handleFormSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    return {};
  };

  return (
    <div className="step1-tab3-location">
      <Grid className="createListing-location">
        <Grid className="createListing-heading-1">{t('host:address')}</Grid>
        <Grid className="createListing-subTitle">{t('host:provideAddress')}</Grid>
      </Grid>
      <Formik
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={FormValidationSchema}
        initialValues={initFormValue}
        onSubmit={handleFormSubmit}
        render={({
          values,
          handleSubmit,
          touched,
          errors,
          initialValues,
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched
        }: FormikProps<FormValues>) => {
          const hasChanged = !deepEqual(values, initialValues);
          const hasErrors = Object.keys(errors).length > 0;
          setDisableSubmit(!hasChanged || hasErrors || isSubmitting);
          return (
            <form onSubmit={handleSubmit}>
              <Grid container style={{ display: 'flex' }}>
                <Grid item xs={12}>
                  <Grid item xs={6}>
                    <Grid style={{ marginBottom: 32 }}>
                      <CardTextarea
                        name="name"
                        label={t('details:listingName')}
                        sub_label={t('details:subName')}
                        value={values.name.replace(/\s+/g, ' ')}
                        classTextField={
                          !!(values.name.length < 10 && touched!.name)
                            ? 'textarea error_textarea'
                            : 'textarea'
                        }
                        show_error={!!(values.name.length < 10 && touched!.name)}
                        error_message={errors.name ? errors.name : t('details:defaultError')}
                        rows={1}
                        rowsMax={1}
                        max_char={100}
                        multiline={true}
                        classMaxChar={
                          !!(values.name.length < 10 && touched!.name)
                            ? 'error_char'
                            : 'remain_char'
                        }
                        InputProps={{
                          classes: {
                            notchedOutline: !!(values.name.length < 10 && touched!.name)
                              ? classes.notchedOutline
                              : ''
                          }
                        }}
                        autoFocus={true}
                        inputProps={{ maxLength: 100 }}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={6}>
                    <Grid style={{ marginBottom: 32 }}>
                      <CardTextarea
                        name="name_en"
                        label={t('details:listingNameEN')}
                        sub_label={t('details:subName')}
                        value={values.name_en.replace(/\s+/g, ' ')}
                        classTextField={
                          !!(values.name_en.length < 10 && touched!.name_en)
                            ? 'textarea error_textarea'
                            : 'textarea'
                        }
                        show_error={!!(values.name_en.length < 10 && touched!.name_en)}
                        error_message={errors.name_en ? errors.name_en : t('details:defaultError')}
                        rows={1}
                        rowsMax={1}
                        max_char={100}
                        multiline={true}
                        classMaxChar={
                          !!(values.name_en.length < 10 && touched!.name_en)
                            ? 'error_char'
                            : 'remain_char'
                        }
                        InputProps={{
                          classes: {
                            notchedOutline: !!(values.name_en.length < 10 && touched!.name_en)
                              ? classes.notchedOutline
                              : ''
                          }
                        }}
                        autoFocus={true}
                        inputProps={{ maxLength: 100 }}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={6}>
                    <Grid style={{ marginBottom: 32 }}>
                      <Typography variant="h1" gutterBottom className="label main_label">
                        {t('host:city')}
                      </Typography>

                      <CitiesList
                        onChange={setFieldValue}
                        valueCity={values.city}
                        onBlur={setFieldTouched}
                        districtList={districtList}
                        setDistrictList={setDistrictList}
                        setDisabledDistrictField={setDisabledDistrictField}
                        setDistrict={setDistrict}
                      />
                      {touched.city && <InputFeedback error={errors.city} />}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h1"
                    gutterBottom
                    className={classNames(classes.customTitle, 'label main_label')}>
                    {t('host:district')}
                  </Typography>
                  <Grid item xs={6}>
                    <SelectCustom
                      onChange={(e) => {
                        handleChange(e);
                        callBackOnChange(e.target.value);
                      }}
                      name="district"
                      value={values.district}
                      options={districtList}
                      onBlurTouched={setFieldTouched}
                      disabled={disabledDistrictField}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {values.city ? (
                <Grid container>
                  <LazyLoad>
                    <Grid item xs={12}>
                      <Grid item xs={6}>
                        <Grid item style={{ margin: '20px 0' }}>
                          <Typography variant="h1" gutterBottom className="label main_label">
                            {t('host:addressSpecific')}
                          </Typography>
                          <div data-standalone-searchbox="">
                            <SearchPlaceCustom
                              setCoordinateMarker={setCoordinateMarker}
                              setDefaultCenter={setDefaultCenter}
                              setAddress={setAddress}
                              addressInput={addressInput}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item xs={6}>
                        <Grid item style={{ margin: '20px 0' }}>
                          <Typography variant="h1" gutterBottom className="label main_label">
                            {t('host:building')}
                          </Typography>
                          <FormControl fullWidth variant="outlined">
                            <OutlinedInput
                              placeholder={t('host:buildingPlaceholder')}
                              id="component-outlined"
                              value={values.building}
                              onChange={(e) => {
                                setFieldValue('building', e.target.value);
                              }}
                              onBlur={(e: any) => {
                                handleBlur(e);
                              }}
                              labelWidth={0}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </LazyLoad>
                </Grid>
              ) : (
                ''
              )}
            </form>
          );
        }}
      />
      {addressInput ? (
        <Fragment>
          <Grid className="createListing-heading-2">
            <Typography variant="h1" gutterBottom className="label main_label">
              {t('host:mapAddressTitle')}
            </Typography>
          </Grid>
          <Typography variant="h1" gutterBottom className="label sub_label">
            {t('host:mapAddressSubTitle')}
          </Typography>
          {defaultCenter && (
            <MapWithAMarker
              containerElement={<div style={{ height: `350px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              defaultCenter={defaultCenter}
              coordinate={coordinateMarker}
              handleDragEnd={handleDragEnd}
            />
          )}
        </Fragment>
      ) : (
        ''
      )}
    </div>
  );
};

export default CreateApartmentForListing;
