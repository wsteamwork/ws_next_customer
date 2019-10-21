import { createStyles, makeStyles, Theme, Grid } from '@material-ui/core';
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

const Kitchens: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Ảnh phòng bếp">
          <Grid item xs={12} className={classes.nameIcon}>
            Số ảnh: <span className={classes.name}>{listing.kitchens.images.length}</span>
          </Grid>
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default Kitchens;
