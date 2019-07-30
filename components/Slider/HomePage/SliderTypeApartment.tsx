import React, { Fragment, FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid } from '@material-ui/core';
import CardIntro from '@/components/Cards/CardIntro';
import { RoomHomepageContext, IRoomHomepageContext } from '@/store/Context/Room/RoomHomepageContext';
import _ from 'lodash';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root:{
      marginTop: theme.spacing(7)
    }
  })
);

const SliderTypeApartment: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const {state}= useContext<IRoomHomepageContext>(RoomHomepageContext);

  const {apartments} =state;

  return apartments && (
    <Grid container spacing={2} justify='flex-start' className={classes.root}>

      {_.map(apartments,(obj,i)=> (
        obj.status === 1 ? (
          <Grid item xs={4} sm={3} key={i}>
            <CardIntro imgHeight={200} imgSrc={obj.image} title={obj.value}/>
          </Grid>
        ) : ''
      ))}
    </Grid>
  );
};

export default SliderTypeApartment;
