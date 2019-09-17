import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment} from 'react';
import { Theme, makeStyles} from '@material-ui/core';
import { Grid, } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CardAmenities from './CardAmenities';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    
  })
);

const Amenities: FC<IProps> = (props) => {
  const classes = useStyles(props);

  return (
    <Fragment>
        <Grid container justify="center" alignContent="center">
            <Grid item xs={11} className="wrapper">
                <CardAmenities/>
                <CardAmenities/>
                <CardAmenities/>
                <CardAmenities/>
                <CardAmenities/>
                <CardAmenities/>
                <CardAmenities/>
            </Grid>
        </Grid>
    </Fragment>
  );
};

export default Amenities;
