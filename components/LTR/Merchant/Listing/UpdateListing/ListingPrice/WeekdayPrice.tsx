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
    wrapperContent: {
      marginBottom: 16,
    },
    margin: {
      marginBottom: 8,
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    },
    image: {
      maxWidth: 71
    },
    area: {
      minWidth: 120
    },
    wrapperValue: {
      display: 'flex',
      alignItems: 'flex-end',
      
    }
  })
);

const WeekdayPrice: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);

  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Giá cuối tuần">
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default WeekdayPrice;
