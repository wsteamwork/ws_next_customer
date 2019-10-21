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
      color: '#484848'
    }
  })
);

const CancelPolicy: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Chính sách hủy phòng">
          <Typography variant="subtitle1" className={classes.name}>
            {listing.short_term_room.settings.booking_cancel_type_text}
          </Typography>
          <Grid container>
            <span>
              {listing.short_term_room.settings.booking_cancel_text}
            </span>
          </Grid>
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default CancelPolicy;
