import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';

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

const Furnitures: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Ảnh nội thất">
          <Grid item xs={12} className={classes.nameIcon}>
            Số ảnh: <span className={classes.name}>{listing.furnitures.images.length}</span>
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default Furnitures;
