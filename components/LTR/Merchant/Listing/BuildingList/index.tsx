import { FC, Fragment } from "react";
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import { Grid, makeStyles, Theme, createStyles } from "@material-ui/core";

interface IProps { };

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    itemContainer: {
      backgroundColor: 'red',
      height: 100,
      width: 100
    }
  })
);
const BuildingList: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  }

  return (
    <Fragment>
      <Grid container spacing={2}>

        <Swiper {...params}>
          <Grid item xs={3} className={classes.itemContainer}>

          </Grid>
          <Grid item xs={3} className={classes.itemContainer}>

          </Grid>
          <Grid item xs={3} className={classes.itemContainer}>

          </Grid>
          <Grid item xs={3} className={classes.itemContainer}>

          </Grid>
        </Swiper>
      </Grid>
    </Fragment>
  )
}
export default BuildingList;