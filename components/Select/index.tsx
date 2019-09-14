import React, { FC, ChangeEvent } from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/styles';
import Select, { SelectProps } from '@material-ui/core/Select';
import { Theme, OutlinedInput, Grid } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

interface IProps<T> extends SelectProps {
  value?: T;
  displayEmpty?: boolean;
  callBackEvent?: () => void;
  title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: '32px 0'
  },
  title: {
    marginBottom: 8,
    overflowWrap: 'break-word',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '1.375em',
    color: 'rgb(118, 118, 118)',
    margin: 0
  }
}));

const SelectGlobal = <T extends any>(props: IProps<T>) => {
  const classes = useStyles({});
  const { value, callBackEvent, title } = props;
  const [valueInput, setValueInput] = React.useState(value);
  const handleChange = (event: ChangeEvent<{ name?: string; value: T }>) => {
    setValueInput(event.target.value);
    callBackEvent();
  };

  return (
    <Grid className={classes.container}>
      {title ? <Grid className={classes.title}>{title}</Grid> : ''}

      <Select
        native
        fullWidth
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
        {props.children}
      </Select>
    </Grid>
  );
};

SelectGlobal.defaultProps = {
  displayEmpty: false
};

export default SelectGlobal;
