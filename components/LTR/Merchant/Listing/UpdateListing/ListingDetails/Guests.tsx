import { createStyles, makeStyles, Theme, Typography, Grid } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import CardWrapperItem from '../CardWrapperItem';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848',
      marginBottom: theme.spacing(1)
    },
    marginBottom: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1)
      },
    },
    guest: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const Guests: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Thông tin khách">
          <Grid container>
            <Grid item xs={12} sm={6} className={classes.marginBottom}>
              Số khách tiêu chuẩn:{' '}
              <span className={classes.guest}>{listing.guests.recommendation}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              Số khách thêm tối đa:{' '}
              <span className={classes.guest}>{listing.guests.max_additional_guest}</span>
            </Grid>
          </Grid>
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default Guests;
