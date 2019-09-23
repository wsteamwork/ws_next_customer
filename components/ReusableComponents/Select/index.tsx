import React, { FC, ChangeEvent, SetStateAction, Dispatch } from 'react';
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
  setValue?: Dispatch<SetStateAction<T>>;
  unit?: string;
}

const SelectGlobal = <T extends any>(props: IProps<T>) => {
  const { value, options, title, twoThirdWidth, setValue, unit } = props;
  const [valueInput, setValueInput] = React.useState(value);
  const handleChange = (event: ChangeEvent<{ name?: string; value: T }>) => {
    setValueInput(event.target.value);
    if (setValue) setValue(event.target.value);
  };

  const optionsRender = () => {
    return options.map((item, i) => {
      return (
        <option key={i} value={item}>
          {unit ? item + unit : item}
        </option>
      );
    });
  };

  return (
    <Grid className="select-reusable">
      {title ? <Grid className="title">{title}</Grid> : ''}
      <Grid className={twoThirdWidth ? 'two-third-width' : ''}>
        <Select
          native
          fullWidth
          classes={{ icon: 'icon' }}
          onChange={handleChange}
          input={
            <OutlinedInput
              name="term-rental"
              labelWidth={0}
              id="outlined-term-rental-native-simple"
            />
          }
          displayEmpty
          value={valueInput}
          IconComponent={KeyboardArrowDown}>
          {optionsRender()}
        </Select>
      </Grid>
    </Grid>
  );
};

SelectGlobal.defaultProps = {
  displayEmpty: false
};

export default SelectGlobal;
