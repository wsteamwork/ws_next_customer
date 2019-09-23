import React, { FC, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Select from '@/components/ReusableComponents/Select';
import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import AddBedRoom from './AddBedRoom';
interface IProps {}

const Room: FC<IProps> = (props) => {
  const [guest, setGuest] = useState<number>(0);
  const [maxGuest, setMaxGuest] = useState<number>(0);
  const [bed, setBed] = useState<number>(0);
  const [single, setSingle] = useState<number>(0);
  const [double, setDouble] = useState<number>(0);
  const [king, setKing] = useState<number>(0);
  const [queen, setQueen] = useState<number>(0);



  const [bedRoomNumbers, setBedRoomNumbers] = useState<any>(0);
  const bedRoomNumbersArray = (length: number) =>
    Array.from(new Array(length), (val: any, index: number) => ++index);


  return (
    <div>
      <h1>Bạn có thể cung cấp dịch vụ cho bao nhiêu khách</h1>

      <QuantityButtons
        containerWidth={'66.67%'}
        number={guest}
        setNumber={setGuest}
        title={'Khách'}></QuantityButtons>
      <QuantityButtons
        number={maxGuest}
        setNumber={setMaxGuest}
        title={'Số khách tối đa'}
        containerWidth={'66.67%'}></QuantityButtons>
      <Grid style={{ paddingRight: 10 }}>
        <Select
          value={bedRoomNumbers}
          setValue={setBedRoomNumbers}
          unit={' phòng ngủ'}
          title="Bạn có thể cung cấp bao nhiêu phòng ngủ cho khách?"
          options={bedRoomNumbersArray(50)}
          twoThirdWidth={true}
        />
      </Grid>

      <QuantityButtons
        number={bed}
        setNumber={setBed}
        title={'Giường'}
        containerWidth={'66.67%'}></QuantityButtons>

      <h1>Sắp xếp chỗ ngủ</h1>
      <h3>Cung cấp chi tiết về chỗ ngủ sẽ giúp khách có được sự lựa chọn tốt hơn</h3>

      {bedRoomNumbersArray(parseInt(bedRoomNumbers)).map((number) => (
        <AddBedRoom roomNumber={number} />
      ))}
    </div>
  );
};

export default Room;
