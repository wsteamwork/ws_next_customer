import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Select from '@/components/ReusableComponents/SelectCustom';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormGroup, Button, Collapse } from '@material-ui/core';
import CheckboxCustom from '@/components/LTR/Merchant/Listing/CreateListing/Basic/CheckboxCustom';
import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { useDispatch, useSelector } from 'react-redux';
import {
  CreateListingActions,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { ReducersList } from '@/store/Redux/Reducers';
interface IProps {
  roomNumber?: number;
  bedRoomsList?: any;
  setBedroomsList?: Dispatch<SetStateAction<any>>;
}

const BedRoom: FC<IProps> = (props) => {
  const { roomNumber, bedRoomsList, setBedroomsList } = props;
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [guest, setGuest] = useState<number>(0);
  const [maxGuest, setMaxGuest] = useState<number>(0);
  const [bed, setBed] = useState<number>(0);
  const [single, setSingle] = useState<number>(0);
  const [double, setDouble] = useState<number>(0);
  const [king, setKing] = useState<number>(0);
  const [queen, setQueen] = useState<number>(0);
  const { bedRooms } = useSelector<ReducersList, CreateListingState>(
    (state) => state.createListing
  );
  const totalBeds = [single, double, king, bed].reduce((a, b) => a + b, 0);

  const [isAddBedRoom, setIsAddBedRoom] = useState<boolean>(false);
  const handleToggleAddBedRoom = () => {
    if (isAddBedRoom) {
      if (bedRoomsList.hasOwnProperty(`bedroom_${roomNumber}`)) {
        let bedsList = [];
        let bedRoomsListTemp = bedRoomsList;
        if (single > 0) bedsList.push({ number_bed: single, size: 1 });
        if (double > 0) bedsList.push({ number_bed: double, size: 2 });
        if (king > 0) bedsList.push({ number_bed: king, size: 3 });
        if (queen > 0) bedsList.push({ number_bed: queen, size: 4 });
        bedRoomsListTemp[`bedroom_${roomNumber}`].beds = bedsList;
        bedRoomsListTemp[`bedroom_${roomNumber}`][`number_bed`] = totalBeds;
        console.log(bedRoomsListTemp)
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
        <Grid item sm={6} className="add-room-container__title">
          <h3>Phòng ngủ {roomNumber}</h3>
        </Grid>
        <Grid item sm={6} className="add-bedroom-container__counting">
          <p>{totalBeds} giường</p>
          {!isAddBedRoom ? <Grid>{renderBedroomInfo()}</Grid> : ' '}
        </Grid>

        <Grid item sm={12} className="counting-open">
          {/* <h3>Phòng ngủ 1</h3> */}
          <Collapse in={isAddBedRoom}>
            <QuantityButtons
              number={single}
              setNumber={setSingle}
              title={'Đơn'}
              containerWidth={'66.67%'}></QuantityButtons>
            <QuantityButtons
              number={double}
              setNumber={setDouble}
              title={'Đôi'}
              containerWidth={'66.67%'}></QuantityButtons>
            <QuantityButtons
              number={king}
              setNumber={setKing}
              title={'King'}
              containerWidth={'66.67%'}></QuantityButtons>
            <QuantityButtons
              number={queen}
              setNumber={setQueen}
              title={'Queen'}
              containerWidth={'66.67%'}></QuantityButtons>
          </Collapse>
        </Grid>
        <Grid item sm={12}>
          <Button className="add-room-button" onClick={handleToggleAddBedRoom}>
            {isAddBedRoom ? 'Xong' : 'Thêm giường'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BedRoom;
