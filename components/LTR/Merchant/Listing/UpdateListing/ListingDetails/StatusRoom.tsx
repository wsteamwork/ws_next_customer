import { createStyles, makeStyles, Theme, Typography, Grid } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import CardWrapperItem from '../CardWrapperItem';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import FiberIcon from '@material-ui/icons/FiberManualRecord';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    },
    icon: {
      width: '0.9rem',
      height: '0.9rem',
      marginRight: theme.spacing(1),
      color: '#1d8df7'
    },
    blocked: {
      width: '0.9rem',
      height: '0.9rem',
      marginRight: theme.spacing(1),
      color: '#484848'
    },
    spanShort: {
      fontWeight: theme.typography.fontWeightMedium,
      marginRight: 16
    },
    spanLong: {
      fontWeight: theme.typography.fontWeightMedium,
      marginRight: 30
    }
  })
);

const StatusRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Trạng thái" showBtnUpdate={false}>
          <Grid container item xs={12}>
            <Typography variant="subtitle1" className={classes.name}>
              <FiberIcon className={listing.short_term_room.merchant_status ? classes.icon : classes.blocked} />
              <span className={classes.spanShort}>Ngắn hạn: </span>{listing.short_term_room.merchant_status_txt}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Typography variant="subtitle1" className={classes.name}>
              <FiberIcon className={listing.merchant_status ? classes.icon : classes.blocked} />
              <span className={classes.spanLong}>Dài hạn: </span>{listing.merchant_status_txt}
            </Typography>
          </Grid>
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default StatusRoom;
