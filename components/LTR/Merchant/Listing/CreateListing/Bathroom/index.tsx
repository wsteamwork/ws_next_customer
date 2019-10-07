import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC, useState, Dispatch, useEffect } from 'react';
import {
  CreateListingActions,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

interface IProps {}

const Bathroom: FC<IProps> = (props) => {
  const { bathroomNumber } = useSelector<ReducersList, CreateListingState>(
    (state) => state.createListing
  );
  const [bathroom, setBathroom] = useState<number>(bathroomNumber);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  useEffect(() => {
    dispatch({
      type: 'SET_BATHROOM_NUMBER',
      payload: bathroom
    });
  }, [bathroom]);
  return (
    <div className="step1-tab3-bathroom">
      <Grid className="createListing-title">
        <Grid className="createListing-heading-1">Số phòng tắm</Grid>
        <Grid className="createListing-subTitle">
          Phòng không có bồn hoặc vòi tắm sẽ được tính là nửa phòng
        </Grid>
      </Grid>

      <Grid>
        <QuantityButtons
          number={bathroom}
          setNumber={setBathroom}
          title={'Phòng tắm'}
          containerWidth={'66.67%'}
          step={0.5}></QuantityButtons>
      </Grid>
    </div>
  );
};

export default Bathroom;
