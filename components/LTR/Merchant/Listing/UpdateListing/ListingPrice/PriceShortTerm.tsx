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

const PriceShortTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);

  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Giá thuê ngắn hạn">
          <Grid item xs={12}>
            <Grid container className={classes.margin}>
              {listing.short_term_room.rent_type !== 1 ? (
                <Grid item xs={12} sm={6} className={classes.marginXs}>
                  Giá theo ngày:{' '}
                  <span className={classes.name}>
                    {numeral(listing.short_term_room.price_day).format('0,0')} vnđ
                  </span>
                </Grid>
              ) : (
                ''
              )}
              {listing.short_term_room.rent_type !== 2 ? (
                <Grid item xs={12} sm={6}>
                  Giá theo giờ:{' '}
                  <span className={classes.name}>
                    {numeral(listing.short_term_room.price_hour).format('0,0')} vnđ
                  </span>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.margin}>
                Phụ thu thêm người:{' '}
                <span className={classes.name}>
                  {numeral(listing.short_term_room.price_charge_guest).format('0,0')} vnđ
                </span>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.marginXs}>
                Phụ thu khách ở thêm giờ:{' '}
                <span className={classes.name}>
                  {numeral(listing.short_term_room.price_after_hour).format('0,0')} vnđ
                </span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.margin}>
                Phí dọn dẹp:{' '}
                <span className={classes.name}>
                  {numeral(listing.short_term_room.cleaning_fee).format('0,0')} vnđ
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
export default PriceShortTerm;
