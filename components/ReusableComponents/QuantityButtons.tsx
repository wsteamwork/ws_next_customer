import React, { FC, Dispatch, SetStateAction, Fragment } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RemoveCircleOutline, AddCircleOutline } from '@material-ui/icons';

interface Iprops {
  icon?: IconDefinition;
  title: string;
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
  containerWidth?: string;
  step?: number;
}

const QuantityButtons: FC<Iprops> = (props) => {
  const { icon, title, number, setNumber, containerWidth, step } = props;

  const handleDecrement = () => {
    if (number === 0) {
      return;
    }
    if (step) {
      setNumber(number - step);
    } else {
      setNumber(number - 1);
    }
  };

  const handleIncrement = () => {
    if (step) {
      setNumber(number + step);
    } else {
      setNumber(number + 1);
    }
  };

  return (
    <Grid
      container
      className={`quantityButtons ${!icon ? 'titleNoIcon' : ''}`}
      style={{ width: containerWidth }}>
      <Grid item xs={8} className="flex_columCenter">
        <p>
          {icon ? (
            <Fragment>
              <FontAwesomeIcon icon={icon} size="lg"></FontAwesomeIcon>&nbsp;&nbsp;
            </Fragment>
          ) : (
            ''
          )}
          {title}
        </p>
      </Grid>

      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={4} className="centerCustom">
            <IconButton onClick={handleDecrement} className="icon" color="primary" aria-label="Add">
              <RemoveCircleOutline></RemoveCircleOutline>
            </IconButton>
          </Grid>

          <Grid item xs={4} className="centerCustom">
            <p>{number}</p>
          </Grid>

          <Grid item xs={4} className="centerCustom">
            <IconButton onClick={handleIncrement} className="icon" color="primary" aria-label="Add">
              <AddCircleOutline></AddCircleOutline>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuantityButtons;
