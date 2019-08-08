import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { withStyles, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import mainColor from '@/styles/constants/colors';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';

interface IProps {
  updateBookingType: (type: number) => void;
}

export const CustomCheckbox = withStyles({
  root: {
    color: mainColor.primary,
    '&$checked': {
      color: mainColor.primary
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CheckboxList: FC<IProps> = (props) => {
  const { updateBookingType } = props;
  const [state, setState] = useState({
    rentType: false,
    checkedB: false,
    checkedC: false
  });

  useEffect(() => {
    if (state.rentType) {
      updateBookingType(1);
    } else {
      updateBookingType(2);
    }
  }, [state.rentType]);

  const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={state.rentType}
            onChange={handleChange('rentType')}
            value="rentType"
          />
        }
        label="Thuê phòng theo giờ"
      />
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
          />
        }
        label="Tôi đi công tác"
      />
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={state.checkedC}
            onChange={handleChange('checkedC')}
            value="checkedC"
          />
        }
        label="Villa - Biệt thự nghỉ dưỡng"
      />
    </FormGroup>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateBookingType: (type: number) =>
      dispatch({
        type: 'SET_BOOKING_TYPE',
        bookingType: type
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CheckboxList);
