import { createStyles, makeStyles, Theme, Grid, Typography } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import CardWrapperItem from '../CardWrapperItem';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import numeral from 'numeral';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    margin: {
      marginBottom: 8
    },
    marginXs: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: 8
      }
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const PriceLongTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);

  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Giá thuê dài hạn">
          <Grid item xs={12}>
            <Grid item xs={12} className={classes.margin}>
              <Typography variant="subtitle2" className={classes.name}>
                Giá cơ bản: {numeral(listing.prices.prices.term_1_month).format('0,0')} vnđ/ tháng
              </Typography>
            </Grid>
            <Grid container className={classes.margin}>
              <Grid item xs={12} sm={6} className={classes.marginXs}>
                Kì hạn 2 - 3 tháng:{' '}
                <span className={classes.name}>
                  {numeral(listing.prices.prices.term_2_month).format('0,0')} vnđ
                </span>
              </Grid>
              <Grid item xs={12} sm={6}>
                Kì hạn 3 - 6 tháng:{' '}
                <span className={classes.name}>
                  {numeral(listing.prices.prices.term_3_month).format('0,0')} vnđ
                </span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.margin}>
                Kì hạn 6 - 12 tháng:{' '}
                <span className={classes.name}>
                  {numeral(listing.prices.prices.term_6_month).format('0,0')} vnđ
                </span>
              </Grid>
              <Grid item xs={12} sm={6}>
                Kì hạn từ 1 năm trở lên:{' '}
                <span className={classes.name}>
                  {numeral(listing.prices.prices.term_12_month).format('0,0')} vnđ
                </span>
              </Grid>
            </Grid>
          </Grid>
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default PriceLongTerm;
