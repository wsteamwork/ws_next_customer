import { GlobalContext } from '@/store/Context/GlobalContext';
import React, { useContext, FC, Fragment, useState, useEffect, ChangeEvent, useMemo } from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import CardWrapperUpdate from '../CardWrapperUpdate';
import { Grid, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { RoomTypeData, getRoomType } from '@/components/Rooms/FilterActions/RoomType/context';
import { Dispatch } from 'redux';
import {
  UpdateDetailsState,
  getDataUpdateListing,
  UpdateDetailsActions,
  handleUpdateRentAndRoomType
} from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    imgDetail: {
      height: 25
    },
    rentType: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2)
    },
    icon: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    checked: {
      color: '#1e8df7 !important'
    },
    margin: {
      margin: '-16px 0'
    },
    label: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    name: {
      fontWeight: theme.typography.fontWeightBold
    }
  })
);

const CustomSwitch = withStyles({
  switchBase: {
    color: '#1e8df7',
    '&$checked': {
      color: '#1e8df7'
    },
    '&$checked + $track': {
      backgroundColor: '#1e8df7'
    }
  },
  checked: {},
  track: {}
})(Switch);

const UpdateRentAndRoomType: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const {
    accommodationType,
    stayWithHost,
    status_short_term,
    status_long_term,
    room_id
  } = useSelector<ReducersList, UpdateDetailsState>((state) => state.updateDetails);
  const [roomType, setRoomType] = useState<number>(accommodationType);
  const [isStayWithHost, setStayWithHost] = useState<boolean>(!!stayWithHost);
  const [roomTypesData, setRoomTypesData] = useState<RoomTypeData[]>([]);
  const [statusShortTerm, setStatusShortTerm] = useState<boolean>(!!status_short_term);
  const [statusLongTerm, setStatusLongTerm] = useState<boolean>(!!status_long_term);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const dispatch_detail = useDispatch<Dispatch<UpdateDetailsActions>>();

  useEffect(() => {
    getRoomType(setRoomTypesData);
  }, []);

  useEffect(() => {
    getDataUpdateListing(id, dispatch_detail);
  }, [room_id]);

  useMemo(() => {
    setRoomType(accommodationType);
    setStatusShortTerm(!!status_short_term);
    setStatusLongTerm(!!status_long_term);
    setStayWithHost(!!stayWithHost);
  }, [accommodationType, status_short_term, status_long_term, stayWithHost]);

  useEffect(() => {
    dispatch({
      type: 'SET_ACCOMMODATION_TYPE',
      payload: roomType
    });
  }, [roomType]);

  const callBackOnChange = (value: string) => {
    dispatch({
      type: 'SET_ACCOMMODATION_TYPE',
      payload: parseInt(value)
    });
  };

  const handleToggleLongTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setStatusLongTerm(event.target.checked);
    handleUpdateRentAndRoomType(room_id, 'merchant_status_long_term', event.target.checked ? 1 : 0);
  };
  const handleToggleShortTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setStatusShortTerm(event.target.checked);
    handleUpdateRentAndRoomType(
      room_id,
      'merchant_status_short_term',
      event.target.checked ? 1 : 0
    );
  };
  const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setStayWithHost(event.target.checked);
    handleUpdateRentAndRoomType(room_id, 'stay_with_host', event.target.checked ? 1 : 0);
  };

  const updateRoomType: any = () => {
    handleUpdateListing(room_id, {
      accommodation_type: roomType,
    });
  };

  return (
    <Fragment>
      <CardWrapperUpdate handleSave={updateRoomType}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" gutterBottom className={'label main_label'}>
              Loại Căn hộ
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} sm={8} md={8} lg={7} className={classes.margin}>
              <SelectCustom
                name="accommodation_type"
                value={roomType}
                options={roomTypesData}
                callBackOnChange={callBackOnChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
              label="Bạn có ở chung không gian căn hộ với khách ?"
            />
          </Grid>
          <Grid item xs={12} className={classes.label}>
            <Typography variant="h1" gutterBottom className={'label main_label'}>
              Hình thức thuê
            </Typography>
          </Grid>
          <Grid container item xs={12} className={classes.rentType}>
            <Grid item xs={2} sm={1}>
              <img
                src={'/static/images/rentType.svg'}
                alt="Rent Type"
                className={classes.imgDetail}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <Typography variant="body1" className={classes.name}>
                Ngắn hạn
              </Typography>
            </Grid>
            <Grid item xs={7} sm={5} lg={4} className={classes.icon}>
              <CustomSwitch
                value="shortterm"
                edge="end"
                onChange={handleToggleShortTerm}
                checked={statusShortTerm}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.rentType}>
            <Grid item xs={2} sm={1}>
              <img
                src={'/static/images/longterm.svg'}
                alt="Rent Type"
                className={classes.imgDetail}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <Typography variant="body1" className={classes.name}>
                Dài hạn
              </Typography>
            </Grid>
            <Grid item xs={7} sm={5} lg={4} className={classes.icon}>
              <CustomSwitch
                value="longterm"
                edge="end"
                onChange={handleToggleLongTerm}
                checked={statusLongTerm}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardWrapperUpdate>
    </Fragment>
  );
};
export default UpdateRentAndRoomType;
