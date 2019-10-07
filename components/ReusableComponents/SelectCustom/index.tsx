import React, { FC, useEffect, SetStateAction, Dispatch, ChangeEvent } from 'react';
import Select, { SelectProps } from '@material-ui/core/Select';
import { Theme, OutlinedInput, Grid } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

interface IProps<T> extends SelectProps {
  value?: T;
  displayEmpty?: boolean;
  callBackEvent?: () => void;
  options?: any[];
  title?: string;
  twoThirdWidth?: boolean;
  // setValue?: Dispatch<SetStateAction<T>>;
  unit?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
  callBackOnChange?: (value: any) => void;
}

const SelectCustom = <T extends any>(props: IProps<T>) => {
  const { value, options, title, twoThirdWidth, callBackOnChange, unit, onBlur } = props;
  const [valueInput, setValueInput] = React.useState<T>(value);
  const handleChange = (event: ChangeEvent<{ name?: string; value: T }>) => {
    console.log(event.target.value);
    setValueInput(event.target.value);
    if (callBackOnChange) callBackOnChange(event.target.value);
  };

  const optionsRender = () => {
    return options.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {unit ? item + unit : item.value}
        </option>
      );
    });
  };

  return (
    <Grid className="select-reusable">
      {title ? <Grid className="title">{title}</Grid> : ''}
      <Grid className={twoThirdWidth ? 'two-third-width' : ''}>
        <Select
          name="accommodation_type"
          native
          fullWidth
          classes={{ icon: 'icon' }}
          onChange={handleChange}
          // onBlur={onBlur}
          value={valueInput}
          input={
            <OutlinedInput
              name="term-rental"
              labelWidth={0}
              id="outlined-term-rental-native-simple"
            />
          }
          displayEmpty
          IconComponent={KeyboardArrowDown}>
          {optionsRender()}
        </Select>
      </Grid>
    </Grid>
  );
};

SelectCustom.defaultProps = {
  displayEmpty: false
};

export default SelectCustom;
