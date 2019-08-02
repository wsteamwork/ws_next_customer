import React, { Fragment, FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Grid } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import CardIntro from '@/components/Cards/CardIntro';
import { IRoomHomepageContext, RoomHomepageContext } from '@/store/Context/Room/RoomHomepageContext';
import numeral  from 'numeral';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root:{
      marginTop:theme.spacing(7),
    },
    title:{
      marginBottom:theme.spacing(3),
      fontWeight:900,
    },
  })
);

const MetroGridImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const {state}= useContext<IRoomHomepageContext>(RoomHomepageContext);

  const {roomsCity} = state;
  // console.log(roomsCity);

  return roomsCity && (
    <Grid className={classes.root}>
      <Typography variant='h5' className={classes.title}>
        Điểm đến hấp dẫn
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <CardIntro title={roomsCity[0].name_city} imgSrc={roomsCity[0].image} showPrice={true}
                         recommendedPrice={numeral(roomsCity[0].average_price).format('0,0')} imgHeight={220} />
            </Grid>
            <Grid item>
              <Grid container direction='row' spacing={1}>
                <Grid item xs={6}>
                  <CardIntro title={roomsCity[1].name_city} imgSrc={roomsCity[1].image} showPrice={true}
                             recommendedPrice={numeral(roomsCity[1].average_price).format('0,0')} imgHeight={170} />
                </Grid>
                <Grid item xs={6}>
                  <CardIntro title={roomsCity[2].name_city} imgSrc={roomsCity[2].image} showPrice={true}
                             recommendedPrice={numeral(roomsCity[2].average_price).format('0,0')} imgHeight={170} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={6} spacing={1}>
          <Grid container item xs={6}spacing={1}>
            <Grid item xs={12}>
              <CardIntro title={roomsCity[3].name_city} imgSrc={roomsCity[3].image} showPrice={true}
                         recommendedPrice={numeral(roomsCity[3].average_price).format('0,0')} imgHeight={220} />
            </Grid>
            <Grid item xs={12}>
              <CardIntro title={roomsCity[4].name_city} imgSrc={roomsCity[4].image} showPrice={true}
                         recommendedPrice={numeral(roomsCity[4].average_price).format('0,0')} imgHeight={170} />
            </Grid>
          </Grid>
          <Grid container item xs={6} spacing={1}>
            <Grid item xs={12}>
              <CardIntro title={roomsCity[5].name_city} imgSrc={roomsCity[5].image} showPrice={true}
                         recommendedPrice={numeral(roomsCity[5].average_price).format('0,0')} imgHeight={398}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MetroGridImage;
