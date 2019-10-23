import { Radio, Theme, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

interface IProps {
  classes?: any,
  label: string,
  descr: string,
  value: string,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    checkboxItemWrapper: {
      padding: '5px 15px 10px',
      border: '1px solid #767676',
      borderRadius: 4,
      minHeight: 120,
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: 'rgb(118, 118, 118)',
    },
  })
);

const RadioCustom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { label, descr, value } = props;

  return (
    <div className={classes.checkboxItemWrapper}>
      <FormControlLabel
        value={value}
        label={label}
        control={<Radio color="primary" />}
        labelPlacement="end"
        classes={{ label: classes.title }}
      />
      <Typography style={{ marginTop: 10 }}> {descr} </Typography>
    </div>
  );
};

export default RadioCustom;
