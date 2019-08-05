import React, { FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Grid, Hidden } from '@material-ui/core';
import CardIntro from '@/components/Cards/CardIntro';
import numeral from 'numeral';
import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
import Slider, { Settings } from 'react-slick';
import NextArrow from '@/components/ListRoom/NextArrow';
import PrevArrow from '@/components/ListRoom/PrevArrow';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import ListRoom from '../ListRoom';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { NumberRoomCity } from '@/types/Requests/Rooms/RoomResponses';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8)
    },
    title: {
      marginBottom: theme.spacing(3),
      fontWeight: 900
    },
    paddingGrid: {
      padding: 4
    }
  })
);

const MetroGridImage: FC = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const roomsCity = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const { width } = useContext<IGlobalContext>(GlobalContext);
  const renderCity = (city) => (
    <div className={classes.paddingGrid}>
      <CardIntro
        title={city.name_city}
        imgSrc={city.image}
        showPrice={true}
        recommendedPrice={numeral(city.average_price).format('0,0')}
        imgHeight={290}
      />
    </div>
  );

  return (
    roomsCity && (
      <Grid className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          {t('home:topDestinations')}
        </Typography>
        <Hidden smDown implementation="css">
          <Grid container>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item className={classes.paddingGrid}>
                  <CardIntro
                    title={roomsCity[0].name_city}
                    imgSrc={roomsCity[0].image}
                    showPrice={true}
                    recommendedPrice={numeral(roomsCity[0].average_price).format('0,0')}
                    imgHeight={width === 'xl' ? 280 : 250}
                  />
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item xs={6} className={classes.paddingGrid}>
                      <CardIntro
                        title={roomsCity[1].name_city}
                        imgSrc={roomsCity[1].image}
                        showPrice={true}
                        recommendedPrice={numeral(roomsCity[1].average_price).format('0,0')}
                        imgHeight={width === 'xl' ? 230 : 200}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.paddingGrid}>
                      <CardIntro
                        title={roomsCity[2].name_city}
                        imgSrc={roomsCity[2].image}
                        showPrice={true}
                        recommendedPrice={numeral(roomsCity[2].average_price).format('0,0')}
                        imgHeight={width === 'xl' ? 230 : 200}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={6}>
              <Grid container item xs={6}>
                <Grid item xs={12} className={classes.paddingGrid}>
                  <CardIntro
                    title={roomsCity[3].name_city}
                    imgSrc={roomsCity[3].image}
                    showPrice={true}
                    recommendedPrice={numeral(roomsCity[3].average_price).format('0,0')}
                    imgHeight={width === 'xl' ? 280 : 250}
                  />
                </Grid>
                <Grid item xs={12} className={classes.paddingGrid}>
                  <CardIntro
                    title={roomsCity[4].name_city}
                    imgSrc={roomsCity[4].image}
                    showPrice={true}
                    recommendedPrice={numeral(roomsCity[4].average_price).format('0,0')}
                    imgHeight={width === 'xl' ? 230 : 200}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={12} className={classes.paddingGrid}>
                  <CardIntro
                    title={roomsCity[5].name_city}
                    imgSrc={roomsCity[5].image}
                    showPrice={true}
                    recommendedPrice={numeral(roomsCity[5].average_price).format('0,0')}
                    imgHeight={width === 'xl' ? 518 : 458}
                  />
                  {/* +8px la khoang cach padding*/}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden mdUp implementation="css">
          <ListRoom
            roomData={roomsCity}
            usingSlider={true}
            title={''}
            render={renderCity}></ListRoom>
        </Hidden>
      </Grid>
    )
  );
};

export default MetroGridImage;
