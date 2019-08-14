import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Grid, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RemoveCircleOutline, AddCircleOutline } from '@material-ui/icons';

interface Iprops {
  icon: IconDefinition;
  title: string;
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
}

const RowSelect: FC<Iprops> = (props) => {
  const { icon, title, number, setNumber } = props;

  const handleMinus = () => {
    if (number === 0) {
      return;
    }
    setNumber(number - 1);
  };

  return (
    <Grid container className="item">
      <Grid item xs={8} className="flex_columCenter">
        <p>
          <FontAwesomeIcon icon={icon} size="lg"></FontAwesomeIcon>&nbsp;&nbsp; {title}
        </p>
      </Grid>

      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={4} className="centerCustom">
            <IconButton onClick={handleMinus} className="icon" color="primary" aria-label="Add">
              <RemoveCircleOutline></RemoveCircleOutline>
            </IconButton>
          </Grid>

          <Grid item xs={4} className="centerCustom">
            <p>{number}</p>
          </Grid>

          <Grid item xs={4} className="centerCustom">
            <IconButton
              onClick={() => setNumber(number + 1)}
              className="icon"
              color="primary"
              aria-label="Add">
              <AddCircleOutline></AddCircleOutline>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RowSelect;
