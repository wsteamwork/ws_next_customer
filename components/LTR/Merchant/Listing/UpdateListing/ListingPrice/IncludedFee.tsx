import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import _ from 'lodash';
import numeral from 'numeral';
import React, { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    value: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 8
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const IncludedFee: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Phí dịch vụ dài hạn">
          <Grid container>
            {_.map(listing.prices.included_fee, (o, i) =>
              o.included === 1 ? (
                <Grid item xs={12} sm={6} key={i} className={classes.value}>
                  {o.name}:&nbsp;
                  <span className={classes.name}>{numeral(o.value).format('0,0')} vnđ</span>
                </Grid>
              ) : (
                  ''
                )
            )}
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default IncludedFee;
