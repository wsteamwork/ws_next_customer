import { Grid, OutlinedInput } from '@material-ui/core';
import Select, { SelectProps } from '@material-ui/core/Select';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import React, { ChangeEvent } from 'react';

interface IProps<T> extends SelectProps {
  value?: T;
  displayEmpty?: boolean;
  callBackEvent?: () => void;
  options?: any[];
  title?: string;
  twoThirdWidth?: boolean;
  unit?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
  callBackOnChange?: (value: any) => void;
}

const SelectCustom = <T extends any>(props: IProps<T>) => {
  const { value, options, title, twoThirdWidth, callBackOnChange, unit, onBlur, disabled } = props;
  const [valueInput, setValueInput] = React.useState<T>(value);
  const handleChange = (event: ChangeEvent<{ name?: string; value: T }>) => {
    setValueInput(event.target.value);
    if (callBackOnChange) callBackOnChange(event.target.value);
  };

  const optionsRender = () => {
    return options && !disabled
      ? options.map((item, i) => {
        return (
          <option key={i} value={unit ? item : item.id}>
            {unit ? item + unit : item.value}
          </option>
        );
      })
      : null;
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
          value={value}
          // defaultValue={value}
          input={
            <OutlinedInput
              name="term-rental"
              labelWidth={0}
              id="outlined-term-rental-native-simple"
            />
          }
          displayEmpty
          disabled={disabled}
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
