import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  CreateListingActions,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { Button, Collapse } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface IProps {
  roomNumber?: number;
  bedRoomsList?: any;
  setBedroomsList?: Dispatch<SetStateAction<any>>;
}

const BedRoom: FC<IProps> = (props) => {
  const { roomNumber, bedRoomsList } = props;
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [bed, setBed] = useState<number>(0);
  const [single, setSingle] = useState<number>(0);
  const [double, setDouble] = useState<number>(0);
  const [king, setKing] = useState<number>(0);
  const [queen, setQueen] = useState<number>(0);
  const { bedRooms } = useSelector<ReducersList, CreateListingState>(
    (state) => state.createListing
  );
  const totalBeds = [single, double, king, bed, queen].reduce((a, b) => a + b, 0);

  const [isAddBedRoom, setIsAddBedRoom] = useState<boolean>(false);
  const handleToggleAddBedRoom = () => {
    if (isAddBedRoom) {
      // console.log(bedRoomsList);
      if (bedRoomsList.hasOwnProperty(`bedroom_${roomNumber}`)) {
        let bedsList = [];
        let bedRoomsListTemp = bedRoomsList;
        if (single > 0) bedsList.push({ number_bed: single, size: 1 });
        if (double > 0) bedsList.push({ number_bed: double, size: 2 });
        if (king > 0) bedsList.push({ number_bed: king, size: 3 });
        if (queen > 0) bedsList.push({ number_bed: queen, size: 4 });
        bedRoomsListTemp[`bedroom_${roomNumber}`].beds = bedsList;
        bedRoomsListTemp[`bedroom_${roomNumber}`][`number_bed`] = totalBeds;

        dispatch({
          type: 'SET_BEDROOMS',
          payload: bedRoomsListTemp
        });
      }
    }
    setIsAddBedRoom(!isAddBedRoom);
  };

  const renderBedroomInfo = () => {
    let array = [];
    if (single > 0) array.push(`${single} giường đơn`);
    if (double > 0) array.push(`${double} giường đôi`);
    if (king > 0) array.push(`${king} giường king`);
    if (queen > 0) array.push(`${queen} giường queen`);
    return array.join(', ');
  };
  return (
    <Grid className="add-bedroom-container">
      <Grid container className="add-bedroom-container__wrapper">
        <Grid item xs={6} className="add-room-container__title">
          <h3>Phòng ngủ {roomNumber}</h3>
        </Grid>
        <Grid item xs={6} className="add-bedroom-container__counting">
          <p>{totalBeds} giường</p>
          {!isAddBedRoom ? <Grid>{renderBedroomInfo()}</Grid> : ' '}
        </Grid>

        <Grid item xs={12} className="counting-open">
          {/* <h3>Phòng ngủ 1</h3> */}
          <Collapse in={isAddBedRoom}>
            <Grid item xs={8}>
              <QuantityButtons
                number={single}
                setNumber={setSingle}
                title={'Đơn'}></QuantityButtons>
              <QuantityButtons
                number={double}
                setNumber={setDouble}
                title={'Đôi'}></QuantityButtons>
              <QuantityButtons number={king} setNumber={setKing} title={'King'}></QuantityButtons>
              <QuantityButtons
                number={queen}
                setNumber={setQueen}
                title={'Queen'}></QuantityButtons>
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Button className="add-room-button" onClick={handleToggleAddBedRoom}>
            {isAddBedRoom ? 'Xong' : 'Thêm giường'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BedRoom;
