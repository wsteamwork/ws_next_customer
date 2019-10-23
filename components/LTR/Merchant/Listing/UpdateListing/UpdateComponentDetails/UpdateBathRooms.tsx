import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { getDataUpdateListing, UpdateDetailsActions, UpdateDetailsState } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
interface IProps { }
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    margin: {
      marginBottom: theme.spacing(4)
    }
  })
);

const UpdateBathRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { room_id, bathRooms } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  const [bathRoomsList, setBathRoomsList] = useState<any>(bathRooms);
  const [numberBath, setNumberBath] = useState<number>(0);
  useEffect(() => {
    getDataUpdateListing(id, dispatch);
  }, [room_id]);

  useEffect(() => {
    setBathRoomsList(bathRooms);
  }, [bathRooms]);

  useEffect(() => {
    if (bathRoomsList) {
      setNumberBath(bathRoomsList.number_bathroom);
    }
  }, [bathRoomsList]);

  const UpdateBathRooms: any = () => {
    let bathRoomsTemp: any = {};
    let number_bathroom = bathRoomsList['number_bathroom'];
    if (number_bathroom < numberBath) {
      for (let i = number_bathroom + 1; i <= numberBath; i++) {
        bathRoomsTemp[`bathroom_${i}`] = {
          images: []
        };
      }
      let newRoomsList = Object.assign({}, bathRoomsList, bathRoomsTemp);
      newRoomsList['number_bathroom'] = numberBath
      setBathRoomsList(newRoomsList);
      handleUpdateListing(room_id, {
        bathrooms: newRoomsList
      });
    } else {
      for (let i = 1; i <= numberBath; i++) {
        bathRoomsTemp[`bathroom_${i}`] = bathRoomsList[`bathroom_${i}`];
      }
      bathRoomsTemp['number_bathroom'] = numberBath;
      setBathRoomsList(bathRoomsTemp);
      handleUpdateListing(room_id, {
        bathrooms: bathRoomsTemp
      });
    }
  };

  return (
    <Fragment>
      <CardWrapperUpdate handleSave={UpdateBathRooms}>
        <div className="step1-tab3-bathroom">
          <Grid className="createListing-title">
            <Grid className="createListing-heading-1">Số phòng tắm</Grid>
            <Grid className="createListing-subTitle">
              Phòng không có bồn hoặc vòi tắm sẽ được tính là nửa phòng
            </Grid>
          </Grid>
          <Grid item sm={8}>
            <QuantityButtons
              number={numberBath}
              setNumber={setNumberBath}
              title={'Phòng tắm'}></QuantityButtons>
          </Grid>
        </div>
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdateBathRooms;
