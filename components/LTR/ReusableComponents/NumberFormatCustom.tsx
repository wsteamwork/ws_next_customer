import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import NumberFormat from "react-number-format";

interface NumberFormatCustomProps {
  classes?: any
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

const useStyles = makeStyles<Theme, NumberFormatCustomProps>((theme: Theme) =>
  createStyles({

  })
);

const NumberFormatCustom: FC<NumberFormatCustomProps> = (props) => {
  const classes = useStyles(props);
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
};

export default NumberFormatCustom;
