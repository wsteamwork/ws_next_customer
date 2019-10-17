import {
  createStyles,
  makeStyles,
  Theme,
  Grid,
  Typography,
  Hidden,
  Button
} from '@material-ui/core';
import React, { FC, useState, MouseEvent, Fragment, useEffect } from 'react';
import CardWrapperItem from '../CardWrapperItem';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import _ from 'lodash';
import AddIcon from '@material-ui/icons/Add';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    wrapperIcon: {
      maxWidth: 40
    },
    wrapperBtn: {
      display: 'flex',
      padding: '0 !important'
    },
    nameIcon: {
      display: 'flex',
      alignItems: 'center'
    },
    roomAmenitiesIcon: {
      width: 24,
      height: 24
    },
    button: {
      textTransform: 'initial',
      color: '#1d8df7',
      '&:hover': {
        backgroundColor: '#ffffff'
      }
    },
    iconPlus: {
      fontSize: '15px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '19px'
      }
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      textTransform: 'capitalize',
      textDecoration: 'underline',
      color: '#484848'
    }
  })
);

const Amenities: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const getRenderedItems = () => {
    if (isOpen) {
      return Object.entries(listing.comforts);
    }
    return listing.comforts.facilities;
  };

  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Tiện nghi">
          <Grid container spacing={3} className={classes.rowMargin}>
            {!isOpen
              ? _.map(getRenderedItems(), (o, i) =>
                  parseInt(i) < 5 ? (
                    <Grid item xs={6} sm={4} key={i} className={classes.nameIcon}>
                      <Grid item xs={3} md={3} lg={3} className={classes.wrapperIcon}>
                        <img
                          src={o.icon}
                          alt={o.comfort_trans[0].name}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs={9} md={9} lg={9}>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  ) : (
                    ''
                  )
                )
              : _.map(getRenderedItems(), (item, i) =>
                  item[1].length ? (
                    <Fragment key={i}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" className={classes.name}>
                          {item[0]}
                        </Typography>
                      </Grid>
                      {_.map(item[1], (o, i) => (
                        <Grid item xs={6} sm={4} key={i} className={classes.nameIcon}>
                          <Grid item xs={3} md={3} lg={3} className={classes.wrapperIcon}>
                            <img
                              src={o.icon}
                              alt={o.comfort_trans[0].name}
                              className={classes.roomAmenitiesIcon}
                            />
                          </Grid>
                          <Grid className={classes.nameIcon} item xs={9} md={9} lg={9}>
                            <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                          </Grid>
                        </Grid>
                      ))}
                    </Fragment>
                  ) : (
                    ''
                  )
                )}

            {!isOpen ? (
              <Grid item xs={6} sm={4} className={classes.wrapperBtn}>
                <Hidden xsUp={listing.total_comforts < 5}>
                  <Button onClick={toggle} className={classes.button}>
                    <AddIcon className={classes.iconPlus} />
                    {listing.total_comforts - 5} Xem thêm
                  </Button>
                </Hidden>
              </Grid>
            ) : (
              <Grid item xs={6} sm={4} className={classes.wrapperBtn}>
                <Button onClick={toggle} className={classes.button}>
                  Thu gọn
                </Button>
              </Grid>
            )}
          </Grid>
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default Amenities;
