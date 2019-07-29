import React, { FC, useState, ChangeEvent } from 'react';
import { withStyles, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import mainColor from '@/styles/constants/colors';
import { CheckboxProps } from '@material-ui/core/Checkbox';

export const CustomCheckbox = withStyles({
  root: {
    color: mainColor.primary,
    '&$checked': {
      color: mainColor.primary
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CheckboxList: FC = () => {
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false
  });

  const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={state.checkedA}
            onChange={handleChange('checkedA')}
            value="checkedA"
          />
        }
        label="Tôi đi công tác"
      />
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
          />
        }
        label="Phù hợp với gia đình"
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

export default CheckboxList;
