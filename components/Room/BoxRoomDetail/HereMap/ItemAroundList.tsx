/* global google */
import { GlobalContext } from '@/store/Context/GlobalContext';
import { Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
interface IProps {
  classes?: any;
  guidebook_category_id: number;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: 16
      }
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    divider: {
      margin: '16px 0'
    },
    distance: {
      marginLeft: 5
    },
    name: {
      fontWeight: theme.typography.fontWeightBold
    }
  })
);

const ItemAroundList: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { guidebook_category_id } = props;
  const placesList = useSelector<ReducersList, any>((state) => state.roomPage.placesList);
  const [placesListSort, setPlacesListSort] = useState<any>(placesList);
  useEffect(() => {
    if (placesList.length) {
      let filters = placesList.filter(
        (item) => item.guidebook_category_id === guidebook_category_id
      );
      setPlacesListSort(filters);
    }
  }, []);
  const { width } = useContext(GlobalContext);
  const itemsPlaces = _.map(placesListSort, (item, i) => {
    return (
      <Grid container item xs={12} sm={6} key={i} className={classes.root}>
        <Grid item xs={12} className={classes.wrapper}>
          <Typography variant="subtitle2" className={classes.name}>{item.name}</Typography>
          <Typography variant="subtitle2" className={classes.distance}>
            {item.distance > 100 ? (`${(item.distance / 1000).toFixed(2)} km`) : `${item.distance} m`}
          </Typography>
        </Grid>
      </Grid>
    );
  });
  return (
    <Grid container item xs={12} spacing={width !== 'xs' ? 2 : 0}>
      {itemsPlaces}
    </Grid>
  );
};

export default ItemAroundList;
