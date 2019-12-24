import React, { Fragment, FC, useContext, useState, useEffect, SyntheticEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Box,
  TextField,
  FormHelperText,
  Snackbar,
  Grid
} from '@material-ui/core';
import { TransitionCustom } from '@/components/Book/BookingForm';
import CloseIcon from '@material-ui/icons/Close';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { FormikProps, Formik, FormikHelpers } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { InputFeedback } from '@/components/LTR/Merchant/Listing/CreateListing/Location';
import ButtonGlobal from '@/components/ButtonGlobal';
import * as Yup from 'yup';
import { AddToBuildingReq } from '@/types/Requests/LTR/CreateListing/StoreRoomWithinBuilding/RoomWithinBuilding';
import { axios_merchant } from '@/utils/axiosInstance';
import { ApartmentBuildingsRes } from '@/types/Requests/LTR/CreateListing/ApartmentBuildings/ApartmentBuildingsRes';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RoomListReducerAction, getRoomList } from '@/store/Redux/Reducers/LTR/RoomList/roomlist';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any;
  open: boolean;
  roomID: number;
  handleClose: () => void;
}

interface FormValues {
  apartment_building_id: number;
  room_number: string;
  floor: string;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxTitle: {
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      color: '#767676',
      fontSize: '14px',
      fontWeight: 600
    },
    root: {
      padding: '16px 24px',
      borderRadius: 16,
      minWidth: 500
    },
    boxContent: {
      minHeight: 64,
      padding: 0,
      overflowY: 'unset'
    },
    boxAction: {
      justifyContent: 'space-around',
      marginTop: 16
    },
    customBtn: {
      borderRadius: 25,
      boxShadow: 'none',
      height: '45px',
      fontSize: '14px',
      background: '#1d8df7',
      '&:hover': {
        background: '#1d8df7'
      }
    }
  })
);

const DialogAddRoomToBuilding: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, roomID } = props;
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  const [buildings, setBuildings] = useState<ApartmentBuildingsRes[]>([]);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('');
  const [statusSnack, setStatusSnack] = useState<any>('success');
  const [idBuilding, setIdBuilding] = useState<any>(0);
  const dispatch = useDispatch<Dispatch<RoomListReducerAction>>();
  const getBuildings = async () => {
    try {
      const res = await axios_merchant.get(`apartment-buildings`);
      return res.data;
    } catch (error) {}
  };

  useEffect(() => {
    getBuildings().then((res) => {
      let itemCancel = {
        id: 999999,
        name: t('roomlist:deselectBuilding'),
      };
      let newBuildings = [itemCancel, ...res.data];
      setBuildings(newBuildings);
    });
  }, []);

  const initFormValue: FormValues = {
    apartment_building_id: 0,
    room_number: '',
    floor: ''
  };

  const validationForm =
    Yup.object().shape({
    apartment_building_id: Yup.string()
      .required(t('roomlist:atLeastOneRequired'))
      .test('checkNotChoose', t('roomlist:atLeastOneRequired'), (value) => value != 0),
    room_number: idBuilding != 999999 ? Yup.string().required('Required') : null,
    floor: idBuilding != 999999 ?  Yup.string().required('Required') : null
  });

  const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const data: AddToBuildingReq = {
      apartment_building_id: values.apartment_building_id != 999999 ? values.apartment_building_id : null,
      list_long_term_room: [
        {
          id: roomID,
          room_number: values.room_number,
          floor: values.floor
        }
      ]
    };

    axios_merchant
      .put('long-term/room/add-to-building', data)
      .then((res) => {
        setStatusSnack('success');
        setMessageSnack(t('roomlist:addedToBuildingSucsses'));
        setOpenSnack(true);
        handleClose();
        getRoomList(dispatch);
      })
      .catch(() => {
        setStatusSnack('error');
        setMessageSnack(t('roomlist:addedToBuildingError'));
        setOpenSnack(true);
        actions.setSubmitting(false);
      });
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Fragment>
      <Dialog
        aria-labelledby="dialog-add-to-building"
        scroll="body"
        maxWidth={'sm'}
        TransitionComponent={TransitionCustom}
        fullScreen={width === 'xs'}
        onClose={handleClose}
        open={open}
        classes={{ paper: classes.root }}>
        <DialogTitle disableTypography className={classes.boxTitle}>
          <Grid item xs={12}>
            <Typography variant="h1" gutterBottom className="label main_label">
              {t('roomlist:buildingInfo')}
            </Typography>
          </Grid>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.boxContent}>
          <Box>
            <Formik
              initialValues={initFormValue}
              validationSchema={validationForm}
              onSubmit={onSubmit}>
              {({
                values,
                handleSubmit,
                touched,
                errors,
                handleChange,
                handleBlur,
                isSubmitting,
                setFieldTouched
              }: FormikProps<FormValues>) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Box my={4}>
                      <FormControl
                        fullWidth
                        error={!!errors.apartment_building_id && touched.apartment_building_id}>
                        <SelectCustom
                          name="apartment_building_id"
                          onChange={(e) => {
                            handleChange(e);
                            setIdBuilding(e.target.value);
                          }}
                          defaultDisabledOption={t('roomlist:yourBuilding')}
                          value={values.apartment_building_id}
                          title={t('roomlist:chooseABuilding')}
                          options={buildings}
                          onBlurTouched={setFieldTouched}
                        />
                        {touched.apartment_building_id && (
                          <InputFeedback error={errors.apartment_building_id} />
                        )}
                      </FormControl>
                    </Box>
                   <Box my={4}>
                      <Typography variant="subtitle1" className={classes.title}>
                        {t('roomlist:roomCodeInBuilding')}
                      </Typography>
                      <FormControl
                        fullWidth
                        aria-describedby="room_number-helper-text"
                        required
                        error={!!errors.room_number}>
                        <TextField
                          disabled={values.apartment_building_id == 999999}
                          name="room_number"
                          value={values.room_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Vd: 101, A202,..."
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          variant="outlined"
                        />
                        {!!errors.room_number
                          ? touched.room_number && (
                              <FormHelperText>{errors.room_number}</FormHelperText>
                            )
                          : ''}
                      </FormControl>
                    </Box>

                    <Box my={4}>
                      <Typography variant="subtitle1" className={classes.title}>
                        {t('roomlist:whichFloor')}
                      </Typography>
                      <FormControl
                        fullWidth
                        aria-describedby="floor-helper-text"
                        required
                        error={!!errors.floor}>
                        <TextField
                          disabled={values.apartment_building_id == 999999}
                          name="floor"
                          value={values.floor}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Vd: 12"
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          variant="outlined"
                        />
                        {!!errors.floor
                          ? touched.floor && <FormHelperText>{errors.floor}</FormHelperText>
                          : ''}
                      </FormControl>
                    </Box>
                    <Box my={1} textAlign="center">
                      <ButtonGlobal
                        className={classes.customBtn}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        width="auto"
                        disabled={isSubmitting}>
                        {values.apartment_building_id != 999999 ? t('basic:addRoomtoBuilding') : t('roomlist:deselectBuilding')}
                      </ButtonGlobal>
                    </Box>
                  </form>
                );
              }}
            </Formik>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}>
        <MySnackbarContentWrapper
          variant={statusSnack}
          message={messageSnack}
          onClose={handleCloseSnack}
        />
      </Snackbar>
    </Fragment>
  );
};

export default DialogAddRoomToBuilding;
