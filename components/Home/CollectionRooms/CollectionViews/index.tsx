import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Hidden, Grid } from '@material-ui/core';
import CardIntro from '@/components/Cards/CardIntro';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { Collections } from '@/types/Requests/Rooms/RoomResponses';
import _ from 'lodash';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import ListRoom from '@/components/ListRoom';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8)
    },
    boxTitle: {
      textAlign: 'center'
    },
    title: {
      marginBottom: theme.spacing(3),
      fontWeight: 900,
    },
    paddingItem: {
      padding: theme.spacing(1 / 2)
    }
  })
);

const CollectionViews: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const collectionViews = useSelector<ReducersList, Collections[]>(
    (state) => state.roomHomepage.collections
  );
  const { t } = useTranslation();

  const renderCollection = (collection) => (
    <div className={classes.paddingItem}>
      <CardIntro
        imgSrc={IMAGE_STORAGE_LG + collection.image}
        showContent
        imgHeight={290}
        titleContent={collection.details.data[0].name}
        subTitleContent={collection.details.data[0].description}
      />
    </div>
  );

  return (
    <Grid className={classes.root}>
      <Typography variant='h5' className={classes.title}>
        {t('home:collectionRooms:collectionViews')}
      </Typography>
      <Hidden smDown implementation="css">
        <Grid container spacing={2} justify='flex-start'>
          {_.map(collectionViews, (o, i) => (
            <Grid item xs={3} key={i}>
              <CardIntro imgHeight={300} imgSrc={IMAGE_STORAGE_LG + o.image} showContent={true}
                titleContent={o.details.data[0].name} subTitleContent={o.details.data[0].description} />
            </Grid>
          ))}
        </Grid>
      </Hidden>

      <Hidden mdUp implementation="css">
        <ListRoom
          roomData={collectionViews}
          usingSlider={true}
          title={''}
          render={renderCollection} />
      </Hidden>
    </Grid>
  );
};

export default CollectionViews;
