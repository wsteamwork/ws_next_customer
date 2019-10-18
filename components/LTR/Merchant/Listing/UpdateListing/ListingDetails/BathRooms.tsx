import { createStyles, makeStyles, Theme, Grid, Typography } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import CardWrapperItem from '../CardWrapperItem';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import _ from 'lodash';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    },
    margin: {
      marginBottom: 8,
    },
  })
);

const BathRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);

  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title={`Phòng tắm (${listing.bathrooms.number_bathroom})`}>
          {_.times(listing.bathrooms.number_bathroom, (i) => (
            <Fragment key={i}>
              <Grid item xs={6} sm={4}>
                <Grid item xs={12} className={classes.margin}>
                  <Typography variant="subtitle2" className={classes.name}>
                    Phòng tắm {i + 1}
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item xs={12} className={classes.nameIcon}>
                    Số ảnh:{' '}
                    <span className={classes.name}>
                      {listing.bathrooms[`bathroom_${i + 1}`]
                        ? listing.bathrooms[`bathroom_${i + 1}`].images.length
                        : 0}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          ))}
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default BathRooms;
