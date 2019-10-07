import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC, useState, Dispatch, useEffect } from 'react';
import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { useDispatch } from 'react-redux';

interface IProps {}

const Bathroom: FC<IProps> = (props) => {
  const [bathroom, setBathroom] = useState<number>(0);
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
      </Grid>

      <Grid>
        <QuantityButtons
          number={bathroom}
          setNumber={setBathroom}
          title={'Số khách tối đa'}
          containerWidth={'66.67%'}
          step={0.5}></QuantityButtons>
      </Grid>
    </div>
  );
};

export default Bathroom;
