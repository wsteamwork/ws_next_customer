import { Theme } from '@material-ui/core';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    textField: {
      border: '1px soild #ddd',
      borderRadius: '10px'
    },
    outlineInput: {
      padding: "16px 12px",
      border: '1px soild #ddd',
      borderRadius: '10px',
    },
  })
);
interface IProps extends BaseTextFieldProps { }

const InputGlobal: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {
    label,
    //@ts-ignore
    onChange,
    value,
    placeholder,
    autoComplete,
    autoFocus,
    defaultValue,
    disabled,
    error
  } = props;
  return (
    <TextField
      id="outlined-name"
      label={label}
      className={classes.textField}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      margin="normal"
      variant="outlined"
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      inputProps={{
        classes: classes.outlineInput
      }}
    />
  );
};

export default InputGlobal;
