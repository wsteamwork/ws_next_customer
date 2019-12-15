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
  FormHelperText, Snackbar
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
import {
  AddToBuildingReq
} from '@/types/Requests/LTR/CreateListing/StoreRoomWithinBuilding/RoomWithinBuilding';
import { axios_merchant } from '@/utils/axiosInstance';
import { ApartmentBuildingsRes } from '@/types/Requests/LTR/CreateListing/ApartmentBuildings/ApartmentBuildingsRes';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';

interface IProps {
  classes?: any,
  open: boolean,
  roomID: number,
  handleClose: () => void
}

interface FormValues {
  apartment_building_id: number;
  list_long_term_room_id: number[];
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
    }
  })
);

const DialogAddRoomToBuilding: FC<IProps> = (props) => {
  const classes                         = useStyles(props);
  const { open, handleClose, roomID }   = props;
  const { width }                       = useContext(GlobalContext);
  const [buildings, setBuildings]       = useState<ApartmentBuildingsRes[]>([]);
  const [openSnack, setOpenSnack]       = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('');
  const [statusSnack, setStatusSnack]   = useState<any>('success');
  const getBuildings                    = async () => {
    try {
      const res = await axios_merchant.get(`apartment-buildings`);
      return res.data;
    } catch (error) {
    }
  };

  useEffect(() => {
    getBuildings()
      .then((res) => {
        setBuildings(res.data);
      });
  }, []);

  const initFormValue: FormValues = {
    apartment_building_id: 0,
    list_long_term_room_id: [roomID],
    room_number: '',
    floor: ''
  };

  const validationForm = Yup.object().shape({
    apartment_building_id: Yup.string()
      .required('At least one checkbox is required')
      .test('checkNotChoose', 'Please select an option', (value) => value != 0),
    room_number: Yup.string()
      .required('Required'),
    floor: Yup.string()
      .required('Required')
  });

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {

    const data: AddToBuildingReq = {
      apartment_building_id: values.apartment_building_id,
      list_long_term_room_id: [roomID],
      room_number: values.room_number,
      floor: values.floor
    };

    axios_merchant
      .put('long-term/room/add-to-building', data)
      .then((res) => {
        setStatusSnack('success');
        setMessageSnack('Bạn đã thêm phòng vào tòa nhà thành công!');
        setOpenSnack(true);
      })
      .catch(() => {
        setStatusSnack('error');
        setMessageSnack('Không thành công!');
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
      <Dialog aria-labelledby = 'dialog-add-to-building'
              scroll = 'body'
              maxWidth = {'sm'}
              TransitionComponent = {TransitionCustom}
              fullScreen = {width === 'xs'}
              onClose = {handleClose}
              open = {open}
              classes = {{ paper: classes.root }}
      >
        <DialogTitle disableTypography className = {classes.boxTitle}>
          <Typography variant = 'h6'>Thông tin tòa nhà</Typography>
          <IconButton aria-label = 'close' onClick = {handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className = {classes.boxContent}>
          <Box>
            <Formik
              initialValues = {initFormValue}
              validationSchema = {validationForm}
              onSubmit = {onSubmit}>
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
                // const hasErrors = Object.keys(errors).length > 0;
                return (
                  <form onSubmit = {handleSubmit}>
                    <Box my = {4}>
                      <FormControl
                        error = {!!errors.apartment_building_id && touched.apartment_building_id}
                      >
                        <SelectCustom
                          name = 'apartment_building_id'
                          onChange = {(e) => {
                            handleChange(e);
                          }}
                          defaultDisabledOption = {'Tòa nhà của bạn'}
                          value = {values.apartment_building_id}
                          title = 'Lựa chọn tòa nhà'
                          options = {buildings}
                          onBlurTouched = {setFieldTouched}
                        />
                        {touched.apartment_building_id && (
                          <InputFeedback error = {errors.apartment_building_id} />
                        )}
                      </FormControl>
                    </Box>
                    <Box my = {4}>
                      <Typography variant = 'subtitle1' className = {classes.title}>
                        Mã phòng trong tòa nhà?
                      </Typography>
                      <FormControl
                        aria-describedby = 'room_number-helper-text'
                        required
                        error = {!!errors.room_number}>
                        <TextField
                          name = 'room_number'
                          value = {values.room_number}
                          onChange = {handleChange}
                          onBlur = {handleBlur}
                          placeholder = 'Vd: 101, A202,...'
                          inputProps = {{
                            className: 'outlineInput'
                          }}
                          variant = 'outlined'
                        />
                        {!!errors.room_number ? (
                          touched.room_number && <FormHelperText>{errors.room_number}</FormHelperText>
                        ) : ''}
                      </FormControl>
                    </Box>

                    <Box my = {4}>
                      <Typography variant = 'subtitle1' className = {classes.title}>
                        Căn hộ trên tầng mấy?
                      </Typography>
                      <FormControl
                        aria-describedby = 'floor-helper-text'
                        required
                        error = {!!errors.floor}>
                        <TextField
                          name = 'floor'
                          value = {values.floor}
                          onChange = {handleChange}
                          onBlur = {handleBlur}
                          placeholder = 'Vd: 12'
                          inputProps = {{
                            className: 'outlineInput'
                          }}
                          variant = 'outlined'
                        />
                        {!!errors.floor ? (
                          touched.floor && <FormHelperText>{errors.floor}</FormHelperText>
                        ) : ''}
                      </FormControl>
                    </Box>
                    <Box my = {1} textAlign = 'center'>
                      <ButtonGlobal
                        variant = 'contained'
                        color = 'primary'
                        size = 'large'
                        type = 'submit'
                        width = 'auto'
                        disabled = {isSubmitting}>
                        Thêm phòng vào tòa nhà
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
        anchorOrigin = {{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open = {openSnack}
        autoHideDuration = {3000}
        onClose = {handleCloseSnack}>
        <MySnackbarContentWrapper
          variant = {statusSnack}
          message = {messageSnack}
          onClose = {handleCloseSnack} />
      </Snackbar>
    </Fragment>
  );
};

export default DialogAddRoomToBuilding;
